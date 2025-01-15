
// components/Sidebar.tsx
import React from 'react';
import GoogleAuth from './GoogleAuth';

export default function Sidebar() {
  return (
    <div className = "sidebar">
      
      <h3 style={{ margin: '8px 0' }}>Aivee</h3>
      <h2 style={{ margin: '8px 0' }}>Availability</h2>
      
      
      <p>Asia/Seoul</p>
      <GoogleAuth/>
    </div>
  );
}
