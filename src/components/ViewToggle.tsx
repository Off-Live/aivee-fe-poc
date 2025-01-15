// components/ViewToggle.tsx
'use client';

import React from 'react';
import { FaCalendarAlt, FaTh } from 'react-icons/fa';

type Props = {
  currentView: 'monthly' | 'weekly';
  onChange: (view: 'monthly' | 'weekly') => void;
};

export default function ViewToggle({ currentView, onChange }: Props) {
  return (
    <div style={styles.container}>
      
      <button
        style={{
          ...styles.button,
          ...(currentView === 'monthly' ? styles.active : {})
        }}
        onClick={() => onChange('monthly')}
      >
        <FaCalendarAlt />
      </button>

      
      <button
        style={{
          ...styles.button,
          ...(currentView === 'weekly' ? styles.active : {})
        }}
        onClick={() => onChange('weekly')}
      >
        <FaTh />
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    gap: '8px',
    border: '1px solid #333',
    borderRadius: '12px',
    backgroundColor: '#1e1e1e',
    padding: '4px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '36px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#ccc',
    borderRadius: '8px',
    transition: 'background-color 0.2s, color 0.2s',
  },
  active: {
    backgroundColor: '#3f3f3f',
    color: '#fff',
  },
};
