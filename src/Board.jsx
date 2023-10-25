// src/components/Board.js
import React from 'react';
import './App.css';


function Board({ tiles, flippedIndices, handleClick, isWon, isShuffling, showUnmatch }) {
  return (
    <div className="board">
      {tiles.map((tile, index) => {
        const isFlipped = flippedIndices.includes(index);
        let className = 'tile';
        className += isWon ? ' won' : '';
        className += isShuffling ? ' shuffling' : '';
        className += !isFlipped && !tile.isMatched ? ' hidden' : '';
        className += isFlipped && showUnmatch ? ' unmatched' : '';
        className += tile.isMatched ? ' matched' : '';
        return (
          <div
            className={className}
            onClick={() => handleClick(index)}
            key={index}
          >
            {tile.isMatched || isFlipped ? tile.value : '?'}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
