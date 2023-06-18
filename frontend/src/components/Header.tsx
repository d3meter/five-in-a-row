import React from "react";
import "./css/Header.css";

import { Link } from "react-router-dom";
import newGame from "../imgs/reload.png";
import endGame from "../imgs/exit.png";

interface HeaderProps {
  isActivePlayer1: boolean;
  isActivePlayer2: boolean;
  player1Data: any;
  player2Data: any;
  handleNewGame: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isActivePlayer1,
  isActivePlayer2,
  player1Data,
  player2Data,
  handleNewGame,
}) => {
  const player1Figure = player1Data?.figure;
  const player2Figure = player2Data?.figure;

  return (
    <div className="Header">
      <div
        className={`player-container ${isActivePlayer1 ? "active-player" : ""}`}
      >
        <div className="section-left">
          <p>{player1Data?.email}</p>
          <h2>{player1Data?.name}</h2>
        </div>
        <div className="section-right">
          {player1Figure && (
            <img
              className={`figure figure-${player1Data.color}`}
              src={require(`../imgs/figures/${player1Data.figure}.png`)}
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
          <p>{player2Data?.email}</p>
          <h2>{player2Data?.name}</h2>
        </div>
        <div className="section-right">
          {player2Figure && (
            <img
              className={`figure figure-${player2Data.color}`}
              src={require(`../imgs/figures/${player2Data.figure}.png`)}
              alt="figure"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
