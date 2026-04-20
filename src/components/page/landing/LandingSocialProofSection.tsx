import { Card, CardContent } from '@/components/ui/card';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingSocialProofSection() {
  const { socialProof } = landingContent;
  const cardStyles = [
    'border-violet-200 bg-violet-50/70 dark:border-violet-500/30 dark:bg-violet-500/10',
    'border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/30 dark:bg-emerald-500/10',
    'border-amber-200 bg-amber-50/80 dark:border-amber-500/30 dark:bg-amber-500/10',
    'border-indigo-200 bg-indigo-50/70 dark:border-indigo-500/30 dark:bg-indigo-500/10',
  ];

  return (
    <LandingSectionShell
      id="social-proof"
      title="Social proof"
      subtitle={socialProof.title}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {socialProof.metrics.map((metric, index) => (
          <Card key={metric.label} className={cardStyles[index % cardStyles.length]}>
            <CardContent className="space-y-2 py-6">
              <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </LandingSectionShell>
  );
}
