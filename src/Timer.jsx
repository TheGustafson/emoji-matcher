// src/components/Timer.js
import React, { useState, useEffect } from 'react';
import './App.css';


function Timer({ isWon, stopTimer, elapsedTime }) {
    useEffect(() => {
      if (isWon) {
        stopTimer();
      }
    }, [isWon, stopTimer]);
  
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = ((elapsedTime % 60000) / 1000).toFixed(0);
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
    return <div className="timer">{formattedTime}</div>;
  }

export default Timer;
