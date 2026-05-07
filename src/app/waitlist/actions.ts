'use server';

import { createClient } from '@/lib/supabase/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(formData: FormData) {
  const rawEmail = formData.get('email');
  const email =
    typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';

  if (!email || !emailPattern.test(email)) {
    return;
  }

  const supabase = await createClient();
  const tableName = 'waitlist_signups';

  const { error } = await supabase.from(tableName).insert({
    email,
    source: 'waitlist-page',
  });

  if (error) {
    // Keep UX simple while still surfacing operational issues in logs.
    console.error('Failed to save waitlist email:', error.message);
  }
}
