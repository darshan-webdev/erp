import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  switchRole: (role: User['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, User> = {
  coe: {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@boult.edu',
    role: 'coe',
    department: 'Controller of Examinations',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?w=150&h=150&fit=crop&crop=face'
  },
  faculty: {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@boult.edu',
    role: 'faculty',
    department: 'Computer Science',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?w=150&h=150&fit=crop&crop=face'
  },
  coordinator: {
    id: '3',
    name: 'Ms. Priya Sharma',
    email: 'priya.sharma@boult.edu',
    role: 'coordinator',
    department: 'Examination Coordination',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?w=150&h=150&fit=crop&crop=face'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Auto-login as CoE for demo
    setUser(mockUsers.coe);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: User['role']) => {
    const newUser = mockUsers[role];
    if (newUser) {
      setUser(newUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
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