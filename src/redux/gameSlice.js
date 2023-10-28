// src/features/gameSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const generateTiles = (mode) => {
  let values;
  switch (mode) {
    case 'easy':
      values = ['🥳', '😇', '🤪', '🥺', '🎃', '💩'];  // 6 unique values for a 3x4 board
      break;
    case 'medium':
      values = ['🥳', '😇', '🤪', '🥺', '🎃', '💩', '👻', '🥰'];  // 8 unique values for a 4x4 board
      break;
    case 'hard':
      values = ['🥳', '😇', '🤪', '🥺', '🎃', '💩', '👻', '🥰', '🦄', '🐶', '🐱', '🐭'];  // 12 unique values for a 4x6 board
      break;
    default:
      values = ['🥳', '😇', '🤪', '🥺', '🎃', '💩', '👻', '🥰'];  // Default to medium (4x4)
  }
  const doubleValues = values.concat(values);  // Create pairs
  const shuffledTiles = doubleValues
    .sort(() => Math.random() - 0.5)
    .map(value => ({ value, isMatched: false }));
  return shuffledTiles;
};

const initialState = {
  tiles: [],
  gameMode: null,
  flippedIndices: [],
  showUnmatch: false,
  isWon: false,
  isShuffling: false,
  startTime: null,
  elapsedTime: 0,
  intervalId: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameMode(state, action) {
      state.gameMode = action.payload;
      state.tiles = generateTiles(action.payload);  // Update tiles when game mode is set
    },
    resetGameMode(state) {
      state.gameMode = null;
    },
    setTiles: (state, action) => {
      state.tiles = action.payload;
    },
    setFlippedIndices: (state, action) => {
      state.flippedIndices = action.payload;
    },
    setShowUnmatch: (state, action) => {
      state.showUnmatch = action.payload;
    },
    setIsWon: (state, action) => {
      state.isWon = action.payload;
    },
    setIsShuffling: (state, action) => {
      state.isShuffling = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setElapsedTime: (state, action) => {
      state.elapsedTime = action.payload;
    },
    incrementElapsedTime(state) {
      const now = Date.now();
      state.elapsedTime = now - state.startTime + state.elapsedTime;
      state.startTime = now;
    },
    setIntervalId: (state, action) => {
      state.intervalId = action.payload;
    },
    matchTiles(state, action) {
      const { index1, index2 } = action.payload;
      state.tiles = state.tiles.map((tile, index) => {
        if (index === index1 || index === index2) {
          return { ...tile, isMatched: true };
        }
        return tile;
      });
    },
    stopTimer(state) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    },
    checkForWin(state) {
      state.isWon = state.tiles.every(tile => tile.isMatched);
      if (state.isWon && state.intervalId !== null) {
        clearInterval(state.intervalId);
        state.intervalId = null;
      }
    },
  },
});

export const {
  setGameMode,
  resetGameMode,
  setTiles,
  setFlippedIndices,
  setShowUnmatch,
  setIsWon,
  setIsShuffling,
  setStartTime,
  setElapsedTime,
  incrementElapsedTime,
  setIntervalId,
  matchTiles,
  stopTimer,
  checkForWin,
  handleTileClick,
} = gameSlice.actions;

export const selectGameMode = state => state.game.gameMode;
export const selectTiles = state => state.game.tiles;
export const selectFlippedIndices = state => state.game.flippedIndices;
export const selectShowUnmatch = state => state.game.showUnmatch;
export const selectIsWon = state => state.game.isWon;
export const selectIsShuffling = state => state.game.isShuffling;
export const selectStartTime = state => state.game.startTime;
export const selectElapsedTime = state => state.game.elapsedTime;
export const selectIntervalId = state => state.game.intervalId;

export default gameSlice.reducer;

