import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import NestedComponent from './NestedComponent';

const App = () => {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', minHeight: '100vh' }}>
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
          color: theme === 'light' ? '#000' : '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Toggle Theme
      </button>
      <NestedComponent />
    </div>
  );
};

const AppWithProvider = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWithProvider;
