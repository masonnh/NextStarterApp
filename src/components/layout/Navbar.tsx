'use client';

import Link from 'next/link';
// Replaced MUI Button with native button to align with Tailwind/Shadcn styling
import SignOutButton from '../auth/SignOutButton';
import useUserSession from '@/lib/hooks/useUserSession';

const Navbar: React.FC = () => {
    const { user, session } = useUserSession();
    
    return (
        <nav className="navbar">
            <Link className="logo-text" href="/">caster</Link>
            <ul>
                {user ? (
                    <>
                        <li>
                            <Link href="/comingsoon">
                                Coming Soon
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <SignOutButton/>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/login">
                                Log In
                            </Link>
                        </li>
                        <li>
                            <Link href="/login">
                                <button className="button-contained">Sign up</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
