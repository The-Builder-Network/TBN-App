import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, UserRole, AuthContextValue } from '../types/auth';

const STORAGE_KEY = 'tbn_auth_user';

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  isHomeowner: false,
  isTradesperson: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          setUser(JSON.parse(stored));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, _password: string, role: UserRole) => {
    // Simulate authentication - in production this would call a real API
    const u: User = {
      id: Math.random().toString(36).slice(2),
      email,
      role,
      name: email.split('@')[0],
      firstName: email.split('@')[0],
    };
    setUser(u);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        isHomeowner: user?.role === 'homeowner',
        isTradesperson: user?.role === 'tradesperson',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
