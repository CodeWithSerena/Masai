import React from 'react';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <nav>
      <button onClick={isAuthenticated ? logout : login}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
};

export default Navbar;
