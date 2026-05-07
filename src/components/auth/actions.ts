'use client';

import { Provider } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function login(provider: Provider) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${baseUrl}/profile`,
      },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error logging in: ', error);
    return { success: false, error };
  }
}

export async function logout() {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Optional: Redirect after logout
    window.location.href = `${baseUrl}/login`;

    return { success: true };
  } catch (error) {
    console.error('Error logging out: ', error);
    return { success: false, error };
  }
}
