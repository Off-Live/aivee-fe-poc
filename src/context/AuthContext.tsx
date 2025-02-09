"use client";
// context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/app/firebase";
import {
  GoogleAuthProvider,
  OAuthCredential,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  credential: OAuthCredential | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [credential, setCredential] = useState<OAuthCredential | null>(null);
  const [loading, setLoading] = useState(true);

  // Cannot get credential without logging in again, so I reset the login session when be refreshed

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {

  //     setUser(user)
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/calendar");
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      setCredential(credential);
      setUser(result.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    loading,
    credential,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
