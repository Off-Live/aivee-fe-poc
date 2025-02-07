
// components/Sidebar.tsx
import React from 'react';
import GoogleAuth from './GoogleAuth';
import TimezoneSelector from './TimezoneSelector';
import { useAvailability } from '@/context/AvailabilityContext';

export default function InfoPanel() {
  const {availabilityData} = useAvailability();
  return (
    <div className = "info-panel">
      
      <h2 style={{ margin: '8px 0' }}>{availabilityData.name}</h2>
      <h3 style={{ margin: '8px 0' }}>Available slots</h3>
      <TimezoneSelector/>
      
    </div>
  );
}
