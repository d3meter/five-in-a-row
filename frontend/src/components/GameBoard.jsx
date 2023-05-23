import React from "react";
import "./css/GameBoard.css";
import Square from "./Square";

function GameBoard({ boardSize, playersTurn, handleChangePlayersTurn }) {
  const rows = boardSize;
  const columns = boardSize;

  // Create a 2D matrix array to represent the grid
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push({ rowIndex: i, columnIndex: j });
    }
    grid.push(row);
  }

  return (
    <div className="GameBoard">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <Square key={`${rowIndex}-${columnIndex}`} playersTurn={playersTurn} handleChangePlayersTurn={handleChangePlayersTurn} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
