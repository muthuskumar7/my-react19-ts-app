'use client';
import React, { createContext, useCallback, useContext, useState } from 'react';

// Auth Context
type AuthContextType = {
  user: string | null;
  isLoggedIn: boolean;
  login: (user: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Provider - for state management
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //. console.log('AuthContext rendering...');
  const [user, setUser] = useState<string | null>(null);

  /**
   * `!=` Covers both null and undefined check.
   * `!==` (two =) covers only null check due to type check.
   */
  const isLoggedIn = user != null;

  /**
   * useCallback - avoids creating new function every time this component re-renders.
   * empty array means no dependency, so function is created only once when component is mounted.
   */
  const login = useCallback((user: string) => {
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  //. console.log({ login, logout });

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Customized Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
