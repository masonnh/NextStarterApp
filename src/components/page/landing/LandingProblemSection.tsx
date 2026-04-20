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
      <Card>
        <CardContent className="space-y-3 py-6">
          {problemPain.points.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-4 text-primary" />
              <p className="text-muted-foreground">{point}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </LandingSectionShell>
  );
}
