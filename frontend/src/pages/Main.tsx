import React, { useEffect, useState, ChangeEvent } from "react";
import "./css/Main.css";

import { Link } from "react-router-dom";

import { logOut, login } from "../services/auth";
import Player, { PlayerState } from "../services/Player";
import Board, { BoardState } from "../services/Board";
import gameOptions from "../services/gameOptions.json";

import Login from "../components/Login";
import PlayerConfig from "../components/PlayerConfig";
import Loader from "../components/Loader";

import goButton from "../imgs/play.png";
import ticTacToe from "../imgs/tic-tac-toe.png";

interface MainProps {
  isLoading: boolean;
}

const Main: React.FC<MainProps> = ({ isLoading }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  const [player1, setPlayer1] = useState<PlayerState | null>(null);
  const [isReadyPlayer1, setIsReadyPlayer1] = useState<boolean>(false);
  const [errorMessageP1, setErrorMessageP1] = useState<string | null>(null);

  const [player2, setPlayer2] = useState<PlayerState | null>(null);
  const [isReadyPlayer2, setIsReadyPlayer2] = useState<boolean>(false);
  const [errorMessageP2, setErrorMessageP2] = useState<string | null>(null);

  const [selectedBoardSize, setSelectedBoardSize] = useState<number>(
    gameOptions.boardsizes.default
  );

  useEffect(() => {
    // Check if no user logged in
    setIsLoggedOut(!(player1 && player2));
  }, [player1, player2]);

  useEffect(() => {
    // Check if player1 data is available in local storage
    const player1Data = localStorage.getItem("player1Data");
    if (player1Data) {
      const playerData = JSON.parse(player1Data);
      setPlayer1(playerData);
    }
  }, []);

  useEffect(() => {
    // Check if player2 data is available in local storage
    const player2Data = localStorage.getItem("player2Data");
    if (player2Data) {
      const playerData = JSON.parse(player2Data);
      setPlayer2(playerData);
    }
  }, []);

  useEffect(() => {
    // Check if board size is available in local storage
    const storedBoardSize = localStorage.getItem("boardSize");
    if (storedBoardSize) {
      const parsedBoardSize = parseInt(storedBoardSize);
      setSelectedBoardSize(parsedBoardSize);
    }
  }, []);

  useEffect(() => {
    // Check if one of the users are not in status: ready
    setIsDisabled(!(isReadyPlayer1 && isReadyPlayer2));
  }, [isReadyPlayer1, isReadyPlayer2]);

  const handleLogout = (playerNumber) => {
    logOut(playerNumber);
    playerNumber === 1 ? setPlayer1(null) : setPlayer2(null);
  };

  const handleLogin = async (email, password, playerNumber) => {
    const response = await login(email, password, playerNumber);
    playerNumber === 1
      ? setPlayer1(response.email)
      : setPlayer2(response.email);
  };

  const handleStatusChange = (playerData) => {
    const errorMessage = "Properties must be different!";
    if (playerData.number === 1) {
      if (
        !isReadyPlayer2 ||
        (playerData.name !== player2?.name &&
          playerData.color !== player2?.color &&
          playerData.figure !== player2?.figure)
      ) {
        const newData = { ...player1, ...playerData };
        setPlayer1(newData);
        setIsReadyPlayer1((prevState) => !prevState);
      } else {
        setErrorMessageP1(errorMessage);
        setTimeout(() => {
          setErrorMessageP1(null);
        }, 2000);
      }
    }
    if (playerData.number === 2) {
      if (
        !isReadyPlayer1 ||
        (playerData.name !== player1?.name &&
          playerData.color !== player1?.color &&
          playerData.figure !== player1?.figure)
      ) {
        const newData = { ...player2, ...playerData };
        setPlayer2(newData);
        setIsReadyPlayer2((prevState) => !prevState);
      } else {
        setErrorMessageP2(errorMessage);
        setTimeout(() => {
          setErrorMessageP2(null);
        }, 2000);
      }
    }
  };

  const handleStatusReset = (playerNumber) => {
    playerNumber === 1 ? setIsReadyPlayer1(false) : setIsReadyPlayer2(false);
  };

  const handleBoardSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    setSelectedBoardSize(newSize);
  };

  // Play game and update all the necessary data, if it is disabled prevent forwarding
  const handleGoButtonClick = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    const player1Name = player1?.name || "";
    const player1Color = player1?.color || "";
    const player1Figure = player1?.figure || "";

    Player.updatePlayerData(1, player1Name, player1Color, player1Figure);

    const player2Name = player2?.name || "";
    const player2Color = player2?.color || "";
    const player2Figure = player2?.figure || "";

    Player.updatePlayerData(2, player2Name, player2Color, player2Figure);

    const boardSize = selectedBoardSize;
    Board.updateBoardSize(boardSize);
  };

  return (
    <div className="Main">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img
            className="bg-content left-top"
            src={ticTacToe}
            alt="tic-tac-toe"
          />
          <img
            className="bg-content right-top"
            src={ticTacToe}
            alt="tic-tac-toe"
          />

          <div className="container">
            <div className="row">
              <div className="col text-center">
                {isLoggedOut ? (
                  <>
                    <h2>Five in a Row (for 2 players)</h2>
                    <span>
                      In order to play, both players need to be logged in.
                    </span>
                  </>
                ) : (
                  <>
                    <h2>Player config</h2>
                    <span>
                      Here you can change your name, figure and its color and
                      also define the size of game area.
                    </span>
                  </>
                )}
              </div>
            </div>
            <hr />
            <div className="players row gap-5 justify-content-center">
              <div className="players-card col-md-6 col-lg-4 p-4 px-5">
                {!!player1 ? (
                  <>
                    <PlayerConfig
                      playerNumber={1}
                      isReadyPlayer={isReadyPlayer1}
                      onLogout={handleLogout}
                      onStatusChange={handleStatusChange}
                      errorMessage={errorMessageP1}
                      onStatusReset={handleStatusReset}
                    />
                  </>
                ) : (
                  <>
                    <h1>Player 1</h1>
                    <Login playerNumber={1} onLogin={handleLogin} />
                  </>
                )}
              </div>
              <div className="players-card col-md-6 col-lg-4 p-4 px-5">
                {!!player2 ? (
                  <PlayerConfig
                    playerNumber={2}
                    isReadyPlayer={isReadyPlayer2}
                    onLogout={handleLogout}
                    onStatusChange={handleStatusChange}
                    errorMessage={errorMessageP2}
                    onStatusReset={handleStatusReset}
                  />
                ) : (
                  <>
                    <h1>Player 2</h1>
                    <Login playerNumber={2} onLogin={handleLogin} />
                  </>
                )}
              </div>
            </div>
            <hr />
            {isLoggedOut ? (
              <div
                className={`row text-center collapse-section ${
                  !isLoggedOut ? "hide" : ""
                }`}
              >
                <Link className="reg-container" to="/registration">
                  <span>Or you can </span>
                  <h2>REGISTER HERE</h2>
                </Link>
              </div>
            ) : (
              <div className="collapse-section container d-flex flex-column pb-3">
                <h3>Board size:</h3>
                <div className="row d-flex justify-content-center pb-2 w-100">
                  <select
                    className="bs-select"
                    onChange={handleBoardSizeChange}
                    name="board-size"
                    id="board-size"
                    value={selectedBoardSize}
                  >
                    {gameOptions.boardsizes.options.map((size) => (
                      <option key={size} value={size.toString()}>
                        {size} x {size}
                      </option>
                    ))}
                  </select>
                </div>
                <Link
                  className={`game-button ${isDisabled ? "disabled" : ""}`}
                  to="/game"
                  onClick={handleGoButtonClick}
                  data-toggle="tooltip"
                  data-placement="right"
                  title={
                    isDisabled
                      ? "Both players must be 'READY' first."
                      : "Let's play!"
                  }
                >
                  <img src={goButton} alt="GO" />
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
