'use client'
import { AvailabilityResponse } from '@/util/availability';
import React, { createContext, useContext, useState } from 'react';

// Context에 저장할 값의 타입
interface AvailabilityContextProps {
  availabilityData : AvailabilityResponse;
  setAvailabilityData: (data:AvailabilityResponse) => void;
}


const AvailabilityContext = createContext<AvailabilityContextProps | undefined>(
  undefined
);


export const AvailabilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  
  const [availabilityData, setAvailabilityData] = useState<AvailabilityResponse>(
    {
      email: "",
      name: "",
      beginDate: new Date(),
      endDate: new Date(),
      availabilities: [],
      scheduled: [],
      slotDuration:0
    }
    
  );

  // Context에서 관리할 값
  const contextValue: AvailabilityContextProps = {
    availabilityData,
    setAvailabilityData,
  };

  return (
    <AvailabilityContext.Provider value={contextValue}>
      {children}
    </AvailabilityContext.Provider>
  );
};

// Context를 사용하기 위한 커스텀 훅
export function useAvailability() {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw new Error('useAvailability  must be used within a AvailabilityProvider');
  }
  return context;
}
