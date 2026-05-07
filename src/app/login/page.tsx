import { Metadata } from 'next';

import OAuthLoginButton from '@/components/auth/OAuthLoginButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LogIn() {
  return (
    <section className="relative flex min-h-[calc(100vh-12rem)] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.2),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.16),transparent_70%)]" />
      <Card className="relative w-full max-w-md border-violet-200 bg-white/95 shadow-lg shadow-violet-100/50 dark:border-violet-500/30 dark:bg-slate-900/90 dark:shadow-violet-900/30">
        <CardHeader>
          <CardTitle className="font-raleway text-2xl tracking-tight text-slate-900 dark:text-slate-100">
            Log in
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Continue with Google to access your NextStarterApp workspace.
          </p>
          <OAuthLoginButton
            provider="google"
            logo="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            buttonText="Continue with Google"
          />
        </CardContent>
      </Card>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Create a free account to get started',
};
