import React, { useState, useEffect, useRef } from "react";
import GameBoard from "../components/GameBoard";

function Game() {
  const [configModeOn, SetConfigModeOn] = useState(false);

  return (
    <div className="Game">
      {configModeOn ? (
        <div className="gameConfig">
          <h3>Board size</h3>
          <select name="" id="">
            <option value="10x10">10x10</option>
          </select>
          <button>Go</button>
        </div>
      ) : (
        <GameBoard />
      )}
    </div>
  );
}

export default Game;
