'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { MessageSquare, ThumbsDown, ThumbsUp, X } from 'lucide-react';

import {
  addFeedbackComment,
  castFeedbackVote,
  createFeatureRequest,
} from '@/app/feedback/actions';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type FeedbackComment = {
  id: number;
  authorName: string;
  authorId: string;
  createdAt: string;
  content: string;
};

type FeedbackRequest = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  authorName: string;
  authorId: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  currentUserVote: -1 | 0 | 1;
  comments: FeedbackComment[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

type FeedbackBoardClientProps = {
  requests: FeedbackRequest[];
  canInteract: boolean;
  query: string;
  sort: 'newest' | 'oldest' | 'top' | 'discussed';
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

function buildBoardLink(
  page: number,
  query: string,
  sort: 'newest' | 'oldest' | 'top' | 'discussed',
) {
  const params = new URLSearchParams();

  if (query.trim().length > 0) {
    params.set('q', query.trim());
  }

  if (sort !== 'newest') {
    params.set('sort', sort);
  }

  if (page > 1) {
    params.set('page', String(page));
  }

  const queryString = params.toString();
  return queryString.length > 0 ? `/feedback?${queryString}` : '/feedback';
}

export default function FeedbackBoardClient({
  requests,
  canInteract,
  query,
  sort,
  currentPage,
  totalPages,
  totalItems,
}: FeedbackBoardClientProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null,
  );

  const selectedRequest = useMemo(
    () => requests.find((request) => request.id === selectedRequestId) ?? null,
    [requests, selectedRequestId],
  );

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-slate-950/75">
        <CardContent className="pt-6">
          <form
            className="grid gap-3 md:grid-cols-[1fr_220px_auto] md:items-end"
            method="get"
            action="/feedback"
          >
            <label className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              Search
              <input
                type="search"
                name="q"
                placeholder="Search title, description, or author"
                defaultValue={query}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>

            <label className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              Sort by
              <select
                name="sort"
                defaultValue={sort}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="top">Top voted</option>
                <option value="discussed">Most discussed</option>
              </select>
            </label>

            <Button type="submit" variant="outline" className="md:self-end">
              Apply
            </Button>
          </form>

          <p className="pt-3 text-xs text-slate-500 dark:text-slate-400">
            Showing {requests.length} of {totalItems} request
            {totalItems === 1 ? '' : 's'}.
          </p>
        </CardContent>
      </Card>

      <Card className="border-violet-200/60 bg-white/90 dark:border-violet-800/60 dark:bg-slate-950/75">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">
            Leave a feature request
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-300">
            Share what should be built next. Signed-in users can post, vote, and
            comment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createFeatureRequest} className="space-y-3">
            <input
              name="title"
              placeholder="Feature title"
              minLength={5}
              maxLength={120}
              required
              disabled={!canInteract}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <textarea
              name="description"
              placeholder="Describe the problem and ideal solution"
              minLength={10}
              maxLength={3000}
              required
              disabled={!canInteract}
              className="min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {!canInteract
                  ? 'Log in to submit a request.'
                  : 'Public board. Your account is required to interact.'}
              </p>
              <Button
                type="submit"
                disabled={!canInteract}
                className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400"
              >
                Submit request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card className="border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
            <CardContent className="py-6 text-sm text-slate-600 dark:text-slate-300">
              No requests yet. Be the first to post an idea.
            </CardContent>
          </Card>
        ) : null}

        {requests.map((request) => (
          <Card
            key={request.id}
            className="border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70"
          >
            <CardHeader className="gap-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRequestId(request.id)}
                  className="text-left font-raleway text-lg font-semibold text-slate-900 hover:text-violet-700 dark:text-slate-100 dark:hover:text-violet-300"
                >
                  {request.title}
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(request.createdAt)}
                </p>
              </div>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Suggested by {request.authorName}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2 pb-6">
              <form action={castFeedbackVote}>
                <input type="hidden" name="requestId" value={request.id} />
                <input type="hidden" name="voteValue" value="1" />
                <Button
                  type="submit"
                  size="sm"
                  variant={
                    request.currentUserVote === 1 ? 'default' : 'outline'
                  }
                  disabled={!canInteract}
                  className={
                    request.currentUserVote === 1
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400'
                      : undefined
                  }
                >
                  <ThumbsUp className="size-4" />
                  {request.upvotes}
                </Button>
              </form>

              <form action={castFeedbackVote}>
                <input type="hidden" name="requestId" value={request.id} />
                <input type="hidden" name="voteValue" value="-1" />
                <Button
                  type="submit"
                  size="sm"
                  variant={
                    request.currentUserVote === -1 ? 'default' : 'outline'
                  }
                  disabled={!canInteract}
                  className={
                    request.currentUserVote === -1
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-300'
                      : undefined
                  }
                >
                  <ThumbsDown className="size-4" />
                  {request.downvotes}
                </Button>
              </form>

              <span className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-300">
                <MessageSquare className="size-3.5" />
                {request.commentCount}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
            >
              <Link href={buildBoardLink(currentPage - 1, query, sort)}>
                Previous
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
            >
              <Link href={buildBoardLink(currentPage + 1, query, sort)}>
                Next
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedRequest ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 px-4 py-10"
          onClick={() => setSelectedRequestId(null)}
        >
          <Card
            className="w-full max-w-3xl border-violet-300/70 bg-white dark:border-violet-800 dark:bg-slate-950"
            onClick={(event) => event.stopPropagation()}
          >
            <CardHeader className="gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                    {selectedRequest.title}
                  </CardTitle>
                  <CardDescription className="pt-1 text-xs text-slate-500 dark:text-slate-400">
                    Suggested by {selectedRequest.authorName} on{' '}
                    {formatDate(selectedRequest.createdAt)}
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => setSelectedRequestId(null)}
                  aria-label="Close request details"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-200">
                {selectedRequest.description}
              </p>

              <div className="space-y-3">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                  Comments ({selectedRequest.comments.length})
                </h3>

                <div className="space-y-2">
                  {selectedRequest.comments.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No comments yet.
                    </p>
                  ) : null}

                  {selectedRequest.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {comment.authorName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                      <p className="pt-1 text-sm text-slate-700 dark:text-slate-300">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>

                <form action={addFeedbackComment} className="space-y-2">
                  <input
                    type="hidden"
                    name="requestId"
                    value={selectedRequest.id}
                  />
                  <textarea
                    name="content"
                    placeholder="Add a comment"
                    minLength={2}
                    maxLength={2000}
                    required
                    disabled={!canInteract}
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {!canInteract
                        ? 'Log in to comment.'
                        : 'Be clear and constructive.'}
                    </p>
                    <Button
                      type="submit"
                      disabled={!canInteract}
                      className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400"
                    >
                      Post comment
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
