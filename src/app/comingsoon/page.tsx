import { Metadata } from 'next';

export default function ComingSoon() {
    return (
        <>
            <div>
                <h1>Coming Soon &#128517;</h1>
                <p>We're working on building this page &#128073;&#128072;. Check back soon!</p>
            </div>
        </>
    );
}

export const metadata: Metadata = {
    title: 'Coming Soon',
    description: 'This page is coming soon!',
};