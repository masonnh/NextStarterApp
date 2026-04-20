import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { landingContent } from './landing-content';

export default function LandingHeroSection() {
  const { hero } = landingContent;

  return (
    <section className="relative overflow-hidden border-b bg-muted/30">
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-24">
        <div className="space-y-5">
          <p className="text-sm font-medium text-primary">{hero.badge}</p>
          <h1 className="font-raleway text-4xl leading-tight font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why teams pick NextStarterApp</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {hero.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 text-primary" />
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
