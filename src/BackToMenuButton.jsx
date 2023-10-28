// src/components/BackToMenuButton.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGameMode } from './redux/gameSlice';

function BackToMenuButton() {
  const dispatch = useDispatch();

  const handleBackToMenu = () => {
    dispatch(resetGameMode());
  };

  return (
    <button className="restart-button" onClick={handleBackToMenu}>
      Back to Menu
    </button>
  );
}

export default BackToMenuButton;
