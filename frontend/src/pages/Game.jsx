import React, { useState, useEffect, useRef } from "react";
import './css/Game.css'
import GameBoard from "../components/GameBoard";
import { player1Data, player2Data, boardSize } from "../admin/gameData";

function Game() {
  const [boardSize, setBoardSize] = useState(10);

  useEffect(() => {
    // Check if board size is available in local storage
    const storedBoardSize = localStorage.getItem("boardSize");
    if (storedBoardSize) {
      const parsedBoardSize = parseInt(storedBoardSize);
      setBoardSize(parsedBoardSize);
    }
  }, []);

  return (
    <div className="Game">
      <p>{player1Data.name}</p>
      <p>{player2Data.color}</p>
      <p>{boardSize}</p>
        <GameBoard boardSize={boardSize}/>
    </div>
  );
}

export default Game;
