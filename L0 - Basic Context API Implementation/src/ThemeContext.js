import React, { createContext, useState, useContext } from 'react';

// Create a context for theme
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // default theme is 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
