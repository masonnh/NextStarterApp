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
    <div className="relative overflow-hidden pb-16 [--lp-green:#16A34A] [--lp-purple:#6D28D9] [--lp-purple-soft:#A78BFA] [--lp-yellow:#FACC15] bg-[radial-gradient(circle_at_12%_0%,rgba(109,40,217,0.16),transparent_38%),radial-gradient(circle_at_88%_15%,rgba(22,163,74,0.14),transparent_35%),linear-gradient(to_bottom,#ffffff,#f8fafc)] dark:bg-[radial-gradient(circle_at_12%_0%,rgba(167,139,250,0.16),transparent_38%),radial-gradient(circle_at_88%_15%,rgba(74,222,128,0.12),transparent_35%),linear-gradient(to_bottom,#09090b,#111827)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:34px_34px] dark:bg-[linear-gradient(to_right,rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(71,85,105,0.16)_1px,transparent_1px)]" />
      <div className="relative z-10">
        {enabledSections.map((sectionKey) => {
          const SectionComponent = sectionComponents[sectionKey];
          return <SectionComponent key={sectionKey} />;
        })}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'NextStarterApp',
  description:
    'A template for building SaaS apps with Next.js, Tailwind, and Supabase.',
};
