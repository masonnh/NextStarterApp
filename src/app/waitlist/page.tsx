import { Metadata } from 'next';
import Image from 'next/image';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function WaitlistPage() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.2),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.16),transparent_70%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2 md:items-center">
        <Card className="border-violet-200 bg-white/95 shadow-lg shadow-violet-100/50 dark:border-violet-500/30 dark:bg-slate-900/90 dark:shadow-violet-900/30">
          <CardContent className="space-y-5 py-8">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-violet-600 via-emerald-500 to-amber-400" />
            <h1 className="font-raleway text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Join the NextStarterApp waitlist
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Be the first to get updates, templates, and early feature drops.
            </p>

            <form className="flex flex-col gap-3 sm:flex-row" action="#">
              <Input
                type="email"
                required
                placeholder="you@company.com"
                className="h-11 border-emerald-200 bg-white/80 dark:border-emerald-500/30 dark:bg-slate-950/60"
              />
              <Button
                type="submit"
                className="h-11 bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400"
              >
                Join waitlist
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-slate-200 bg-white/90 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-black/20">
          <CardContent className="p-3">
            <Image
              src="/img/waitlist-placeholder.svg"
              alt="NextStarterApp placeholder app screenshot"
              width={1400}
              height={900}
              className="h-auto w-full rounded-lg border border-slate-200 dark:border-slate-700"
              priority
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Waitlist',
  description: 'Join the NextStarterApp waitlist for updates and early access.',
};
