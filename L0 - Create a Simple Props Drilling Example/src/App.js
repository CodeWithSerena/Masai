import React, { useState } from 'react';
import MiddleComponent from './MiddleComponent';

const App = () => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1>React Props Drilling Example</h1>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      <MiddleComponent userName={name} />
    </div>
  );
};

export default App;
