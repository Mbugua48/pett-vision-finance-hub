import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pre-registered loan officers
const loanOfficers: User[] = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@pettvision.com', role: 'Loan Officer' },
  { id: 2, name: 'Michael Chen', email: 'michael@pettvision.com', role: 'Senior Loan Officer' }
];

// Simple authentication (in real app, this would connect to a backend)
const credentials = [
  { email: 'sarah@pettvision.com', password: 'password123' },
  { email: 'michael@pettvision.com', password: 'password123' }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const credential = credentials.find(c => c.email === email && c.password === password);
    if (credential) {
      const foundUser = loanOfficers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};