// src/components/Menu.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTiles, setGameMode, generateTiles} from './redux/gameSlice';

function Menu() {
  const dispatch = useDispatch();

  const handleSelectMode = (mode) => {
    dispatch(setGameMode(mode));
    dispatch(setTiles(generateTiles(mode)));
  };

  return (
    <div className="menu-container">
        <h1>MatchMoji</h1>
      <button
        className="menu-button"
        onClick={() => handleSelectMode('easy')}
      >
        Easy
      </button>
      <button
        className="menu-button"
        onClick={() => handleSelectMode('medium')}
      >
        Medium
      </button>
      <button
        className="menu-button"
        onClick={() => handleSelectMode('hard')}
      >
        Hard
      </button>
    </div>
  );
}

export default Menu;