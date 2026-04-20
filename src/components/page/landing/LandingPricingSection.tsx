import PricingCard from '@/components/page/PricingCard';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingPricingSection() {
  const { pricing } = landingContent;

  return (
    <LandingSectionShell id="pricing" title="Pricing" subtitle={pricing.title}>
      <div className="grid gap-4 md:grid-cols-3">
        {pricing.plans.map((plan) => (
          <PricingCard key={plan.planName} {...plan} />
        ))}
      </div>
    </LandingSectionShell>
  );
}
