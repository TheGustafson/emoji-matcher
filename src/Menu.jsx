// src/components/Menu.jsx
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTiles, setGameMode, generateTiles } from "./redux/gameSlice";
import EmojiRain from "./EmojiRain";

function Menu() {
  const dispatch = useDispatch();

  const handleSelectMode = (mode) => {
    dispatch(setGameMode(mode));
    dispatch(setTiles(generateTiles(mode)));
  };

  return (
    <div className="menu-container">
      <h1>🎄 MatchMoji 🎁</h1>
      <h3>🧑‍🎄 Christmas Edition 🎅</h3>
      <button className="menu-button" onClick={() => handleSelectMode("easy")}>
        Easy
      </button>
      <button
        className="menu-button"
        onClick={() => handleSelectMode("medium")}
      >
        Medium
      </button>
      <button className="menu-button" onClick={() => handleSelectMode("hard")}>
        Hard
      </button>
      <EmojiRain speed={500} />
      <EmojiRain speed={400} />
      <EmojiRain speed={350} />
      <span className="emoji-spinner">❄️</span>
    </div>
  );
}

export default Menu;
