import React from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Main />
      <Footer />
    </AuthProvider>
  );
};

export default App;
