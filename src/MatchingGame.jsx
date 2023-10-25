// src/components/MatchingGame.js
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Board from './Board';
import RestartButton from './RestartButton';
import './App.css';


function MatchingGame() {
  const generateTiles = () => {
    const values = ['🥳', '😇', '🥶', '🥺', '🤖', '💩', '👻', '🥰', '👽', '😸'];
    const doubleValues = values.concat(values);
    return doubleValues
      .sort(() => Math.random() - 0.5)
      .map(value => ({ value, isMatched: false }));
  };

  const [tiles, setTiles] = useState(generateTiles());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [showUnmatch, setShowUnmatch] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    if (intervalId !== null) return;  // Prevent multiple intervals
    const now = Date.now();
    setStartTime(now);
    const id = setInterval(() => {
      setElapsedTime(Date.now() - now);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  const checkForWin = () => {
    if (tiles.every(tile => tile.isMatched)) {
      setIsWon(true);
      stopTimer();
    }
  };

  const handleClick = index => {
    if (startTime === null) {
      startTimer();
    }
    if (flippedIndices.length === 2 || tiles[index].isMatched) {
        return;
      }
  
    const newFlippedIndices = flippedIndices.concat(index);
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
        const [index1, index2] = newFlippedIndices;
        const match = tiles[index1].value === tiles[index2].value;
        if (match) {
            const newTiles = tiles.slice();
            newTiles[index1].isMatched = true;
            newTiles[index2].isMatched = true;
            setTiles(newTiles);
            setFlippedIndices([]);
            checkForWin();
        } else {
            setShowUnmatch(true);  // Show unmatched tiles in red
            setTimeout(() => {
            setFlippedIndices([]);
            setShowUnmatch(false);  // Hide unmatched tiles after a delay
            checkForWin();
            }, 1000);
        }
    }
  };

  const restartGame = () => {
    setTiles(tiles.map(tile => ({ ...tile, isMatched: false })));
    clearInterval(intervalId);  // Clear the previous interval here before shuffling
    setIntervalId(null);
    setTimeout(() => {
      setIsShuffling(true);
      setTimeout(() => {
        setIsShuffling(false);
        setTiles(generateTiles());
        setFlippedIndices([]);
        setShowUnmatch(false);
        setIsWon(false);
        setStartTime(null);
        setElapsedTime(0);
      }, 1000);
    }, 100);
  };

  useEffect(() => {
    checkForWin();
  }, [flippedIndices]);

  return (
    <div className="container">
      <Timer isWon={isWon} startTimer={startTimer} stopTimer={stopTimer} elapsedTime={elapsedTime} />
      <Board tiles={tiles} flippedIndices={flippedIndices} handleClick={handleClick} isShuffling={isShuffling} isWon={isWon} showUnmatch={showUnmatch} />
      <RestartButton isWon={isWon} restartGame={restartGame} />
    </div>
  );
}

export default MatchingGame;
