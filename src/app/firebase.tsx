// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { FIREBASE_CONFIG } from '@/config/config';

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// Conditional Analytics init
let analytics = null;
if (typeof window !== 'undefined') {
  // check client side
  isSupported().then((yes) => (yes ? (analytics = getAnalytics(app)) : null));
}

export const auth = getAuth(app);
