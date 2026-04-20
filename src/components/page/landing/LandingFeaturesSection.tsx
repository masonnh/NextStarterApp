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
        {featuresBenefits.items.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.benefit}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </LandingSectionShell>
  );
}
