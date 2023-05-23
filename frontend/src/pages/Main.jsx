import React, { useEffect, useState } from "react";
import "./css/Main.css";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { login, logOut } from "../admin/auth";
import PlayerConfig from "../components/PlayerConfig";
import {
  player1Data,
  player2Data,
  boardSize,
  updatePlayer1Data,
  updatePlayer2Data,
  updateBoardSize,
} from "../admin/gameData";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Main() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);

  const [nameOfUser1, setNameOfUser1] = useState("");
  const [colorOfUser1, setColorOfUser1] = useState("");
  const [figureOfUser1, setFigureOfUser1] = useState("");
  const [isReadyUser1, setIsReadyUser1] = useState(false);

  const [nameOfUser2, setNameOfUser2] = useState("");
  const [colorOfUser2, setColorOfUser2] = useState("");
  const [figureOfUser2, setFigureOfUser2] = useState("");
  const [isReadyUser2, setIsReadyUser2] = useState(false);

  const [selectedBoardSize, setSelectedBoardSize] = useState(boardSize);

  useEffect(() => {
    setNameOfUser1(player1Data.name);
    setColorOfUser1(player1Data.color);
    setFigureOfUser1(player1Data.figure);
    setNameOfUser2(player2Data.name);
    setColorOfUser2(player2Data.color);
    setFigureOfUser2(player2Data.figure);
  }, []);

useEffect(() => {
  // Check if user1 data is available in local storage
  const user1Data = localStorage.getItem("user1");
  if (user1Data) {
    const userData1 = JSON.parse(user1Data);
    setUser1(userData1);
  }
  }, []);

  useEffect(() => {
  // Check if user2 data is available in local storage
  const user2Data = localStorage.getItem("user2");
  if (user2Data) {
    const userData2 = JSON.parse(user2Data);
    setUser2(userData2);
  }
}, []);

  const onNameChangeP1 = (value) => {
    setNameOfUser1(value);
  };

  const onNameChangeP2 = (value) => {
    setNameOfUser2(value);
  };

  const onColorChangeP1 = (value) => {
    setColorOfUser1(value);
  };

  const onColorChangeP2 = (value) => {
    setColorOfUser2(value);
  };

  const onFigureChangeP1 = (value) => {
    setFigureOfUser1(value);
  };

  const onFigureChangeP2 = (value) => {
    setFigureOfUser2(value);
  };

  const handleStatusChangeP1 = () => {
    setIsReadyUser1((prevState) => !prevState);
  };

  const handleStatusChangeP2 = () => {
    setIsReadyUser2((prevState) => !prevState);
  };

  useEffect(() => {
    setIsLoggedOut(!(user1 && user2));
  }, [user1, user2]);

  useEffect(() => {
    setIsDisabled(!(isReadyUser1 && isReadyUser2));
  }, [isReadyUser1, isReadyUser2]);

  const handleLoginPlayer1 = (email, password) => {
    login(email, password, 1).then((userData1) => setUser1(userData1));
  };

  const handleLoginPlayer2 = (email, password) => {
    login(email, password, 2).then((userData2) => setUser2(userData2));
  };

  const handleLogoutPlayer1 = () => {
    logOut(1).then(() => setUser1(null));
  };

  const handleLogoutPlayer2 = () => {
    logOut(2).then(() => setUser2(null));
  };

  const handleGoButtonClick = () => {
    const player1Data = {
      name: nameOfUser1,
      color: colorOfUser1,
      figure: figureOfUser1,
    };

    const player2Data = {
      name: nameOfUser2,
      color: colorOfUser2,
      figure: figureOfUser2,
    };

    const boardSize = selectedBoardSize;

    updatePlayer1Data(player1Data);
    updatePlayer2Data(player2Data);
    updateBoardSize(boardSize);
  };

  return (
    <div className="Main">
      <div className="container">
        {isLoggedOut && (
          <div className={`row ${!isLoggedOut ? "hide" : ""}`}>
            <div className="col text-center">
              <h2>Five in a Row (for 2 players)</h2>
              <span>In order to play, both players need to be logged in.</span>
            </div>
          </div>
        )}
        <hr />
        <div className="row gap-5 justify-content-center">
          <div className="col-md-5 col-lg-5">
            <h1>Player 1</h1>
            {!!user1 ? (
              <>
                <p>{nameOfUser1}</p>
                <p>{colorOfUser1}</p>
                <p>{figureOfUser1}</p>
                <PlayerConfig
                  user={user1}
                  nameOfUser={nameOfUser1}
                  colorOfUser={colorOfUser1}
                  figureOfUser={figureOfUser1}
                  onLogoutPlayer={handleLogoutPlayer1}
                  onNameChange={onNameChangeP1}
                  onColorChange={onColorChangeP1}
                  onFigureChange={onFigureChangeP1}
                />
                <button onClick={handleStatusChangeP1}>Ready</button>
              </>
            ) : (
              <Login onLoginPlayer={handleLoginPlayer1} />
            )}
          </div>
          <div className="col-md-5 col-lg-5">
            <h1>Player 2</h1>
            {!!user2 ? (
              <>
                <p>{nameOfUser2}</p>
                <p>{colorOfUser2}</p>
                <p>{figureOfUser2}</p>
                <PlayerConfig
                  user={user2}
                  nameOfUser={nameOfUser2}
                  colorOfUser={colorOfUser2}
                  figureOfUser={figureOfUser2}
                  onLogoutPlayer={handleLogoutPlayer2}
                  onNameChange={onNameChangeP2}
                  onColorChange={onColorChangeP2}
                  onFigureChange={onFigureChangeP2}
                />
                <button onClick={handleStatusChangeP2}>Ready</button>
              </>
            ) : (
              <Login onLoginPlayer={handleLoginPlayer2} />
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
            <Link to="/registration">
              <span>Or you can </span>
              <h2>REGISTER HERE</h2>
            </Link>
          </div>
        ) : (
          <div className="row text-center collapse-section">
            <h1>Board size:</h1>
            <select
              onChange={(event) => setSelectedBoardSize(event.target.value)}
              name="board-size"
              id="board-size"
              value={selectedBoardSize}
            >
              <option value="10">10 x 10</option>
              <option value="15">15 x 15</option>
              <option value="19">19 x 19</option>
              <option value="24">24 x 24</option>
            </select>
            <Link to="/game">
              <button disabled={isDisabled} onClick={handleGoButtonClick}>
                Go
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
