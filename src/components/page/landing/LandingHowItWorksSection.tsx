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
          <Card key={step.title} className="relative">
            <CardHeader>
              <CardTitle className="text-lg">Step {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">{step.title}</p>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </CardContent>
            {index < howItWorks.steps.length - 1 ? (
              <ArrowRight className="absolute top-1/2 -right-3 hidden size-5 -translate-y-1/2 text-primary md:block" />
            ) : null}
          </Card>
        ))}
      </div>
    </LandingSectionShell>
  );
}
