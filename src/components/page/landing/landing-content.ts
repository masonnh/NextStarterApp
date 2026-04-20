export const landingContent = {
  hero: {
    badge: 'Open Source SaaS Starter',
    title: 'Ship Your SaaS Faster With NextStarterApp',
    subtitle:
      'NextStarterApp gives you auth, payments scaffolding, shadcn UI, and production-ready patterns so you can focus on product, not setup.',
    primaryCta: {
      label: 'Start Building',
      href: '/login',
    },
    secondaryCta: {
      label: 'View Docs',
      href: '/terms',
    },
    highlights: [
      'Next.js + TypeScript app router structure',
      'Supabase auth flow with OAuth support',
      'Tailwind + shadcn component foundation',
    ],
  },
  socialProof: {
    title: 'Built for teams that move quickly',
    metrics: [
      { label: 'Starter installs', value: '1.4k+' },
      { label: 'Template forks', value: '320+' },
      { label: 'Average setup time', value: '15 min' },
      { label: 'Core integrations', value: '6+' },
    ],
  },
  problemPain: {
    title: 'Most SaaS teams lose weeks before they ship week one value',
    points: [
      'You wire auth and roles from scratch every project.',
      'You repeat the same UI plumbing and page structure again and again.',
      'You spend more time configuring than validating your product idea.',
    ],
  },
  howItWorks: {
    title: 'How NextStarterApp works',
    steps: [
      {
        title: 'Configure',
        description:
          'Clone the repo, set env vars, and boot with a prewired stack.',
      },
      {
        title: 'Customize',
        description:
          'Swap copy, update sections, and tailor shadcn components to your brand.',
      },
      {
        title: 'Ship',
        description:
          'Launch quickly with a maintainable structure built for iteration.',
      },
    ],
  },
  featuresBenefits: {
    title: 'Features that become outcomes',
    items: [
      {
        title: 'Auth + Session Helpers',
        benefit:
          'Launch secure sign-in flows without rebuilding auth each sprint.',
      },
      {
        title: 'Composable Section System',
        benefit:
          'Add, remove, and reorder landing sections in minutes from one page config.',
      },
      {
        title: 'shadcn + Tailwind Base',
        benefit:
          'Keep UI consistent with reusable components and utility-first styling.',
      },
    ],
  },
  testimonials: {
    title: 'Template users shipping faster',
    items: [
      {
        name: 'Ari, Indie Founder',
        quote:
          'I replaced two weeks of setup with one afternoon and shipped an MVP the same week.',
      },
      {
        name: 'Nina, Product Engineer',
        quote:
          'The structure is opinionated enough to move fast but flexible enough for real products.',
      },
      {
        name: 'Sam, Technical Consultant',
        quote:
          'Great baseline for client projects where time-to-first-demo matters most.',
      },
    ],
  },
  pricing: {
    title: 'Simple template pricing examples',
    plans: [
      {
        planName: 'Starter',
        price: '$0',
        period: 'month',
        features: ['1 project', 'Community support', 'Basic auth starter'],
        special: false,
      },
      {
        planName: 'Pro',
        price: '$29',
        period: 'month',
        features: [
          'Unlimited projects',
          'Advanced section presets',
          'Priority support examples',
        ],
        special: true,
      },
      {
        planName: 'Team',
        price: '$99',
        period: 'month',
        features: [
          'Team onboarding docs',
          'Architecture templates',
          'Migration guides',
        ],
        special: false,
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Is NextStarterApp production ready?',
        answer:
          'It is a solid template baseline with production-friendly patterns, but you should still validate security, monitoring, and compliance needs for your product.',
      },
      {
        question: 'Can I remove sections I do not need?',
        answer:
          'Yes. The homepage renders sections from a single ordered array, so removing one line removes a full section.',
      },
      {
        question: 'Can I use my own design system?',
        answer:
          'Yes. The section components are isolated and easy to swap while keeping the same content model.',
      },
      {
        question: 'Does this include payment integrations?',
        answer:
          'This template includes scaffolding and examples. You can plug in your preferred billing provider and flow.',
      },
    ],
  },
  finalCta: {
    title: 'Build your SaaS foundation today',
    subtitle:
      'Use NextStarterApp as your launchpad and focus your energy on product value, not boilerplate.',
    primaryCta: {
      label: 'Get Started',
      href: '/login',
    },
  },
} as const;
