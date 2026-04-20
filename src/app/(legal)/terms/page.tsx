import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsAndConditions() {
  const sections = [
    {
      title: '1. Agreement to Terms',
      body: 'By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, do not use our service.',
    },
    {
      title: '2. Description of Service',
      body: 'We provide a software-as-a-service platform. The service is provided "as is" and may be modified, updated, or discontinued at any time without notice.',
    },
    {
      title: '3. User Accounts',
      body: 'To access certain features of the service, you must create an account. You are responsible for maintaining account confidentiality, all activity under your account, and promptly reporting unauthorized access.',
    },
    {
      title: '4. Payment Terms',
      body: 'Subscription fees are billed in advance on a monthly or annual basis. All payments are non-refundable. We reserve the right to change pricing with 30 days notice.',
    },
    {
      title: '5. Acceptable Use',
      body: 'You agree not to use the service for illegal purposes, violate laws, infringe intellectual property, transmit harmful code, or attempt unauthorized access.',
    },
    {
      title: '6. Data and Privacy',
      body: 'Your use of the service is also governed by our Privacy Policy. By using the service, you consent to the collection and use of information described there.',
    },
    {
      title: '7. Intellectual Property',
      body: 'All content, features, and functionality of the service are owned by us and protected by applicable intellectual property laws.',
    },
    {
      title: '8. Limitation of Liability',
      body: 'We are not liable for indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.',
    },
    {
      title: '9. Termination',
      body: 'We may terminate or suspend your account and access at our discretion, without notice, for conduct violating these terms or harming users, us, or third parties.',
    },
    {
      title: '10. Changes to Terms',
      body: 'We may modify these terms at any time and will notify users of material changes. Continued use after changes constitutes acceptance of the updated terms.',
    },
    {
      title: '11. Governing Law',
      body: 'These terms are governed by the laws of the United States of America, without regard to conflict of law provisions.',
    },
    {
      title: '12. Contact Information',
      body: 'For any questions about these Terms and Conditions, please contact us.',
    },
  ];

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Card className="border-violet-200 bg-white/95 shadow-lg shadow-violet-100/50 dark:border-violet-500/30 dark:bg-slate-900/90 dark:shadow-violet-900/30">
        <CardHeader>
          <CardTitle className="font-raleway text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
                {section.title}
              </h2>
              <p className="text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using our service',
};
