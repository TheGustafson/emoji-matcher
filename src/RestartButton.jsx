// src/components/RestartButton.jsx
import { useCallback, React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsWon, selectTiles, selectIntervalId, setTiles, setIsShuffling, selectGameMode, setFlippedIndices, setShowUnmatch, setIsWon, setStartTime, setElapsedTime, setIntervalId, generateTiles} from './redux/gameSlice';
import './App.css'

function RestartButton() {
  const isWon = useSelector(selectIsWon);
  const tiles = useSelector(selectTiles);
  const dispatch = useDispatch();
  const intervalId = useSelector(selectIntervalId);
  const gameMode = useSelector(selectGameMode);

  const restartGame = useCallback(() => {
    dispatch(setTiles(tiles.map(tile => ({ ...tile, isMatched: false }))));
    setTimeout(() => {
      dispatch(setIsShuffling(true));
      setTimeout(() => {
        dispatch(setIsShuffling(false));
        dispatch(setTiles(generateTiles(gameMode)));
        dispatch(setFlippedIndices([]));
        dispatch(setShowUnmatch(false));
        dispatch(setIsWon(false));
        dispatch(setStartTime(null));
        dispatch(setElapsedTime(0));
        if (intervalId !== null) {
          clearInterval(intervalId);
          dispatch(setIntervalId(null));
        }
      }, 1000);
    }, 100);
  }, [tiles, dispatch, intervalId]); 


  return (
    <button className="menu-button" onClick={restartGame}>
      Restart
    </button>
  );
}

export default RestartButton;
