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
  status: string;
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
  }).format(new Date(date));
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(id: string) {
  const colors = [
    'bg-violet-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-blue-500',
    'bg-pink-500',
    'bg-teal-500',
  ];
  const hash = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  return colors[hash % colors.length];
}

type StatusKey = 'open' | 'planned' | 'in-progress' | 'completed' | 'declined';

function getStatusIcon(status: string) {
  const iconMap: Record<StatusKey, React.ReactNode> = {
    open: <div className="size-2 rounded-full bg-slate-400 dark:bg-slate-500" />,
    planned: <div className="size-2 rounded-full bg-blue-500" />,
    'in-progress': <div className="size-2 rounded-full bg-violet-500" />,
    completed: <div className="size-2 rounded-full bg-emerald-500" />,
    declined: <div className="size-2 rounded-full bg-red-500" />,
  };
  return iconMap[status as StatusKey] || iconMap.open;
}

function getStatusLabel(status: string) {
  const labels: Record<StatusKey, string> = {
    open: 'Open',
    planned: 'Planned',
    'in-progress': 'In Progress',
    completed: 'Completed',
    declined: 'Declined',
  };
  return labels[status as StatusKey] || 'Open';
}

type FeedbackBoardLayoutProps = {
  requests: FeedbackRequest[];
  canInteract: boolean;
  query: string;
  sort: 'newest' | 'oldest' | 'top' | 'discussed';
  currentPage: number;
  totalPages: number;
  totalItems: number;
  statusCounts: Record<string, number>;
  selectedStatus: string;
};

function buildBoardLink(
  page: number,
  query: string,
  sort: 'newest' | 'oldest' | 'top' | 'discussed',
  status: string,
) {
  const params = new URLSearchParams();

  if (query.trim().length > 0) {
    params.set('q', query.trim());
  }

  if (sort !== 'newest') {
    params.set('sort', sort);
  }

  if (status) {
    params.set('status', status);
  }

  if (page > 1) {
    params.set('page', String(page));
  }

  const queryString = params.toString();
  return queryString.length > 0 ? `/feedback?${queryString}` : '/feedback';
}

const STATUS_LIST: Array<{ key: string; label: string }> = [
  { key: 'open', label: 'Open' },
  { key: 'planned', label: 'Planned' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'declined', label: 'Declined' },
];

export default function FeedbackBoardLayout({
  requests,
  canInteract,
  query,
  sort,
  currentPage,
  totalPages,
  totalItems,
  statusCounts,
  selectedStatus,
}: FeedbackBoardLayoutProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null,
  );
  const [isFormVisible, setIsFormVisible] = useState(false);

  const selectedRequest = useMemo(
    () => requests.find((request) => request.id === selectedRequestId) ?? null,
    [requests, selectedRequestId],
  );

  const totalCount = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="grid min-h-screen gap-0 lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <div className="border-r border-slate-200 bg-white/50 px-4 py-6 dark:border-slate-800 dark:bg-slate-950/30">
        <div className="space-y-1">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-base font-semibold text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800/60"
          >
            <Link href="/feedback">
              Create Request
            </Link>
          </Button>
        </div>

        <div className="mt-8 space-y-0.5">
          <p className="px-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Requests ({totalCount})
          </p>

          {STATUS_LIST.map(({ key, label }) => (
            <Link
              key={key}
              href={buildBoardLink(1, query, sort, key)}
              className={`group block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                selectedStatus === key
                  ? 'bg-violet-100 text-violet-900 dark:bg-violet-900/30 dark:text-violet-200'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{label}</span>
                <span className="text-xs font-medium text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">
                  {statusCounts[key] ?? 0}
                </span>
              </div>
            </Link>
          ))}

          <Link
            href={buildBoardLink(1, query, sort, '')}
            className={`group block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
              !selectedStatus
                ? 'bg-violet-100 text-violet-900 dark:bg-violet-900/30 dark:text-violet-200'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>All requests</span>
              <span className="text-xs font-medium text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">
                {totalCount}
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {selectedStatus
                  ? `${getStatusLabel(selectedStatus)} Requests`
                  : 'All Requests'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {requests.length} of {totalItems} request
                {totalItems === 1 ? '' : 's'}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setIsFormVisible((value) => !value)}
              className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400"
            >
              {isFormVisible ? 'Hide form' : '+ Give feedback'}
            </Button>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="border-b border-slate-200 bg-white/50 px-6 py-3 dark:border-slate-800 dark:bg-slate-950/30">
          <form
            className="grid gap-2 md:grid-cols-[1fr_140px_auto] md:items-end"
            method="get"
            action="/feedback"
          >
            <label className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <span className="block text-xs font-medium">Search</span>
              <input
                type="search"
                name="q"
                placeholder="Search requests..."
                defaultValue={query}
                className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>

            <label className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <span className="block text-xs font-medium">Sort</span>
              <select
                name="sort"
                defaultValue={sort}
                className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="top">Top voted</option>
                <option value="discussed">Discussed</option>
              </select>
            </label>

            {selectedStatus && (
              <input type="hidden" name="status" value={selectedStatus} />
            )}

            <Button type="submit" variant="outline" size="sm">
              Apply
            </Button>
          </form>
        </div>

        {/* Request List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-2">
            {requests.length === 0 ? (
              <Card className="border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
                <CardContent className="py-8 text-center text-sm text-slate-600 dark:text-slate-300">
                  No requests found. Be the first to post an idea.
                </CardContent>
              </Card>
            ) : null}

            {requests.map((request) => (
              <button
                key={request.id}
                type="button"
                onClick={() => setSelectedRequestId(request.id)}
                className="w-full rounded-lg border border-slate-200 bg-white/70 p-3 text-left transition-colors hover:bg-slate-50 hover:border-violet-300 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-slate-900/60 dark:hover:border-violet-700"
              >
                <div className="flex items-start gap-3">
                  {/* Status Icon */}
                  <div className="mt-1 flex-shrink-0">
                    {getStatusIcon(request.status)}
                  </div>

                  {/* Title and Author */}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {request.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      by {request.authorName}
                    </p>
                  </div>

                  {/* Avatar */}
                  <div
                    className={`${getAvatarColor(request.authorId)} flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white`}
                  >
                    {getInitials(request.authorName)}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 transition-colors ${
                      request.currentUserVote === 1
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsUp className="size-3" />
                    <span className="font-medium">{request.upvotes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 transition-colors ${
                      request.currentUserVote === -1
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsDown className="size-3" />
                    <span className="font-medium">{request.downvotes}</span>
                  </button>

                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="size-3" />
                    {request.commentCount}
                  </span>

                  <span className="ml-auto text-slate-400 dark:text-slate-500">
                    {formatDate(request.createdAt)}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between gap-3">
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
                  <Link
                    href={buildBoardLink(currentPage - 1, query, sort, selectedStatus)}
                  >
                    Previous
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                >
                  <Link
                    href={buildBoardLink(currentPage + 1, query, sort, selectedStatus)}
                  >
                    Next
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Form Modal */}
      {isFormVisible ? (
        <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-slate-950/70 px-4 py-10 lg:inset-y-0">
          <Card className="w-full max-w-2xl border-violet-300/70 bg-white dark:border-violet-800 dark:bg-slate-950">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  Leave a feature request
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Share what should be built next. Signed-in users can post,
                  vote, and comment.
                </CardDescription>
              </div>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => setIsFormVisible(false)}
                aria-label="Close form"
              >
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form action={createFeatureRequest} className="space-y-3">
                <label className="block space-y-1">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Title
                  </span>
                  <input
                    name="title"
                    placeholder="Feature title"
                    minLength={5}
                    maxLength={120}
                    required
                    disabled={!canInteract}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Description
                  </span>
                  <textarea
                    name="description"
                    placeholder="Describe the problem and ideal solution"
                    minLength={10}
                    maxLength={3000}
                    required
                    disabled={!canInteract}
                    className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {!canInteract
                      ? 'Log in to submit a request.'
                      : 'Your account info will be visible.'}
                  </p>
                  <Button
                    type="submit"
                    disabled={!canInteract}
                    className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Detail Modal */}
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
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedRequest.status)}
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {getStatusLabel(selectedRequest.status)}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-xl text-slate-900 dark:text-slate-100">
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

                <form
                  action={addFeedbackComment}
                  className="space-y-2"
                  onClick={(e) => e.stopPropagation()}
                >
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
                    className="min-h-20 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
