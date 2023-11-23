import React, { useState, useEffect } from "react";

const EmojiRain = ({ speed }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const generateEmoji = () => {
      const x = Math.random() * window.innerWidth - 50;
      const y = Math.random() * window.innerHeight - 50;

      return {
        id: Date.now(),
        x,
        y,
        type: ["⛄️", "❄️", "🎄", "🎅", "🎁", "🥰", "😍", "⛸️", "💖", "🦌"][
          Math.floor(Math.random() * 10)
        ],
      };
    };

    const interval = setInterval(() => {
      setEmojis((prev) => [...prev, generateEmoji()]);

      // Remove emojis after they animate out
      setTimeout(() => {
        setEmojis((prev) => prev.slice(1));
      }, 2000); // this should match the animation duration
    }, speed); // interval to generate a new emoji

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="emoji-effects">
      {emojis.map((emoji) => (
        <span
          key={emoji.id}
          className="emoji-echo"
          style={{ left: emoji.x, top: emoji.y }}
        >
          {emoji.type}
        </span>
      ))}
    </div>
  );
};

export default EmojiRain;
