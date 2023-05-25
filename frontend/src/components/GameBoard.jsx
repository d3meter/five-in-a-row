import React, { useState } from "react";
import "./css/GameBoard.css";
import Square from "./Square";

function GameBoard({
  boardSize,
  playersTurn,
  handleChangePlayersTurn,
  player1Data,
  player2Data,
  player1Figure,
  player2Figure,
}) {
  const [isGameOver, setIsGameOver] = useState(false);

  const rows = boardSize;
  const columns = boardSize;

  const [grid, setGrid] = useState(() => {
    // Initialize the grid with all gridValues set to 0
    const initialGrid = Array(rows)
      .fill()
      .map(() => Array(columns).fill(0));
    return initialGrid;
  });

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

  return (
    <div className="GameBoard">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <Square
              key={`${rowIndex}-${columnIndex}`}
              playersTurn={playersTurn}
              handleChangePlayersTurn={handleChangePlayersTurn}
              handleSquareClick={() => handleSquareClick(rowIndex, columnIndex)}
              isGameOver={isGameOver}
              isWinningElement={grid[rowIndex][columnIndex] !== 0}
              player1Data={player1Data}
              player2Data={player2Data}
              player1Figure={player1Figure}
              player2Figure={player2Figure}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
