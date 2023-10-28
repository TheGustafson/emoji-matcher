// src/components/BackToMenuButton.jsx

import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameMode, setTiles,setFlippedIndices, setShowUnmatch, setIsWon, setIsShuffling, setStartTime, setElapsedTime, selectIntervalId } from './redux/gameSlice';

function BackToMenuButton() {
  const dispatch = useDispatch();
  const intervalId = useSelector(selectIntervalId);

  const handleBackToMenu = useCallback(() => {
    dispatch(setGameMode(null));
    dispatch(setTiles([]));
    dispatch(setFlippedIndices([]));
    dispatch(setShowUnmatch(false));
    dispatch(setIsWon(false));
    dispatch(setIsShuffling(false));
    dispatch(setStartTime(null));
    dispatch(setElapsedTime(0));
    clearInterval(intervalId);  // Ensure the timer is stopped
  }, [dispatch, intervalId]);

  return (
    <button className="menu-button" onClick={handleBackToMenu}>
      Back to Menu
    </button>
  );
}

export default BackToMenuButton;
