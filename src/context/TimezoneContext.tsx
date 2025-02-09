"use client";
// TimezoneContext.tsx

import React, { createContext, useContext, useState } from "react";
import moment from "moment-timezone";

// Context에 저장할 값의 타입
interface TimezoneContextProps {
  selectedTimezone: string;
  setSelectedTimezone: (tz: string) => void;
}

// Context 객체 생성 (초깃값은 undefined로 설정)
const TimezoneContext = createContext<TimezoneContextProps | undefined>(
  undefined,
);

// Provider 컴포넌트
export const TimezoneProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 사용자의 현재 시스템에서 추정한 타임존을 기본값으로 사용
  const [selectedTimezone, setSelectedTimezone] = useState(
    moment.tz.guess(), // 예: 'Asia/Seoul'
  );

  // Context에서 관리할 값
  const contextValue: TimezoneContextProps = {
    selectedTimezone,
    setSelectedTimezone,
  };

  return (
    <TimezoneContext.Provider value={contextValue}>
      {children}
    </TimezoneContext.Provider>
  );
};

// Context를 사용하기 위한 커스텀 훅
export function useTimezone() {
  const context = useContext(TimezoneContext);
  if (!context) {
    throw new Error("useTimezone must be used within a TimezoneProvider");
  }
  return context;
}
