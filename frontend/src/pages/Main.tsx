import React, { useEffect, useState } from "react";
import "./css/Main.css";

import { Link } from "react-router-dom";

import Player from "../services/Player";
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

  const [player1, setPlayer1] = useState<Player | null>(null);
  const [errorMessagePlayer1, setErrorMessagePlayer1] = useState<string | null>(
    null
  );
  const [isReadyPlayer1, setIsReadyPlayer1] = useState<boolean>(false);

  const [player2, setPlayer2] = useState<Player | null>(null);
  const [errorMessagePlayer2, setErrorMessagePlayer2] = useState<string | null>(
    null
  );
  const [isReadyPlayer2, setIsReadyPlayer2] = useState<boolean>(false);

  useEffect(() => {
    // Check if no user logged in
    setIsLoggedOut(!(player1 && player2));
  }, [player1, player2]);

  useEffect(() => {
    // Check if user1 data is available in local storage
    const player1Data = localStorage.getItem("player1Data");
    if (player1Data) {
      const playerData = JSON.parse(player1Data);
      setPlayer1(playerData);
    }
  }, []);

  useEffect(() => {
    // Check if user1 data is available in local storage
    const player2Data = localStorage.getItem("player2Data");
    if (player2Data) {
      const playerData = JSON.parse(player2Data);
      setPlayer2(playerData);
    }
  }, []);

  useEffect(() => {
    // Check if one of the users are not in status: ready
    setIsDisabled(!(isReadyPlayer1 && isReadyPlayer2));
  }, [isReadyPlayer1, isReadyPlayer2]);

  // Play game and update all the necessary data, if it is disabled prevent forwarding
/*   const handleGoButtonClick = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    const player1Data: Player = {
      email: user1.email,
      name: nameOfUser1,
      color: colorOfUser1,
      figure: figureOfUser1,
    };

    const player2Data: Player = {
      email: user2.email,
      name: nameOfUser2,
      color: colorOfUser2,
      figure: figureOfUser2,
    };

    const boardSize = selectedBoardSize;

    updatePlayer1Data(player1Data);
    updatePlayer2Data(player2Data);
    updateBoardSize(boardSize);

    localStorage.setItem("player1ImgSrc", JSON.stringify(imageSrcUser1));
    localStorage.setItem("player2ImgSrc", JSON.stringify(imageSrcUser2));
  }; */

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
                      isReadyPlayer={isReadyPlayer1}
                      errorMessage={errorMessagePlayer1}
                      setErrorMessagePlayer={setErrorMessagePlayer1}
                    />
                  </>
                ) : (
                  <>
                    <h1>Player 1</h1>
                    <Login
                      playerNumber={1}
                    />
                  </>
                )}
              </div>
              <div className="players-card col-md-6 col-lg-4 p-4 px-5">
                {!!player2 ? (
                  <PlayerConfig
                    isReadyPlayer={isReadyPlayer2}
                    errorMessage={errorMessagePlayer2}
                    setErrorMessagePlayer={setErrorMessagePlayer2}
                  />
                ) : (
                  <>
                    <h1>Player 2</h1>
                    <Login
                      playerNumber={2}
                    />
                  </>
                )}
              </div>
            </div>
            <hr />
 {/*            {isLoggedOut ? (
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
                    onChange={(event) =>
                      setSelectedBoardSize(event.target.value)
                    }
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
            )} */}
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
