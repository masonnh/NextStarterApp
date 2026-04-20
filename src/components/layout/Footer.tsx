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
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="space-y-3">
            <Link
              className="font-raleway text-2xl font-semibold tracking-tight"
              href="/"
            >
              NextStarterApp
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} NextStarterApp. All rights
              reserved.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Product</p>
              <Button
                type="button"
                variant="ghost"
                className="h-auto justify-start px-0 text-muted-foreground hover:text-foreground"
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
                className="block text-muted-foreground hover:text-foreground"
                href="/pricing"
              >
                Pricing
              </Link>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Company</p>
              <Link
                className="block text-muted-foreground hover:text-foreground"
                href="mailto:support@NextStarterApp.com"
              >
                Contact
              </Link>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Legal</p>
              <Link
                className="block text-muted-foreground hover:text-foreground"
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                className="block text-muted-foreground hover:text-foreground"
                href="/terms"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>

        <Separator />
      </div>
    </footer>
  );
};

export default Footer;
