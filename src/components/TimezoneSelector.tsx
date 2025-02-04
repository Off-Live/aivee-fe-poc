// TimezoneSelector.tsx
import React from 'react';
import moment from 'moment-timezone';
import { useTimezone } from '@/context/TimezoneContext';

const TimezoneSelector = () => {
  // Context 훅을 통해 state와 setter를 받아옴
  const { selectedTimezone, setSelectedTimezone } = useTimezone();

  // 모든 타임존 목록
  const timezones = moment.tz.names();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
  };

  return (
    <div>
      <label htmlFor="timezone-select">시간대 선택: </label>
      <select
        id="timezone-select"
        value={selectedTimezone}
        onChange={handleChange}
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
      <p>선택한 시간대: {selectedTimezone}</p>
    </div>
  );
};

export default TimezoneSelector;
