import FeedbackBoardClient from '@/components/page/feedback/FeedbackBoardClient';
import { createClient } from '@/lib/supabase/server';

const PAGE_SIZE = 10;

type BoardSort = 'newest' | 'oldest' | 'top' | 'discussed';

type FeatureRequestRow = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  author_id: string;
  author_name: string;
};

type VoteRow = {
  request_id: number;
  user_id: string;
  vote_value: -1 | 1;
};

type CommentRow = {
  id: number;
  request_id: number;
  author_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

export const dynamic = 'force-dynamic';

type FeedbackPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParamValue(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

export default async function FeedbackPage({
  searchParams,
}: FeedbackPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = getParamValue(resolvedSearchParams, 'q').trim().slice(0, 100);

  const rawSort = getParamValue(resolvedSearchParams, 'sort');
  const sort: BoardSort =
    rawSort === 'oldest' || rawSort === 'top' || rawSort === 'discussed'
      ? rawSort
      : 'newest';

  const pageParam = Number.parseInt(
    getParamValue(resolvedSearchParams, 'page'),
    10,
  );
  const safeRequestedPage =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let requestsQuery = supabase
    .from('feature_requests')
    .select('id, title, description, created_at, author_id, author_name')
    .limit(500);

  if (query.length > 0) {
    const escapedQuery = query.replace(/[%_]/g, (match) => `\\${match}`);
    requestsQuery = requestsQuery.or(
      `title.ilike.%${escapedQuery}%,description.ilike.%${escapedQuery}%,author_name.ilike.%${escapedQuery}%`,
    );
  }

  const { data: requestsData, error: requestsError } = await requestsQuery;

  if (requestsError) {
    console.error('Failed to load feedback requests:', requestsError.message);
  }

  const requests = (requestsData ?? []) as FeatureRequestRow[];
  const requestIds = requests.map((request) => request.id);

  let votes: VoteRow[] = [];
  let comments: CommentRow[] = [];

  if (requestIds.length > 0) {
    const [
      { data: votesData, error: votesError },
      { data: commentsData, error: commentsError },
    ] = await Promise.all([
      supabase
        .from('feature_request_votes')
        .select('request_id, user_id, vote_value')
        .in('request_id', requestIds),
      supabase
        .from('feature_request_comments')
        .select('id, request_id, author_id, author_name, content, created_at')
        .in('request_id', requestIds)
        .order('created_at', { ascending: true }),
    ]);

    if (votesError) {
      console.error('Failed to load feedback votes:', votesError.message);
    }

    if (commentsError) {
      console.error('Failed to load feedback comments:', commentsError.message);
    }

    votes = (votesData ?? []) as VoteRow[];
    comments = (commentsData ?? []) as CommentRow[];
  }

  const votesByRequest = new Map<number, VoteRow[]>();
  for (const vote of votes) {
    const existing = votesByRequest.get(vote.request_id) ?? [];
    existing.push(vote);
    votesByRequest.set(vote.request_id, existing);
  }

  const commentsByRequest = new Map<number, CommentRow[]>();
  for (const comment of comments) {
    const existing = commentsByRequest.get(comment.request_id) ?? [];
    existing.push(comment);
    commentsByRequest.set(comment.request_id, existing);
  }

  const currentUserId = session?.user.id;

  const boardRequests = requests.map((request) => {
    const requestVotes = votesByRequest.get(request.id) ?? [];
    const requestComments = commentsByRequest.get(request.id) ?? [];

    const upvotes = requestVotes.filter((vote) => vote.vote_value === 1).length;
    const downvotes = requestVotes.filter(
      (vote) => vote.vote_value === -1,
    ).length;
    const currentUserVote =
      requestVotes.find((vote) => vote.user_id === currentUserId)?.vote_value ??
      0;

    return {
      id: request.id,
      title: request.title,
      description: request.description,
      createdAt: request.created_at,
      authorName: request.author_name,
      authorId: request.author_id,
      upvotes,
      downvotes,
      commentCount: requestComments.length,
      currentUserVote: currentUserVote as -1 | 0 | 1,
      comments: requestComments.map((comment) => ({
        id: comment.id,
        authorName: comment.author_name,
        authorId: comment.author_id,
        createdAt: comment.created_at,
        content: comment.content,
      })),
    };
  });

  const sortedRequests = [...boardRequests].sort((a, b) => {
    if (sort === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    if (sort === 'top') {
      const scoreA = a.upvotes - a.downvotes;
      const scoreB = b.upvotes - b.downvotes;
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (sort === 'discussed') {
      if (b.commentCount !== a.commentCount) {
        return b.commentCount - a.commentCount;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalItems = sortedRequests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(safeRequestedPage, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedRequests = sortedRequests.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,rgba(109,40,217,0.14),rgba(255,255,255,0.9)_45%,rgba(16,185,129,0.12)_100%)] px-4 py-16 sm:px-6 dark:bg-[radial-gradient(120%_120%_at_50%_0%,rgba(109,40,217,0.28),rgba(2,6,23,0.96)_45%,rgba(16,185,129,0.18)_100%)]">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="font-raleway text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
            Feedback Board
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Public roadmap input for everyone to read. Active accounts can post
            requests, vote, and discuss details.
          </p>
        </div>

        <FeedbackBoardClient
          requests={pagedRequests}
          canInteract={Boolean(session)}
          query={query}
          sort={sort}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
        />
      </div>
    </section>
  );
}
