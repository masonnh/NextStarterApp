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
          <Card key={item.name}>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-full border bg-muted text-xs font-semibold">
                {initialsFromName(item.name)}
              </div>
              <CardTitle className="text-base">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.quote}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </LandingSectionShell>
  );
}
