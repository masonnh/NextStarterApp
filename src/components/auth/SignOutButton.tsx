'use client';

import { Button } from '@/components/ui/Button';

import { logout } from './actions';

interface SignOutButtonProps {
  className?: string;
}

function SignOutButton({ className }: SignOutButtonProps) {
  async function handleLogout() {
    logout();
  }

  return (
    <Button onClick={handleLogout} className={className}>
      Sign out
    </Button>
  );
}

export default SignOutButton;
