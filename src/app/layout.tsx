import '@/app/global.css';

import { Inter, Raleway, Roboto } from 'next/font/google';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

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
      </head>
      <body
        className={`
          ${inter.variable}
          ${raleway.variable}
          ${roboto.variable}
          min-h-screen antialiased
        `}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
