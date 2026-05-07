import { NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@/lib/supabase/server';

export async function proxy(request: NextRequest) {
  // Refresh auth cookies/session for all matched routes.
  const sessionResponse = await updateSession(request);

  // Define protected routes for this starter template.
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/profile');
  if (!isProtectedRoute) {
    return sessionResponse;
  }

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect unauthenticated users away from protected routes.
  if (!session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  return sessionResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
