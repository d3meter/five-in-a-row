import React, { useState } from "react";
import "./css/GameBoard.css";
import Square from "./Square";
import { player1Data } from "../admin/gameData";


function GameBoard({ boardSize, playersTurn, handleChangePlayersTurn }) {
  const rows = boardSize;
  const columns = boardSize;

  const [grid, setGrid] = useState(() => {
    // Initialize the grid with all gridValues set to 0
    const initialGrid = Array(rows)
      .fill()
      .map(() => Array(columns).fill(0));
    return initialGrid;
  });

  const handleSquareClick = (rowIndex, columnIndex) => {
    // Check if the square is already clicked
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
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
