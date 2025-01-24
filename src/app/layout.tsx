// app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css';

import { ReactNode, Suspense } from 'react';

export const metadata = {
  title: 'Calendar Scheduling Example',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (

    <AuthProvider>
      <html lang="ko">
        <Suspense>
          <body>
            {children}
          </body>
        </Suspense>
      </html>
    </AuthProvider>

  );
}
