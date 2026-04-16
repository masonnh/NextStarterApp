import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Import your styles
import '@/styles/style.css';
import '@/styles/components/auth/oauth-login-button.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link 
                    rel="preconnect" 
                    href="https://fonts.gstatic.com" 
                    crossOrigin="anonymous" 
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}