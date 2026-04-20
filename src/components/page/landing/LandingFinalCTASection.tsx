import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingFinalCTASection() {
  const { finalCta } = landingContent;

  return (
    <LandingSectionShell id="final-cta" title="Final CTA">
      <Card className="overflow-hidden border-violet-200 bg-[linear-gradient(120deg,rgba(109,40,217,0.12),rgba(22,163,74,0.1),rgba(250,204,21,0.14))] shadow-lg shadow-violet-100/60 dark:border-violet-500/30 dark:bg-[linear-gradient(120deg,rgba(109,40,217,0.3),rgba(22,163,74,0.18),rgba(250,204,21,0.2))] dark:shadow-violet-900/30">
        <CardContent className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h3 className="font-raleway text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {finalCta.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">{finalCta.subtitle}</p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-[var(--lp-purple)] text-white shadow-lg shadow-violet-300/40 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400 dark:text-slate-950 dark:shadow-violet-900/40"
          >
            <Link href={finalCta.primaryCta.href}>
              {finalCta.primaryCta.label}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </LandingSectionShell>
  );
}
