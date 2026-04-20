'use client';

import Link from 'next/link';

import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useUserSession from '@/lib/hooks/useUserSession';

import SignOutButton from '../auth/SignOutButton';

const Navbar: React.FC = () => {
  const { user } = useUserSession();

  return (
    <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          className="font-raleway text-2xl font-semibold tracking-tight"
          href="/"
        >
          NextStarterApp
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/comingsoon">Coming Soon</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/profile">Profile</Link>
              </Button>
              <SignOutButton />
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-2">
                {user ? (
                  <>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="/comingsoon">Coming Soon</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="/profile">Profile</Link>
                    </Button>
                    <SignOutButton className="justify-start" />
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild className="justify-start">
                      <Link href="/login">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
