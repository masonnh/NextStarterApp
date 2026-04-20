import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';

export default function PromoCard() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Card className="bg-muted/40">
        <CardContent className="grid gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
          <div className="space-y-4">
            <h2 className="font-raleway text-2xl font-semibold tracking-tight sm:text-3xl">
              Join our <span className="text-primary">Free</span> Plan
            </h2>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Automate your cashflow forecasts</li>
              <li>Easily consume your data</li>
              <li>Access strategic AI insights</li>
            </ul>
          </div>

          <div className="space-y-3 rounded-lg border bg-card p-5">
            <p className="text-sm font-medium">Try it out</p>
            <p className="text-4xl font-semibold tracking-tight">
              $0<span className="text-base text-muted-foreground">/m</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Create and edit unlimited proformas with AI.
            </p>
            <Button asChild className="w-full">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
