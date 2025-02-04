// app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css';

import { ReactNode, Suspense } from 'react';
import { TimezoneProvider } from '@/context/TimezoneContext';

export const metadata = {
  title: 'Calendar Scheduling Example',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
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

  );
}
