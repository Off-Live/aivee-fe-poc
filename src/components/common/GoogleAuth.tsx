// components/GoogleAuth.tsx
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const GoogleAuth = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const ProfileImage = user?.photoURL ? (
    <div className="relative w-8 h-8 overflow-hidden rounded-full border border-border">
      <Image
        className="object-cover w-full h-full"
        src={user.photoURL}
        alt="Profile"
        width={32}
        height={32}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  ) : null;

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3">
          {ProfileImage}
          <span className="text-sm text-text-subtle">{user.displayName}</span>
          <button
            className="h-9 px-3 bg-emphasis text-text-subtle rounded-md
                       transition-colors hover:bg-emphasis/80"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 h-9 px-3 bg-emphasis text-text-subtle
                     rounded-md transition-colors hover:bg-emphasis/80"
          onClick={signInWithGoogle}
        >
          <Image
            src="/google.webp"
            alt="Google"
            width={16}
            height={16}
            className="opacity-80"
          />
          <span>Login</span>
        </button>
      )}
    </div>
  );
};
export default GoogleAuth;
