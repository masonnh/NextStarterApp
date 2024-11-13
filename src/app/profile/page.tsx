import { Metadata } from 'next';

export default function Profile() {
    return (
        <>
            <div>
                <h1>Profile Page</h1>
                <p>We're working on building this page &#128073;&#128072;. Check back soon!</p>
            </div>
        </>
    );
}

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Your profile page',
};