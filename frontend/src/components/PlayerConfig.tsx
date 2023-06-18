import React, { useState, useEffect, ChangeEvent } from "react";
import "./css/PlayerConfig.css";

import gameOptions from "../services/gameOptions.json";
import miniLoader from "../imgs/miniloader.gif";
import { PlayerState } from "../services/Player";

interface PlayerConfigProps {
  isReadyPlayer: boolean;
  playerNumber: number;
  onLogout;
  onStatusChange;
  errorMessage: string | null;
  onStatusReset;
}

const PlayerConfig: React.FC<PlayerConfigProps> = ({
  isReadyPlayer,
  playerNumber,
  onLogout,
  onStatusChange,
  errorMessage,
  onStatusReset,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);

  const [playerData, setPlayerData] = useState<PlayerState | null>(null);

  const [playerName, setPlayerName] = useState<string>("");
  const [playerFigure, setPlayerFigure] = useState<string>("");
  const [playerColor, setPlayerColor] = useState<string>("");

  // Loading animation with timeout
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  });

  useEffect(() => {
    const storedPlayerData = JSON.parse(
      localStorage.getItem(`player${playerNumber}Data`) || "null"
    );
    setPlayerData(storedPlayerData);
    setPlayerName(storedPlayerData.name);
    setPlayerFigure(storedPlayerData.figure);
    setPlayerColor(storedPlayerData.color);
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setIsNameValid(newName.trim().length >= 3);
    setPlayerName(newName);
    handleStatusReset(playerNumber);
  };

  const handleFigureChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newFigure = event.target.value;
    setPlayerFigure(newFigure);
    handleStatusReset(playerNumber);
  };

  const handleColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newColor = event.target.value;
    setPlayerColor(newColor);
    handleStatusReset(playerNumber);
  };

  const handleLogout = (playerNumber) => {
    onLogout(playerNumber);
    handleStatusReset(playerNumber);
  };

  const handleStatusReset = (playerNumber) => {
    onStatusReset(playerNumber);
  };

  const handleStatusChange = () => {
    if (isNameValid) {
      const playerData: PlayerState = {
        number: playerNumber,
        name: playerName,
        color: playerColor,
        figure: playerFigure,
      };
      onStatusChange(playerData);
    }
  };

  return (
    <div className="PlayerConfig container">
      {isLoading ? (
        <div className="loader-container">
          <img className="mini-loader" src={miniLoader} alt="loading..." />
        </div>
      ) : (
        <>
          <h1 className="text-center">{isNameValid ? playerName : "..."}</h1>
          <div className="row gap-2 d-flex justify-content-center">
            <div className="row text-center">
              <p className="m-0">{playerData?.email}</p>
            </div>
            <div className="figure-container row justify-content-center">
              <img
                className={`figure figure-${playerColor}`}
                src={require(`../imgs/figures/${playerFigure}.png`)}
                alt="figure"
              />
            </div>
            <form className="px-4 pt-2 d-flex flex-column gap-2">
              <div className="form-group row ">
                <label htmlFor="name" className="col-sm-4 col-form-label">
                  Name:
                </label>
                <div className="col-sm-8">
                  <input
                    className={`custom-input w-100 ${
                      !isNameValid ? "is-invalid" : ""
                    }`}
                    onChange={handleNameChange}
                    type="text"
                    placeholder="name"
                    id="name"
                    value={playerName}
                    maxLength={8}
                    minLength={3}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="figure" className="col-sm-4 col-form-label">
                  Figure:
                </label>
                <div className="col-sm-8">
                  <select
                    className="custom-select"
                    onChange={handleFigureChange}
                    name="figure"
                    id="figure"
                    value={playerFigure}
                  >
                    {gameOptions.figures.options.map((figure) => (
                      <option key={figure} value={figure}>
                        {figure.charAt(0).toUpperCase() + figure.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="color" className="col-sm-4 col-form-label">
                  Color:
                </label>
                <div className="col-sm-8">
                  <select
                    className="custom-select"
                    onChange={handleColorChange}
                    name="color"
                    id="color"
                    value={playerColor}
                  >
                    {gameOptions.colors.options.map((color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
          <hr />
          <div className="w-40 d-flex justify-content-center">
            <button
              className={
                isReadyPlayer
                  ? "btn btn-warning px-4"
                  : "btn btn-secondary px-4"
              }
              onClick={handleStatusChange}
            >
              READY
            </button>
          </div>
          {(!isNameValid || errorMessage) && (
            <p className="text-danger text-center py-2">
              {isNameValid ? errorMessage : "Invalid name format!"}
            </p>
          )}
          <button
            className="logout-btn btn btn-dark"
            onClick={() => handleLogout(playerNumber)}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default PlayerConfig;
