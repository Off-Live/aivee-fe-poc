// @/hooks/useAmplitude.ts

// Custom hook to use Amplitude
import { useContext } from 'react';

import { AmplitudeContext } from '@/contexts/AmplitudeContext';

export function useAmplitude() {
  const context = useContext(AmplitudeContext);
  if (context === undefined) {
    throw new Error('useAmplitude must be used within an AmplitudeProvider');
  }
  return context;
}
