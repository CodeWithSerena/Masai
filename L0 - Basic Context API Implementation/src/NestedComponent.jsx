import React from 'react';
import { useTheme } from './ThemeContext';

const NestedComponent = () => {
  const { theme } = useTheme(); 

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#555',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '20px',
        borderRadius: '5px',
        marginTop: '20px',
      }}
    >
      <h3>This is a nested component</h3>
      <p>The current theme is: {theme}</p>
    </div>
  );
};

export default NestedComponent;
