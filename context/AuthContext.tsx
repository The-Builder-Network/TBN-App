// context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

type UserType = 'client' | 'tradesperson' | null;

interface AuthContextType {
  userType: UserType;
  hasPostedJob: boolean;
  loginAsClient: () => void;
  loginAsTradesperson: () => void;
  postJob: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [hasPostedJob, setHasPostedJob] = useState(false);

  const loginAsClient = () => setUserType('client');
  const loginAsTradesperson = () => setUserType('tradesperson');
  const postJob = () => setHasPostedJob(true);

  return (
    <AuthContext.Provider value={{ userType, hasPostedJob, loginAsClient, loginAsTradesperson, postJob }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
