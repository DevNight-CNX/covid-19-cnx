import React from 'react';
import CountDown from 'reactjs-countdown';
import moment from 'moment';
import './counter.css';

const Landing = () => {
  return (
    <div className="content-countdown">
      <h1>Covid-19-CNX</h1>
      <CountDown deadline={'24 Mar 2020 14:00:00 GMT'} />
    </div>
  );
};

export default Landing;
