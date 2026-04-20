import { Metadata } from 'next';

import OAuthLoginButton from '@/components/auth/OAuthLoginButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LogIn() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <OAuthLoginButton
            provider="google"
            logo="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            buttonText="Continue with Google"
          />
        </CardContent>
      </Card>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Create a free account to get started',
};
