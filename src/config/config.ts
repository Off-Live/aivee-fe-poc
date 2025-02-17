export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
};

export const AIVEE_BACKEND_URL = process.env.NEXT_PUBLIC_AIVEE_BACKEND || '';
export const AIVEE_HOME_URL = 'https://aivee.xyz';

export const AMPLITUDE_API_KEY =
  process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '';

export const siteConfig = {
  title: 'Aivee Booking',
  description: 'Aivee, The smartest and fastest way to schedule',
  baseUrl: 'https://aivee.xyz',
  url: 'https://l.aivee.xyz',
};
