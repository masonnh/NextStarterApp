'use client';

import { useEffect, useState } from 'react';

import { Session, User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

const useUserSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const checkUserSession = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error fetching user:', userError.message);
        setUser(null);
        setSession(null);
      } else {
        setUser(user);
        // Only get session if user exists
        if (user) {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();
          if (sessionError) {
            console.error('Error fetching session:', sessionError.message);
          } else {
            setSession(session);
          }
        } else {
          setSession(null);
        }
      }
    };

    checkUserSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, _session) => {
      checkUserSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session };
};

export default useUserSession;
