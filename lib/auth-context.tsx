'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User } from './types';
import { store } from './store';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: store.getCurrentUser(),
    isAuthenticated: !!store.getCurrentUser(),
    isLoading: false,
  });

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate login (in production, call API)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock validation
    if (email === 'admin@digi-menu.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        email,
        name: 'Admin',
        isAdmin: true,
      };
      store.setCurrentUser(user);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    store.setCurrentUser(null);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
