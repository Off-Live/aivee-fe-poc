'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/ModalForm.module.css'; // 위에서 만든 CSS 모듈
import { TimeSlot } from '@/util/availability';

interface ModalFormProps {
  show: boolean;
  selectedSlot: TimeSlot;
  token: String;
  onClose: () => void;
}

const formatTime = (date: Date) => {

  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

function formatLocalDateWithOffset(date: Date) {
  // 날짜 구성 요소 추출 (로컬 시간 기준)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // 타임존 오프셋 계산 (±HH:mm)
  const offsetMinutes = date.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(offsetMinutes / 60)).toString().padStart(2, '0');
  const offsetRemainder = Math.abs(offsetMinutes % 60).toString().padStart(2, '0');
  const timeZone = (offsetMinutes <= 0 ? '+' : '-') + `${offsetHours}:${offsetRemainder}`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZone}`;
}

const ModalForm = ({ show, selectedSlot, token, onClose }: ModalFormProps) => {

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    summary: "30 min meeting",
    email: "",
    desc: "Created by aivee"
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const makeReservation = async () => {
    try {
      const param = {
        token: token,
        summary: formData.summary,
        description: formData.desc,
        startDate: formatLocalDateWithOffset(selectedSlot.startDate),
        endDate: formatLocalDateWithOffset(selectedSlot.endDate),
        attendees: [
          formData.email
        ]
      }
      console.log(param)
      const response = await fetch(`https://be-dev.aivee.xyz/availability/reserve`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(param)
        }
      )
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`HTTP error! status: ${response.status} ${errorText}`);
      }
      onClose()
    } catch (error) {
      console.log(`error on create event ${error}`)
    }
  }

  if (!show || !mounted) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{selectedSlot.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} {formatTime(selectedSlot.startDate)}-{formatTime(selectedSlot.endDate)} </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(formData);
            makeReservation()
           
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <label>Summary</label>
            <input
              type="text"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              required
              style={{ display: 'block', width: '100%', marginTop: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ display: 'block', width: '100%', marginTop: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>Desc</label>
            <textarea
              rows={3}
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              style={{ display: 'block', width: '100%', marginTop: '4px' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '8px', background: '#0070f3', color: '#fff' }}>
            Confirm
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ModalForm;
