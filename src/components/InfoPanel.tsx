
// components/Sidebar.tsx
import React from 'react';
import GoogleAuth from './GoogleAuth';
import TimezoneSelector from './TimezoneSelector';


type InfoPanelProps = {
  email:string;
  name:string;
}

export default function InfoPanel({email,name}:InfoPanelProps) {
  return (
    <div className = "info-panel">
      
      <h2 style={{ margin: '8px 0' }}>{name}</h2>
      <h3 style={{ margin: '8px 0' }}>Available slots</h3>
      <TimezoneSelector/>
      
    </div>
  );
}
