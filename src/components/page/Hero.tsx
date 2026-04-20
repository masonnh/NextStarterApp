import Link from 'next/link';

import { Button } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="pointer-events-none absolute -top-28 -left-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-28">
        <div className="space-y-6">
          <h1 className="font-raleway text-4xl leading-tight font-semibold tracking-tight sm:text-5xl md:text-6xl">
            One-click
            <br />
            <span className="text-primary">cashflow</span> for
            <br />
            eCommerce
          </h1>

          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
            Waste time on number crunching?
            <br />
            We fixed that.
          </p>

          <div className="flex items-center gap-3">
            <Button asChild size="lg">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden rounded-xl border bg-card/80 p-6 text-sm text-muted-foreground shadow-sm md:block">
          <p className="font-medium text-foreground">Live Forecast Snapshot</p>
          <p className="mt-2">
            Unified cashflow tracking, daily syncs, and decision-ready
            projections in one clean workspace.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-md border bg-background p-3">
              <p className="text-xs text-muted-foreground">Runway</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                14.3 mo
              </p>
            </div>
            <div className="rounded-md border bg-background p-3">
              <p className="text-xs text-muted-foreground">Burn Rate</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                $18.2k
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
