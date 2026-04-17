import { createServerClient, serializeCookieHeader, type CookieOptions } from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

export function createClient(req: NextApiRequest, res: NextApiResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(req.cookies).map(([name, value]) => ({
            name,
            value: value ?? '',
          }));
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          res.setHeader(
            'Set-Cookie',
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options ?? {})
            )
          );
        },
      },
    }
  );
}