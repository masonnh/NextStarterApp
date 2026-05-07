'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

function getDisplayName(user: {
  email?: string;
  user_metadata?: Record<string, unknown>;
}) {
  const metadata = user.user_metadata ?? {};
  const candidates = [
    metadata.full_name,
    metadata.name,
    metadata.preferred_username,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim().slice(0, 80);
    }
  }

  if (user.email) {
    return user.email.split('@')[0].slice(0, 80);
  }

  return 'Community member';
}

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  return {
    supabase,
    user: session.user,
  };
}

export async function createFeatureRequest(formData: FormData) {
  const auth = await getAuthenticatedUser();
  if (!auth) {
    return;
  }

  const rawTitle = formData.get('title');
  const rawDescription = formData.get('description');

  const title = typeof rawTitle === 'string' ? rawTitle.trim() : '';
  const description =
    typeof rawDescription === 'string' ? rawDescription.trim() : '';

  if (title.length < 5 || title.length > 120) {
    return;
  }

  if (description.length < 10 || description.length > 3000) {
    return;
  }

  const { error } = await auth.supabase.from('feature_requests').insert({
    title,
    description,
    author_id: auth.user.id,
    author_name: getDisplayName(auth.user),
  });

  if (error) {
    console.error('Failed to create feature request:', error.message);
    return;
  }

  revalidatePath('/feedback');
}

export async function castFeedbackVote(formData: FormData) {
  const auth = await getAuthenticatedUser();
  if (!auth) {
    return;
  }

  const requestId = Number(formData.get('requestId'));
  const voteValue = Number(formData.get('voteValue'));

  if (!Number.isInteger(requestId)) {
    return;
  }

  if (voteValue !== 1 && voteValue !== -1) {
    return;
  }

  const { data: existingVote, error: existingVoteError } = await auth.supabase
    .from('feature_request_votes')
    .select('id, vote_value')
    .eq('request_id', requestId)
    .eq('user_id', auth.user.id)
    .maybeSingle();

  if (existingVoteError) {
    console.error(
      'Failed to load existing feedback vote:',
      existingVoteError.message,
    );
    return;
  }

  if (existingVote?.vote_value === voteValue) {
    const { error: deleteError } = await auth.supabase
      .from('feature_request_votes')
      .delete()
      .eq('id', existingVote.id)
      .eq('user_id', auth.user.id);

    if (deleteError) {
      console.error('Failed to remove feedback vote:', deleteError.message);
      return;
    }

    revalidatePath('/feedback');
    return;
  }

  const { error } = await auth.supabase.from('feature_request_votes').upsert(
    {
      request_id: requestId,
      user_id: auth.user.id,
      vote_value: voteValue,
    },
    {
      onConflict: 'request_id,user_id',
    },
  );

  if (error) {
    console.error('Failed to cast feedback vote:', error.message);
    return;
  }

  revalidatePath('/feedback');
}

export async function addFeedbackComment(formData: FormData) {
  const auth = await getAuthenticatedUser();
  if (!auth) {
    return;
  }

  const requestId = Number(formData.get('requestId'));
  const rawContent = formData.get('content');
  const content = typeof rawContent === 'string' ? rawContent.trim() : '';

  if (!Number.isInteger(requestId)) {
    return;
  }

  if (content.length < 2 || content.length > 2000) {
    return;
  }

  const { error } = await auth.supabase
    .from('feature_request_comments')
    .insert({
      request_id: requestId,
      author_id: auth.user.id,
      author_name: getDisplayName(auth.user),
      content,
    });

  if (error) {
    console.error('Failed to add feedback comment:', error.message);
    return;
  }

  revalidatePath('/feedback');
}
