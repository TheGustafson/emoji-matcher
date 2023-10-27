// src/components/Board.jsx
import React from 'react';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTiles, selectFlippedIndices, selectIsWon, selectIsShuffling, selectShowUnmatch, checkForWin, selectStartTime, setStartTime, setIntervalId, setFlippedIndices, incrementElapsedTime, setShowUnmatch, matchTiles, setTiles} from './redux/gameSlice';
import './App.css'

function Board() {
  const dispatch = useDispatch();
  const tiles = useSelector(selectTiles);
  const flippedIndices = useSelector(selectFlippedIndices);
  const isWon = useSelector(selectIsWon);
  const isShuffling = useSelector(selectIsShuffling);
  const showUnmatch = useSelector(selectShowUnmatch);
  const startTime = useSelector(selectStartTime);

  useEffect(() => {
    dispatch(checkForWin());
  }, [flippedIndices, checkForWin]);

  const startTimer = useCallback(() => {
    const now = Date.now();
    dispatch(setStartTime(now));
    const id = setInterval(() => {
      dispatch(incrementElapsedTime());
    }, 1000);
    dispatch(setIntervalId(id));
  }, [dispatch]);

  const handleTileClick = useCallback(
    index => {
      if (startTime === null) {
        startTimer();
      }
      if (
        flippedIndices.includes(index) ||
        flippedIndices.length === 2 ||
        tiles[index].isMatched
      ) { return; }

      const newFlippedIndices = flippedIndices.concat(index);
      dispatch(setFlippedIndices(newFlippedIndices));

      if (newFlippedIndices.length === 2) {
        const [index1, index2] = newFlippedIndices;
        const match = tiles[index1].value === tiles[index2].value;
        if (match) {
          const newTiles = tiles.slice();
          dispatch(matchTiles({index1, index2}));
          dispatch(setFlippedIndices([]));
          checkForWin();
        } else {
          dispatch(setShowUnmatch(true));
          setTimeout(() => {
            dispatch(setFlippedIndices([]));
            dispatch(setShowUnmatch(false));
            checkForWin();
          }, 1000);
        }
      }
    },
    [
      startTime,
      startTimer,
      flippedIndices,
      tiles,
      checkForWin,
      dispatch,
    ]
  )    

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
            onClick={() => handleTileClick(index)}
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