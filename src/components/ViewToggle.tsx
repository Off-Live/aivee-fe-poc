// components/ViewToggle.tsx
'use client';

import React from 'react';
import { FaCalendarAlt, FaTh } from 'react-icons/fa';
import styles from '../styles/ViewToggle.module.css'

type Props = {
  currentView: 'monthly' | 'weekly';
  onChange: (view: 'monthly' | 'weekly') => void;
};

export default function ViewToggle({ currentView, onChange }: Props) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${
          currentView === 'monthly' ? styles.buttonActive : ''
        }`}
        onClick={() => onChange('monthly')}
      >
        <FaCalendarAlt />
      </button>

      <button
        className={`${styles.button} ${
          currentView === 'weekly' ? styles.buttonActive : ''
        }`}
        onClick={() => onChange('weekly')}
      >
        <FaTh />
      </button>
    </div>
  );
}