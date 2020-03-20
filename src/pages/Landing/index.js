import React from 'react';
import Countdown from './CounterTimer';

const Landing = () => {
  return (
    <>
      <Countdown
        timeTillDate="3 23 2020, 9:00 am"
        timeFormat="MM DD YYYY, h:mm a"
      />
    </>
  );
};

export default Landing;
