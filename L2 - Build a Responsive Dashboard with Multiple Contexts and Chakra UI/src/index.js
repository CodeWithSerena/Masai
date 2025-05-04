import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';  // Make sure Chakra UI is imported
import App from './App';
import { AuthContextProvider } from './AuthContext';  // Import AuthContextProvider
import { ThemeContextProvider } from './ThemeContext';  // Import ThemeContextProvider

// Render the app wrapped in ChakraProvider and both context providers
ReactDOM.render(
  <ChakraProvider>
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
