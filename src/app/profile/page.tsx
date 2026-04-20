import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Profile() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Profile Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are working on building this page. Check back soon.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your profile page',
};
