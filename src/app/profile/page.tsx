import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Profile() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-lg border-emerald-200 bg-[linear-gradient(120deg,rgba(22,163,74,0.08),rgba(109,40,217,0.08))] shadow-lg shadow-emerald-100/50 dark:border-emerald-500/30 dark:bg-[linear-gradient(120deg,rgba(22,163,74,0.18),rgba(109,40,217,0.16))] dark:shadow-emerald-900/20">
        <CardHeader>
          <CardTitle className="font-raleway text-2xl tracking-tight text-slate-900 dark:text-slate-100">
            Profile Page
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are working on building this page. Check back soon.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your profile page',
};
