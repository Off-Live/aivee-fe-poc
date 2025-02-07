// app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css';

import { ReactNode, Suspense } from 'react';
import { TimezoneProvider } from '@/context/TimezoneContext';
import { AvailabilityProvider } from '@/context/AvailabilityContext';

export const metadata = {
  title: 'Calendar Scheduling Example',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AvailabilityProvider>
      <TimezoneProvider>
        <AuthProvider>
          <html lang="ko">
            <Suspense>
              <body>
                {children}
              </body>
            </Suspense>
          </html>
        </AuthProvider>
      </TimezoneProvider>
    </AvailabilityProvider>

  );
}
