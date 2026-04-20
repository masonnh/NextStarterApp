import { Metadata } from 'next';

import LandingFAQSection from '@/components/page/landing/LandingFAQSection';
import LandingFeaturesSection from '@/components/page/landing/LandingFeaturesSection';
import LandingFinalCTASection from '@/components/page/landing/LandingFinalCTASection';
import LandingHeroSection from '@/components/page/landing/LandingHeroSection';
import LandingHowItWorksSection from '@/components/page/landing/LandingHowItWorksSection';
import LandingPricingSection from '@/components/page/landing/LandingPricingSection';
import LandingProblemSection from '@/components/page/landing/LandingProblemSection';
import LandingSocialProofSection from '@/components/page/landing/LandingSocialProofSection';
import LandingTestimonialsSection from '@/components/page/landing/LandingTestimonialsSection';

const sectionComponents = {
  hero: LandingHeroSection,
  socialProof: LandingSocialProofSection,
  problemPain: LandingProblemSection,
  howItWorks: LandingHowItWorksSection,
  featuresBenefits: LandingFeaturesSection,
  testimonials: LandingTestimonialsSection,
  pricing: LandingPricingSection,
  faq: LandingFAQSection,
  finalCta: LandingFinalCTASection,
} as const;

type LandingSectionKey = keyof typeof sectionComponents;

const enabledSections: LandingSectionKey[] = [
  'hero',
  'socialProof',
  'problemPain',
  'howItWorks',
  'featuresBenefits',
  'testimonials',
  'pricing',
  'faq',
  'finalCta',
];

export default function Home() {
  return (
    <div className="pb-10">
      {enabledSections.map((sectionKey) => {
        const SectionComponent = sectionComponents[sectionKey];
        return <SectionComponent key={sectionKey} />;
      })}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'NextStarterApp',
  description:
    'A template for building SaaS apps with Next.js, Tailwind, and Supabase.',
};
