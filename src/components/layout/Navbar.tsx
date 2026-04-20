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
    <nav className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/75">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500/70 via-emerald-500/60 to-amber-400/70" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          className="bg-gradient-to-r from-violet-600 via-emerald-500 to-amber-500 bg-clip-text font-raleway text-2xl font-semibold tracking-tight text-transparent"
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
              <Button
                asChild
                className="bg-violet-600 text-white shadow-md shadow-violet-300/40 hover:bg-violet-700 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400 dark:shadow-violet-900/40"
              >
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
            <SheetContent
              side="right"
              className="w-72 border-l border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95"
            >
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
                    <Button
                      asChild
                      className="justify-start bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400"
                    >
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
