import React, { useState, useEffect } from "react";
import "./css/Game.css";

import { PlayerState } from "../services/Player";

import Square from "../components/Square";
import Header from "../components/Header";

const Game: React.FC = () => {
  const [player1Data, setPlayer1Data] = useState<PlayerState | null>(null);
  const [player2Data, setPlayer2Data] = useState<PlayerState | null>(null);
  const [playersTurn, setPlayersTurn] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [grid, setGrid] = useState<number[][]>([]);
  const [isWinner, setIsWinner] = useState<string | null>(null);
  const [resetSquare, setResetSquare] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  // Check active player and winner
  const isActivePlayer1 =
    (playersTurn === player1Data?.name && !isGameOver) ||
    isWinner === player1Data?.name;
  const isActivePlayer2 =
    (playersTurn === player2Data?.name && !isGameOver) ||
    isWinner === player2Data?.name;

  // Reset grid
  useEffect(() => {
    renderGrid();
  }, []);

  // Load players' and board's data from local storage
  useEffect(() => {
    const storedPlayer1Data = JSON.parse(
      localStorage.getItem("player1Data") || "{}"
    );
    setPlayer1Data(storedPlayer1Data);

    const storedPlayer2Data = JSON.parse(
      localStorage.getItem("player2Data") || "{}"
    );
    setPlayer2Data(storedPlayer2Data);
  }, []);

  // Set P1 as start player
  useEffect(() => {
    const player1Name = player1Data?.name;
    if (player1Name) {
      setPlayersTurn(player1Name);
    }
  }, [player1Data]);

  // Render grid based on the board size filled all matrix elements with 0 value
  const renderGrid = () => {
    const storedBoardSize = localStorage.getItem("boardSize");
    if (storedBoardSize) {
      const parsedBoardSize = parseInt(storedBoardSize);

      const initialGrid = Array(parsedBoardSize)
        .fill(0)
        .map(() => Array(parsedBoardSize).fill(0));
      setGrid(initialGrid);
    }
  };

  // Check if 5 in a row in all directions started from the clicked square or no more empty square available (draw)
  const checkWin = (
    grid: number[][],
    rowIndex: number,
    columnIndex: number,
    playersTurn: string
  ) => {
    const startPoint = grid[rowIndex][columnIndex];
    let counterDia1 = 1;
    let counterDia2 = 1;
    let counterHor = 1;
    let counterVer = 1;
    let winningElements: [number, number][] = [[rowIndex, columnIndex]];

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
    } else {
      const hasEmptySquare = grid.some((row) => row.includes(0));
      if (!hasEmptySquare) {
        setIsGameOver(true);
        setIsDraw(true);
        console.log("The game is a draw!");
      }
    }
  };

  // Change style of squares with figures if someone won
  const highlightWinningElements = (elements: [number, number][]) => {
    const updatedGrid = [...grid];
    elements.forEach(([row, col]) => {
      updatedGrid[row][col] = playersTurn === player1Data?.name ? 1 : 2;
    });
    setGrid(updatedGrid);
  };

  // Switch player
  const handleChangePlayersTurn = () => {
    setPlayersTurn((prevPlayersTurn) => {
      if (prevPlayersTurn === player1Data?.name && player2Data?.name) {
        return player2Data.name;
      } else if (prevPlayersTurn === player2Data?.name && player1Data?.name) {
        return player1Data.name;
      } else {
        return prevPlayersTurn;
      }
    });
  };

  const handleSquareClick = (rowIndex: number, columnIndex: number) => {
    // Check if the square is already clicked or the game is over
    if (grid[rowIndex][columnIndex] !== 0) {
      return;
    }

    // Update the grid value based on the current player
    const updatedGrid = [...grid];
    if (playersTurn === player1Data?.name) {
      updatedGrid[rowIndex][columnIndex] = 1;
    } else {
      updatedGrid[rowIndex][columnIndex] = 2;
    }

    // Update the grid state
    setGrid(updatedGrid);
    console.log(updatedGrid);

    checkWin(updatedGrid, rowIndex, columnIndex, playersTurn);
  };

  // Reset the game
  const handleNewGame = () => {
    if (player1Data) {
      setPlayersTurn(player1Data.name);
    }
    setIsGameOver(false);
    setIsDraw(false);
    setIsWinner(null);
    renderGrid();
    setResetSquare((prevReset) => !prevReset);
  };

  return (
    <>
      <Header
        isActivePlayer1={isActivePlayer1}
        isActivePlayer2={isActivePlayer2}
        player1Data={player1Data}
        player2Data={player2Data}
        handleNewGame={handleNewGame}
      />

      <div className="Game">
        {isWinner && (
          <div className="pop-up">
            <h1>{isWinner} won!</h1>
          </div>
        )}
        {isDraw && (
          <div className="pop-up">
            <h1>Draw!</h1>
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
                  resetSquare={resetSquare}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Game;
