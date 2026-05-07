import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

/**
 * OAuth Callback Handler
 *
 * This route is called by Supabase after the user authenticates with Google.
 * Supabase automatically handles the OAuth code exchange, so this route is optional.
 *
 * Use this if you need to run custom logic after successful authentication:
 * - Update user profile metadata
 * - Log analytics
 * - Create/update related records
 * - Send welcome email
 * etc.
 *
 * If you don't need custom logic, you can remove this file and Supabase will
 * still handle the callback via its built-in auth flow.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (code) {
    const supabase = await createClient();

    try {
      // Exchange code for session (this is typically done by Supabase automatically,
      // but we can verify it here if needed)
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('OAuth callback error:', error.message);
        return NextResponse.redirect(
          `${request.nextUrl.origin}/login?error=${encodeURIComponent(error.message)}`,
        );
      }

      // Optional: Custom post-auth logic here
      if (data.session?.user) {
        const user = data.session.user;
        console.log(`User authenticated: ${user.email}`);

        // Example: Update user metadata or create welcome record
        // const { error: updateError } = await supabase
        //   .from('user_profiles')
        //   .upsert({
        //     user_id: user.id,
        //     email: user.email,
        //     display_name: user.user_metadata?.full_name || 'Community member',
        //   });
      }

      // Redirect to dashboard or profile
      return NextResponse.redirect(`${request.nextUrl.origin}/profile`);
    } catch (err) {
      console.error('Unexpected error in OAuth callback:', err);
      return NextResponse.redirect(
        `${request.nextUrl.origin}/login?error=auth_failed`,
      );
    }
  }

  // No code provided
  return NextResponse.redirect(`${request.nextUrl.origin}/login`);
}
