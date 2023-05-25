import React, { useState, useEffect, useRef } from "react";
import "./css/Game.css";
import GameBoard from "../components/GameBoard";

function Game() {
  const [boardSize, setBoardSize] = useState(10);
  const [player1Data, setPlayer1Data ] = useState({});
  const [player2Data, setPlayer2Data ] = useState({})
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

    const storedPlayer1Data = JSON.parse(localStorage.getItem("player1Data"));
    setPlayer1Data(storedPlayer1Data);

    const storedPlayer2Data = JSON.parse(localStorage.getItem("player2Data"));
    setPlayer2Data(storedPlayer2Data);
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
