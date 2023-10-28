// src/components/MatchingGame.jsx
import React  from 'react';
import Timer from './Timer';
import Board from './Board';
import RestartButton from './RestartButton';
import Menu from './Menu';
import BackToMenuButton from './BackToMenuButton';
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectGameMode } from './redux/gameSlice';

function MatchingGame() {
  
  const dispatch = useDispatch();
  const gameMode = useSelector(selectGameMode);
  
  return (
    <div className="container">
      {gameMode ? (
        <>
          <Timer />
          <Board />
          <RestartButton />
          <BackToMenuButton />
        </>
      ) : (
        <Menu />
      )}
    </div>
  );
}

export default MatchingGame;
