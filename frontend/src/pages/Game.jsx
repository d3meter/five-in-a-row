import React, { useState, useEffect } from "react";
import "./css/Game.css";
import GameBoard from "../components/GameBoard";

function Game() {
  const [boardSize, setBoardSize] = useState(10);
  const [player1Data, setPlayer1Data] = useState({});
  const [player1Figure, setPlayer1Figure] = useState("");
  const [player2Data, setPlayer2Data] = useState({});
  const [player2Figure, setPlayer2Figure] = useState("");
  const [playersTurn, setPlayersTurn] = useState("");

  useEffect(() => {
    // Check if board size is available in local storage
    const storedBoardSize = localStorage.getItem("boardSize");
    if (storedBoardSize) {
      const parsedBoardSize = parseInt(storedBoardSize);
      setBoardSize(parsedBoardSize);
    }

    const storedPlayer1Data = JSON.parse(localStorage.getItem("player1Data"));
    setPlayer1Data(storedPlayer1Data);

    const figureSrcP1 = JSON.parse(localStorage.getItem("player1ImgSrc"));
    setPlayer1Figure(figureSrcP1);

    const storedPlayer2Data = JSON.parse(localStorage.getItem("player2Data"));
    setPlayer2Data(storedPlayer2Data);

    const figureSrcP2 = JSON.parse(localStorage.getItem("player2ImgSrc"));
    setPlayer2Figure(figureSrcP2);
  }, []);

  useEffect(() => {
    setPlayersTurn(player1Data.name);
  }, [player1Data]);

  const handleChangePlayersTurn = () => {
    setPlayersTurn((prevPlayersTurn) =>
      prevPlayersTurn === player1Data.name ? player2Data.name : player1Data.name
    );
  };

  return (
    <div className="Game">
      <div className="game-header">
        <div className="player-container">
          <p>{player1Data.email}</p>
          <p>{player1Data.name}</p>
          {player1Figure && (
            <img
              className={"figure-" + player1Data.color}
              src={player1Figure}
              alt="figure"
            />
          )}
        </div>
        <div className="player-container">
          <p>{player2Data.email}</p>
          <p>{player2Data.name}</p>
          {player2Figure && (
            <img
              className={"figure-" + player2Data.color}
              src={player2Figure}
              alt="figure"
            />
          )}
        </div>
      </div>
      <GameBoard
        boardSize={boardSize}
        playersTurn={playersTurn}
        handleChangePlayersTurn={handleChangePlayersTurn}
        player1Data={player1Data}
        player2Data={player2Data}
        player1Figure={player1Figure}
        player2Figure={player2Figure}
      />
    </div>
  );
}

export default Game;
