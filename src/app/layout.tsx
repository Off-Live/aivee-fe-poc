// app/layout.tsx
import { Nunito } from 'next/font/google';
import { ReactNode, Suspense } from 'react';

import '../styles/globals.css';

import { siteConfig } from '@/config/config';
import { AuthProvider } from '@/context/AuthContext';
import { AvailabilityProvider } from '@/context/AvailabilityContext';
import { TimezoneProvider } from '@/context/TimezoneContext';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.baseUrl}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={`dark ${nunito.variable}`}>
      <body
        className={`${nunito.className} bg-default text-white min-h-screen`}
      >
        <AvailabilityProvider>
          <TimezoneProvider>
            <AuthProvider>
              <Suspense>{children}</Suspense>
            </AuthProvider>
          </TimezoneProvider>
        </AvailabilityProvider>
      </body>
    </html>
  );
}
