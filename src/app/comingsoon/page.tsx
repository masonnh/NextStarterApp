import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ComingSoon() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-lg border-amber-200 bg-[linear-gradient(120deg,rgba(250,204,21,0.14),rgba(109,40,217,0.08))] shadow-lg shadow-amber-100/60 dark:border-amber-500/30 dark:bg-[linear-gradient(120deg,rgba(250,204,21,0.2),rgba(109,40,217,0.16))] dark:shadow-amber-900/20">
        <CardHeader>
          <CardTitle className="font-raleway text-2xl tracking-tight text-slate-900 dark:text-slate-100">
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are building this page now. Check back soon.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'This page is coming soon!',
};
