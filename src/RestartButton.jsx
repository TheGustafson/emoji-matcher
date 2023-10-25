// src/components/RestartButton.js
import React from 'react';
import './App.css';

function RestartButton({ isWon, restartGame }) {
  return (
      <button className="restart-button" onClick={restartGame}>
        Restart
      </button>
  );
}

export default RestartButton;
