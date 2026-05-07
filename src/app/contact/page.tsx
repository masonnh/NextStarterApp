import { Metadata } from 'next';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { submitContactForm } from './actions';

export default function ContactPage() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.2),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.16),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-3xl">
        <Card className="border-emerald-200 bg-white/95 shadow-lg shadow-emerald-100/50 dark:border-emerald-500/30 dark:bg-slate-900/90 dark:shadow-emerald-900/20">
          <CardHeader className="space-y-3">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-violet-600 via-emerald-500 to-amber-400" />
            <CardTitle className="font-raleway text-3xl tracking-tight text-slate-900 dark:text-slate-100">
              Contact us
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-300">
              Share what you are building, ask a question, or send feedback.
            </p>
          </CardHeader>

          <CardContent>
            <form action={submitContactForm} className="space-y-4">
              <Input
                type="text"
                name="name"
                required
                minLength={2}
                placeholder="Your name"
                className="h-11 border-violet-200 bg-white/80 dark:border-violet-500/30 dark:bg-slate-950/60"
              />
              <Input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                className="h-11 border-emerald-200 bg-white/80 dark:border-emerald-500/30 dark:bg-slate-950/60"
              />
              <textarea
                name="message"
                required
                minLength={10}
                rows={6}
                placeholder="Tell us what you would like to share..."
                className="w-full rounded-md border border-amber-200 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition-[color,box-shadow] placeholder:text-slate-400 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-amber-500/30 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <Button
                type="submit"
                className="h-11 bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400"
              >
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the NextStarterApp team.',
};
