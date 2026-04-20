import { AlertTriangle } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingProblemSection() {
  const { problemPain } = landingContent;

  return (
    <LandingSectionShell
      id="problem-pain"
      title="Problem / pain"
      subtitle={problemPain.title}
    >
      <Card className="border-violet-200 bg-[linear-gradient(135deg,rgba(109,40,217,0.08),rgba(250,204,21,0.09))] dark:border-violet-500/30 dark:bg-[linear-gradient(135deg,rgba(109,40,217,0.2),rgba(250,204,21,0.1))]">
        <CardContent className="space-y-3 py-6">
          {problemPain.points.map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-lg bg-white/70 p-3 dark:bg-slate-900/60">
              <AlertTriangle className="mt-0.5 size-4 text-amber-500 dark:text-amber-300" />
              <p className="text-slate-700 dark:text-slate-200">{point}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </LandingSectionShell>
  );
}
