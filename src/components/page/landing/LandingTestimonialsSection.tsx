import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

function initialsFromName(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function LandingTestimonialsSection() {
  const { testimonials } = landingContent;

  return (
    <LandingSectionShell
      id="testimonials"
      title="Testimonials"
      subtitle={testimonials.title}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.items.map((item) => (
          <Card
            key={item.name}
            className="border-slate-200 bg-white/90 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
          >
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                {initialsFromName(item.name)}
              </div>
              <CardTitle className="text-base text-slate-900 dark:text-slate-100">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                "{item.quote}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </LandingSectionShell>
  );
}
