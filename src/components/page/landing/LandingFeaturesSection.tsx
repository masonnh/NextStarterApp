import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingFeaturesSection() {
  const { featuresBenefits } = landingContent;

  return (
    <LandingSectionShell
      id="features-benefits"
      title="Features as benefits"
      subtitle={featuresBenefits.title}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {featuresBenefits.items.map((item, index) => (
          <Card
            key={item.title}
            className="overflow-hidden border-slate-200 bg-white/90 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900/80"
          >
            <div
              className={`h-1.5 ${
                index % 3 === 0
                  ? 'bg-violet-500'
                  : index % 3 === 1
                    ? 'bg-emerald-500'
                    : 'bg-amber-400'
              }`}
            />
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.benefit}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </LandingSectionShell>
  );
}
