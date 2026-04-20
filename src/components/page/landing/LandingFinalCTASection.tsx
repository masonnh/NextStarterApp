import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingFinalCTASection() {
  const { finalCta } = landingContent;

  return (
    <LandingSectionShell id="final-cta" title="Final CTA">
      <Card className="bg-muted/40">
        <CardContent className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h3 className="font-raleway text-2xl font-semibold tracking-tight">
              {finalCta.title}
            </h3>
            <p className="text-muted-foreground">{finalCta.subtitle}</p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href={finalCta.primaryCta.href}>
              {finalCta.primaryCta.label}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </LandingSectionShell>
  );
}
