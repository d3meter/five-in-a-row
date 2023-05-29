import React from "react";
import "./css/Header.css";

import { Link } from "react-router-dom";
import newGame from "../imgs/reload.png";
import endGame from "../imgs/exit.png";

function Header({
  isActivePlayer1,
  isActivePlayer2,
  player1Data,
  player2Data,
  player1Figure,
  player2Figure,
  handleNewGame,
}) {
  return (
    <div className="Header">
      <div
        className={`player-container ${isActivePlayer1 ? "active-player" : ""}`}
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
        className={`player-container ${isActivePlayer2 ? "active-player" : ""}`}
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
  );
}

export default Header;
