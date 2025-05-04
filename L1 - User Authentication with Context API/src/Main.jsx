import React from 'react';
import { useAuth } from './AuthContext';

const Main = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      {isAuthenticated ? (
        <h2>Welcome, you are logged in!</h2>
      ) : (
        <h2>Please log in to access the content.</h2>
      )}
    </main>
  );
};

export default Main;
