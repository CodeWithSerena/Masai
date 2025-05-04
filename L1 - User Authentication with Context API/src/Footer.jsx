import React from 'react';
import { useAuth } from './AuthContext';

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer>
      {isAuthenticated ? 'Welcome, User' : 'Please log in'}
    </footer>
  );
};

export default Footer;
