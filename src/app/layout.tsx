// app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css';

import { ReactNode } from 'react';

export const metadata = {
  title: 'Calendar Scheduling Example',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}
