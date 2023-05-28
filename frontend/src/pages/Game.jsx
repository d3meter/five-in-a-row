import React, { useState, useEffect } from "react";
import "./css/Game.css";
import { Link } from "react-router-dom";
import Square from "../components/Square";
import newGame from "../imgs/reload.png";
import endGame from "../imgs/exit.png";

function Game() {
  const [player1Data, setPlayer1Data] = useState({});
  const [player1Figure, setPlayer1Figure] = useState("");
  const [player2Data, setPlayer2Data] = useState({});
  const [player2Figure, setPlayer2Figure] = useState("");
  const [playersTurn, setPlayersTurn] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [grid, setGrid] = useState([]);
  const [isWinner, setIsWinner] = useState(null);
  const [resetSquare, setResetSquare] = useState(false);

  const isActivePlayer1 =
    (playersTurn === player1Data.name && !isGameOver) ||
    isWinner === player1Data.name;
  const isActivePlayer2 =
    (playersTurn === player2Data.name && !isGameOver) ||
    isWinner === player2Data.name;

  useEffect(() => {
    renderGrid();
  }, []);

  const renderGrid = () => {
    const storedBoardSize = localStorage.getItem("boardSize");
    if (storedBoardSize) {
      const parsedBoardSize = parseInt(storedBoardSize);

      const initialGrid = Array(parsedBoardSize)
        .fill()
        .map(() => Array(parsedBoardSize).fill(0));
      setGrid(initialGrid);
    }
  };

  useEffect(() => {
    const storedPlayer1Data = JSON.parse(localStorage.getItem("player1Data"));
    setPlayer1Data(storedPlayer1Data);

    const figureSrcP1 = JSON.parse(localStorage.getItem("player1ImgSrc"));
    setPlayer1Figure(figureSrcP1);

    const storedPlayer2Data = JSON.parse(localStorage.getItem("player2Data"));
    setPlayer2Data(storedPlayer2Data);

    const figureSrcP2 = JSON.parse(localStorage.getItem("player2ImgSrc"));
    setPlayer2Figure(figureSrcP2);
  }, []);

  const checkWin = (grid, rowIndex, columnIndex, playersTurn) => {
    const startPoint = grid[rowIndex][columnIndex];
    let counterDia1 = 1;
    let counterDia2 = 1;
    let counterHor = 1;
    let counterVer = 1;
    let winningElements = [[rowIndex, columnIndex]];

    const directions = [
      { dx: -1, dy: -1 }, // top-left
      { dx: 1, dy: 1 }, // bottom-right
      { dx: -1, dy: 1 }, // top-right
      { dx: 1, dy: -1 }, // bottom-left
      { dx: 0, dy: -1 }, // up
      { dx: 0, dy: 1 }, // down
      { dx: -1, dy: 0 }, // left
      { dx: 1, dy: 0 }, // right
    ];

    for (const { dx, dy } of directions) {
      let i = 1;
      while (true) {
        const x = rowIndex + dx * i;
        const y = columnIndex + dy * i;

        if (
          x < 0 ||
          x >= grid.length ||
          y < 0 ||
          y >= grid[0].length ||
          grid[x][y] !== startPoint
        ) {
          break;
        }

        if (dx === -1 && dy === -1) {
          counterDia1 += 1;
        } else if (dx === 1 && dy === 1) {
          counterDia1 += 1;
        } else if (dx === -1 && dy === 1) {
          counterDia2 += 1;
        } else if (dx === 1 && dy === -1) {
          counterDia2 += 1;
        } else if (dx === 0 && dy === -1) {
          counterHor += 1;
        } else if (dx === 0 && dy === 1) {
          counterHor += 1;
        } else if (dx === -1 && dy === 0) {
          counterVer += 1;
        } else if (dx === 1 && dy === 0) {
          counterVer += 1;
        }

        winningElements.push([x, y]);
        i++;
      }
    }

    if (
      counterDia1 >= 5 ||
      counterDia2 >= 5 ||
      counterHor >= 5 ||
      counterVer >= 5
    ) {
      setIsGameOver(true);
      setIsWinner(playersTurn);
      console.log(`Player ${playersTurn} wins!`);
      highlightWinningElements(winningElements);
    }
  };

  const highlightWinningElements = (elements) => {
    const updatedGrid = [...grid];
    elements.forEach(([row, col]) => {
      updatedGrid[row][col] = playersTurn === player1Data.name ? 1 : 2;
    });
    setGrid(updatedGrid);
  };

  useEffect(() => {
    setPlayersTurn(player1Data.name);
  }, [player1Data]);

  const handleChangePlayersTurn = () => {
    setPlayersTurn((prevPlayersTurn) =>
      prevPlayersTurn === player1Data.name ? player2Data.name : player1Data.name
    );
  };

  const handleSquareClick = (rowIndex, columnIndex) => {
    // Check if the square is already clicked or the game is over
    if (grid[rowIndex][columnIndex] !== 0) {
      return;
    }

    // Update the grid value based on the current player
    const updatedGrid = [...grid];
    if (playersTurn === player1Data.name) {
      updatedGrid[rowIndex][columnIndex] = 1;
    } else {
      updatedGrid[rowIndex][columnIndex] = 2;
    }

    // Update the grid state
    setGrid(updatedGrid);
    console.log(updatedGrid);

    checkWin(updatedGrid, rowIndex, columnIndex, playersTurn);
  };

  const handleNewGame = () => {
    setPlayersTurn(player1Data.name);
    setIsGameOver(false);
    setIsWinner(null);
    renderGrid();
    setResetSquare((prevReset) => !prevReset);
  };

  return (
    <div className="Game">
      <div className="game-header">
        <div
          className={`player-container ${
            isActivePlayer1 ? "active-player" : ""
          }`}
        >
          <div className="section-left">
            <p>{player1Data.email}</p>
            <h2>{player1Data.name}</h2>
          </div>
          <div className="section-right">
            {player1Figure && (
              <img
                className={"figure-" + player1Data.color}
                src={player1Figure}
                alt="figure"
              />
            )}
          </div>
        </div>
        <div className="controller">
          <button
            className="game-button"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Start a new game"
          >
            <img src={newGame} alt="new game" onClick={handleNewGame} />
          </button>
          <button
            className="game-button"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Exit game"
          >
            <Link to="/">
              <img src={endGame} alt="end game" />
            </Link>
          </button>
        </div>
        <div
          className={`player-container ${
            isActivePlayer2 ? "active-player" : ""
          }`}
        >
          <div className="section-left">
            <p>{player2Data.email}</p>
            <h2>{player2Data.name}</h2>
          </div>
          <div className="section-right">
            {player2Figure && (
              <img
                className={"figure-" + player2Data.color}
                src={player2Figure}
                alt="figure"
              />
            )}
          </div>
        </div>
      </div>
      {isWinner && (
        <div className="pop-up">
          <h1>{isWinner} won!</h1>
        </div>
      )}
      <div className="GameBoard">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <Square
                key={`${rowIndex}-${columnIndex}`}
                playersTurn={playersTurn}
                handleChangePlayersTurn={handleChangePlayersTurn}
                handleSquareClick={() =>
                  handleSquareClick(rowIndex, columnIndex)
                }
                isGameOver={isGameOver}
                isWinningElement={grid[rowIndex][columnIndex] !== 0}
                player1Data={player1Data}
                player2Data={player2Data}
                player1Figure={player1Figure}
                player2Figure={player2Figure}
                resetSquare={resetSquare}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
