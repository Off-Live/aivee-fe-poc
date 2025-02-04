// TimezoneSelector.tsx
import React from 'react';
import moment from 'moment-timezone';
import { useTimezone } from '@/context/TimezoneContext';
import styles from '@/styles/TimezoneSelector.module.css'

const TimezoneSelector = () => {
  // Context 훅을 통해 state와 setter를 받아옴
  const { selectedTimezone, setSelectedTimezone } = useTimezone();

  // 모든 타임존 목록
  const timezones = moment.tz.names();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
  };

  return (
    <div className={styles.selectWrapper}>
      
      <select
        id="timezone-select"
        value={selectedTimezone}
        onChange={handleChange}
        className={styles.select}
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
      <div className={styles.arrow}>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default TimezoneSelector;
