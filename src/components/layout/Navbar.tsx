'use client';

import Link from 'next/link';

import Button from '@/components/ui/Button';
import useUserSession from '@/lib/hooks/useUserSession';

import SignOutButton from '../auth/SignOutButton';

const Navbar: React.FC = () => {
  const { user, session } = useUserSession();

  return (
    <nav className="navbar">
      <Link className="logo-text" href="/">
        caster
      </Link>
      <ul>
        {user ? (
          <>
            <li>
              <Link href="/comingsoon">Coming Soon</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Log In</Link>
            </li>
            <li>
              <Link href="/login">
                <Button className="button button-contained" variant="contained">
                  Sign up
                </Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
