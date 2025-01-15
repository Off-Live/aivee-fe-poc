// components/GoogleAuth.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const GoogleAuth = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Google login</button>
      )}
    </div>
  );
};

export default GoogleAuth;