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
                    href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
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