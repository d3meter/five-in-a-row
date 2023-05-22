import React, { useState, useEffect, useRef } from "react";
import GameBoard from "../components/GameBoard";
import { player1Data, player2Data, boardSize } from "../admin/gameData";

function Game() {

  return (
    <div className="Game">
      <p>{player1Data.name}</p>
      <p>{player2Data.color}</p>
      <p>{boardSize}</p>
        <GameBoard />
    </div>
  );
}

export default Game;
