// components/GoogleAuth.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import googleLogo from '../../public/google.webp'
import styles from '../styles/LoginButton.module.css'

const GoogleAuth = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const profileImage = (
    <div className={styles['profile-container']}>
      {user?.photoURL != null ? (<img className={styles['profile-image']} src={user?.photoURL}/>): (null)}
    </div>

  )

  return (
    <div>
      {user ? (
        <div className={styles.container}>
          {user?.photoURL != null ? (profileImage): (null)}
          <p>{user.displayName} </p>
          <div style={{width:'20px'}}/>
          <button className={styles.button} style={{justifyContent:'center'}} onClick={logout}>LOGOUT</button>
        </div>
      ) : (
        <button className={styles.button} onClick={signInWithGoogle}>  
        <img src={googleLogo.src} width={20} height={20}/>
        LOGIN
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;