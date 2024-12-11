import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    // Create Supabase client for SSR
    const supabase = await createClient();

    // Get user session
    const { data: { session } } = await supabase.auth.getSession();

    // Create a response object
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Handle API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        if (!session) {
            console.error('No session found for API route');
            return response;
        }
    } else {
        // define protected routes (user must be logged in to access)
        const isProtectedRoute = 
            request.nextUrl.pathname.startsWith('/profile')

        if (!session && isProtectedRoute) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/login';
            return NextResponse.redirect(redirectUrl);
        }
    }

    // Update the session
    const newResponse = await updateSession(request);

    return newResponse;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};