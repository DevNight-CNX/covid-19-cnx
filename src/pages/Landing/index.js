import React from 'react';
import { Link } from 'react-router-dom';
import CountDown from 'reactjs-countdown';
import './counter.css';

const Landing = () => {
  return (
    <div className="content-countdown">
      <h1>Covid-19-CNX</h1>
      <CountDown deadline={'24 Mar 2020 14:00:00 GMT'} />
      <Link
        to="/home"
        style={{
          marginTop: 16
        }}
      >
        เข้าเว็บไซต์
      </Link>
    </div>
  );
};

export default Landing;
