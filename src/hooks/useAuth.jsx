import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER } from '../store/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('auto_memory_logged_in') === 'true';
  });
  
  const [user, setUser] = useState(MOCK_USER);

  const login = () => {
    localStorage.setItem('auto_memory_logged_in', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('auto_memory_logged_in');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
