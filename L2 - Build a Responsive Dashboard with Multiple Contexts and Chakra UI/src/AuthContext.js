import React, { createContext, useState } from 'react';

// Create context for authentication
export const AuthContext = createContext();

// Provider component to manage auth state
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
