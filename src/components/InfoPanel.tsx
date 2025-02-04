
// components/Sidebar.tsx
import React from 'react';
import GoogleAuth from './GoogleAuth';
import TimezoneSelector from './TimezoneSelector';

export default function InfoPanel() {
  return (
    <div className = "info-panel">
      
      <h3 style={{ margin: '8px 0' }}>Aivee</h3>
      <h2 style={{ margin: '8px 0' }}>Availability</h2>
      <TimezoneSelector/>
      
    </div>
  );
}
