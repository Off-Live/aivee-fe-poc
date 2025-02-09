// app/layout.tsx
import { ReactNode, Suspense } from "react";
import { Nunito } from "next/font/google";
import { TimezoneProvider } from "@/context/TimezoneContext";
import { AvailabilityProvider } from "@/context/AvailabilityContext";
import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Aivee Reservation",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${nunito.variable}`}>
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
