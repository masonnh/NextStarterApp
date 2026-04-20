import { Card, CardContent } from '@/components/ui/card';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingSocialProofSection() {
  const { socialProof } = landingContent;

  return (
    <LandingSectionShell
      id="social-proof"
      title="Social proof"
      subtitle={socialProof.title}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {socialProof.metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="space-y-2 py-6">
              <p className="text-2xl font-semibold tracking-tight">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </LandingSectionShell>
  );
}
