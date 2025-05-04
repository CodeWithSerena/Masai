import React from 'react';
import BottomMainRight from './BottomMainRight';

const MiddleComponent = ({ userName }) => {
  return (
    <div>
      <h2>This is the Middle Component</h2>
      <BottomMainRight userName={userName} />
    </div>
  );
};

export default MiddleComponent;
