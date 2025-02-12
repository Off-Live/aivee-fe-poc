'use client';

// @/contexts/AmplitudeContext.tsx
import { init, track } from '@amplitude/analytics-browser';
import { createContext, ReactNode, useEffect } from 'react';

import { AMPLITUDE_API_KEY } from '@/config/config';

interface AmplitudeContextType {
  logEvent: (
    eventName: string,
    eventProperties?: Record<string, string>,
  ) => void;
}

export const AmplitudeContext = createContext<AmplitudeContextType | undefined>(
  undefined,
);

interface AmplitudeProviderProps {
  children: ReactNode;
}

export function AmplitudeProvider({ children }: AmplitudeProviderProps) {
  useEffect(() => {
    init(AMPLITUDE_API_KEY, undefined, {
      autocapture: true,
    });
  }, []);

  const logEvent = (
    eventName: string,
    eventProperties?: Record<string, string>,
  ) => {
    track(eventName, eventProperties);
  };

  return (
    <AmplitudeContext.Provider value={{ logEvent }}>
      {children}
    </AmplitudeContext.Provider>
  );
}
