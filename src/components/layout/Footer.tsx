'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return storedTheme ? storedTheme === 'dark' : prefersDark;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <footer className="border-t border-slate-200/80 bg-[linear-gradient(180deg,rgba(109,40,217,0.05),rgba(22,163,74,0.04),rgba(250,204,21,0.06))] dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(109,40,217,0.16),rgba(22,163,74,0.08),rgba(250,204,21,0.1))]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="space-y-3">
            <Link
              className="bg-gradient-to-r from-violet-600 via-emerald-500 to-amber-500 bg-clip-text font-raleway text-2xl font-semibold tracking-tight text-transparent"
              href="/"
            >
              NextStarterApp
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              &copy; {new Date().getFullYear()} NextStarterApp. All rights
              reserved.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Product
              </p>
              <Button
                type="button"
                variant="ghost"
                className="h-auto justify-start px-0 text-slate-600 hover:text-violet-700 dark:text-slate-300 dark:hover:text-violet-300"
                onClick={() => setDarkMode((value) => !value)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
                <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
              </Button>
              <Link
                className="block text-slate-600 hover:text-violet-700 dark:text-slate-300 dark:hover:text-violet-300"
                href="/#pricing"
              >
                Pricing
              </Link>
              <Link
                className="block text-slate-600 hover:text-violet-700 dark:text-slate-300 dark:hover:text-violet-300"
                href="/#final-cta"
              >
                Get Started
              </Link>
              <Link
                className="block text-slate-600 hover:text-violet-700 dark:text-slate-300 dark:hover:text-violet-300"
                href="/waitlist"
              >
                Join Waitlist
              </Link>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Company
              </p>
              <Link
                className="block text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300"
                href="mailto:support@NextStarterApp.com"
              >
                Contact
              </Link>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Legal
              </p>
              <Link
                className="block text-slate-600 hover:text-amber-700 dark:text-slate-300 dark:hover:text-amber-300"
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                className="block text-slate-600 hover:text-amber-700 dark:text-slate-300 dark:hover:text-amber-300"
                href="/terms"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-300/70 dark:bg-slate-700" />
      </div>
    </footer>
  );
};

export default Footer;
