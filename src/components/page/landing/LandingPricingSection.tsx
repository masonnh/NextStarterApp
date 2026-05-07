import PricingCard from '@/components/page/landing/LandingPricingCard';

import { landingContent } from './landing-content';
import LandingSectionShell from './LandingSectionShell';

export default function LandingPricingSection() {
  const { pricing } = landingContent;

  return (
    <LandingSectionShell id="pricing" title="Pricing" subtitle={pricing.title}>
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/70 md:grid-cols-3 md:p-6">
        {pricing.plans.map((plan) => (
          <PricingCard key={plan.planName} {...plan} />
        ))}
      </div>
    </LandingSectionShell>
  );
}
