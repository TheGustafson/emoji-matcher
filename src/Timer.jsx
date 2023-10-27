// src/components/Timer.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsWon, selectElapsedTime, selectIntervalId, stopTimer, } from './redux/gameSlice';
import './App.css';

function Timer() {
  const dispatch = useDispatch();
  const isWon = useSelector(selectIsWon);
  const elapsedTime = useSelector(selectElapsedTime);
  const intervalId = useSelector(selectIntervalId);

  useEffect(() => {
    if (isWon) {
      dispatch(stopTimer());
    }
  }, [isWon, dispatch]);

  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = ((elapsedTime % 60000) / 1000).toFixed(0);
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


  return <div className="timer">{formattedTime}</div>;
}

export default Timer;
