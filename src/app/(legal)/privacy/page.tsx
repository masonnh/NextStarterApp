import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicy() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Card className="border-violet-200 bg-white/95 shadow-lg shadow-violet-100/50 dark:border-violet-500/30 dark:bg-slate-900/90 dark:shadow-violet-900/30">
        <CardHeader>
          <CardTitle className="font-raleway text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
              Introduction
            </h2>
            <p className="text-muted-foreground">
              This Privacy Policy explains how we collect, use, and protect your
              personal information when you use our services. We are committed
              to ensuring your privacy and protecting any personal data you
              share with us.
            </p>
          </section>

          <Separator className="bg-slate-300/70 dark:bg-slate-700" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
              Information We Collect
            </h2>
            <p className="text-muted-foreground">
              We collect the following types of information:
            </p>
            <p className="font-medium">Personal Information:</p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Name and email address</li>
              <li>Billing information</li>
              <li>Account credentials</li>
            </ul>
            <p className="font-medium">Automatically Collected Information:</p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>IP address</li>
              <li>Device information</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <Separator className="bg-slate-300/70 dark:bg-slate-700" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground">We use your information to:</p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Provide and maintain our services</li>
              <li>Process your payments</li>
              <li>Send service updates and notifications</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <Separator className="bg-slate-300/70 dark:bg-slate-700" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
              Data Security
            </h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <Separator className="bg-slate-300/70 dark:bg-slate-700" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground">
              We may share your information with trusted third-party service
              providers who assist us in operating our services, conducting
              business, or servicing you.
            </p>
          </section>

          <Separator className="bg-slate-300/70 dark:bg-slate-700" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
              Your Rights
            </h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal
              information. You may also request a copy of your data or withdraw
              your consent for its processing.
            </p>
          </section>

          <Separator className="bg-slate-300/70 dark:bg-slate-700" />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
              Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </section>
        </CardContent>
      </Card>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn about how we collect, use, and protect your personal information',
};
