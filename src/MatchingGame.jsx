// src/components/MatchingGame.jsx
import React, { useEffect, useCallback } from 'react';
import Timer from './Timer';
import Board from './Board';
import RestartButton from './RestartButton';
import './App.css'

function MatchingGame() {
    
  

  return (
    <div className="container">
      <Timer />
      <Board />
      <RestartButton />
    </div>
  );
}

export default MatchingGame;
