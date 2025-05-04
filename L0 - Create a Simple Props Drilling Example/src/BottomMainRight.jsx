import React from 'react';

const BottomMainRight = ({ userName }) => {
  return (
    <div>
      <h3>This is the Deeply Nested Component (BottomMainRight)</h3>
      <p>Welcome, {userName ? userName : 'Guest'}!</p>
    </div>
  );
};

export default BottomMainRight;
