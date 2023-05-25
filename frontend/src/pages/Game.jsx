import React, { useState, useEffect, useRef } from "react";
import "./css/Game.css";
import GameBoard from "../components/GameBoard";
import { player1Data, player2Data } from "../admin/gameData";

function Game() {
  const [boardSize, setBoardSize] = useState(10);
  const [playersTurn, setPlayersTurn] = useState(player1Data.name);

  const handleChangePlayersTurn = () => {
    setPlayersTurn((prevPlayersTurn) =>
      prevPlayersTurn === player1Data.name ? player2Data.name : player1Data.name
    );
  };

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
      <div className="game-header">
        <div className="player-container">
          <p>{player1Data.name}</p>
          <p>{player1Data.color}</p>
          <p>{player1Data.figure}</p>
        </div>
        <div className="player-container">
          <p>{player2Data.name}</p>
          <p>{player2Data.color}</p>
          <p>{player2Data.figure}</p>
        </div>
      </div>
      <GameBoard
        boardSize={boardSize}
        playersTurn={playersTurn}
        handleChangePlayersTurn={handleChangePlayersTurn}
      />
    </div>
  );
}

export default Game;
