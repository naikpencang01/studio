'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import type { User, Store } from '@/lib/types';
import { mockStores } from '../data';

interface AuthContextType {
  user: User | null;
  currentStore: Store | null;
  login: (user: User) => void;
  logout: () => void;
  switchStore: (storeId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentStoreId, setCurrentStoreId] = useState<string | null>(null);

  const login = useCallback((userData: User) => {
    setUser(userData);
    if (userData.assignedStores && userData.assignedStores.length > 0) {
      setCurrentStoreId(userData.assignedStores[0].id);
    }
    // In a real app, you'd also store the auth token
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentStoreId(null);
    // In a real app, you'd clear the auth token
  }, []);

  const switchStore = useCallback((storeId: string) => {
    if (user?.assignedStores.some(s => s.id === storeId)) {
        setCurrentStoreId(storeId);
    }
  }, [user]);

  const currentStore = useMemo(() => {
    return mockStores.find(s => s.id === currentStoreId) || null;
  }, [currentStoreId]);

  return (
    <AuthContext.Provider value={{ user, currentStore, login, logout, switchStore }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
