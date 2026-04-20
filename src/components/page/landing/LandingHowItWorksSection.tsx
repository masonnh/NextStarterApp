import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingHowItWorksSection() {
  const { howItWorks } = landingContent;

  return (
    <LandingSectionShell
      id="how-it-works"
      title="How it works"
      subtitle={howItWorks.title}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {howItWorks.steps.map((step, index) => (
          <Card
            key={step.title}
            className="relative border-slate-200 bg-white/90 shadow-sm shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-black/20"
          >
            <CardHeader className="space-y-3">
              <div className="inline-flex w-fit rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200">
                Step {index + 1}
              </div>
              <CardTitle className="text-lg text-slate-900 dark:text-slate-100">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
            </CardContent>
            {index < howItWorks.steps.length - 1 ? (
              <ArrowRight className="absolute top-1/2 -right-3 hidden size-5 -translate-y-1/2 text-[var(--lp-green)] md:block" />
            ) : null}
          </Card>
        ))}
      </div>
    </LandingSectionShell>
  );
}
