import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { landingContent } from './landing-content';

export default function LandingHeroSection() {
  const { hero } = landingContent;

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/60">
      <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.34),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.28),transparent_70%)]" />
      <div className="pointer-events-none absolute right-24 -bottom-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.24),transparent_70%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-24">
        <div className="space-y-5">
          <p className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200">
            {hero.badge}
          </p>
          <h1 className="font-raleway text-4xl leading-tight font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-[var(--lp-purple)] text-white shadow-lg shadow-violet-300/40 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400 dark:text-slate-950 dark:shadow-violet-900/50"
            >
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:bg-emerald-500/20"
            >
              <Link href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-violet-100 bg-white/95 shadow-xl shadow-violet-100/60 dark:border-violet-500/30 dark:bg-slate-900/90 dark:shadow-violet-900/30">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-slate-900 dark:text-slate-100">
              Why teams pick NextStarterApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              {hero.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 text-[var(--lp-green)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
