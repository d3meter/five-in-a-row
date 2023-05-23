import React from "react";
import "./css/GameBoard.css";
import Square from "./Square";

function GameBoard({ boardSize }) {
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

  // Function to handle the selection of a component based on its indexes
  const handleComponentSelection = (rowIndex, columnIndex) => {
    // Your logic for handling the selection of the component
    console.log(`Selected component at row ${rowIndex}, column ${columnIndex}`);
  };

  return (
    <div className="GameBoard">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <Square
              key={`${rowIndex}-${columnIndex}`}
              onClick={() => handleComponentSelection(rowIndex, columnIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
