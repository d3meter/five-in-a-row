import React, { useEffect, useState } from "react";
import "./css/Main.css";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { login, logOut } from "../admin/auth";
import PlayerConfig from "../components/PlayerConfig";
import Loader from "../components/Loader";
import {
  player1Data,
  player2Data,
  boardSize,
  updatePlayer1Data,
  updatePlayer2Data,
  updateBoardSize,
} from "../admin/gameData";
import circle from "../imgs/figures/circle.png";
import cross from "../imgs/figures/cross.png";
import square from "../imgs/figures/square.png";
import star from "../imgs/figures/star.png";
import triangle from "../imgs/figures/triangle.png";
import ticTacToe from "../imgs/tic-tac-toe.png";

function Main() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [playersDataInvalid, setPlayersDataInvalid] = useState(false);

  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);

  const [nameOfUser1, setNameOfUser1] = useState("");
  const [colorOfUser1, setColorOfUser1] = useState("");
  const [figureOfUser1, setFigureOfUser1] = useState("");
  const [isReadyUser1, setIsReadyUser1] = useState(false);
  const [imageSrcUser1, setImageSrcUser1] = useState("");
  const [imgClassUser1, setImgClassUser1] = useState("");

  const [nameOfUser2, setNameOfUser2] = useState("");
  const [colorOfUser2, setColorOfUser2] = useState("");
  const [figureOfUser2, setFigureOfUser2] = useState("");
  const [isReadyUser2, setIsReadyUser2] = useState(false);
  const [imageSrcUser2, setImageSrcUser2] = useState("");
  const [imgClassUser2, setImgClassUser2] = useState("");

  const [selectedBoardSize, setSelectedBoardSize] = useState(boardSize);

  const figureImages = {
    circle,
    cross,
    square,
    star,
    triangle,
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  useEffect(() => {
    loadPlayersData();
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

  useEffect(() => {
    // Check if board size is available in local storage
    const storedBoardSize = localStorage.getItem("boardSize");
    if (storedBoardSize) {
      const parsedBoardSize = parseInt(storedBoardSize);
      setSelectedBoardSize(parsedBoardSize);
    }
  }, []);

  const loadPlayersData = () => {
    const storedPlayer1Data = JSON.parse(localStorage.getItem("player1Data"));
    if (storedPlayer1Data) {
      setNameOfUser1(storedPlayer1Data.name);
      setColorOfUser1(storedPlayer1Data.color);
      setFigureOfUser1(storedPlayer1Data.figure);
      handleImgSrcChangeP1(storedPlayer1Data.figure);
      handleImgClassP1(storedPlayer1Data.color);
    }

    const storedPlayer2Data = JSON.parse(localStorage.getItem("player2Data"));
    if (storedPlayer2Data) {
      setNameOfUser2(storedPlayer2Data.name);
      setColorOfUser2(storedPlayer2Data.color);
      setFigureOfUser2(storedPlayer2Data.figure);
      handleImgSrcChangeP2(storedPlayer2Data.figure);
      handleImgClassP2(storedPlayer2Data.color);
    }
  };

  const onNameChangeP1 = (value) => {
    setNameOfUser1(value);
  };

  const onNameChangeP2 = (value) => {
    setNameOfUser2(value);
  };

  const onColorChangeP1 = (value) => {
    setColorOfUser1(value);
    handleImgClassP1(value);
  };

  const onColorChangeP2 = (value) => {
    setColorOfUser2(value);
    handleImgClassP2(value);
  };

  const onFigureChangeP1 = (value) => {
    setFigureOfUser1(value);
    handleImgSrcChangeP1(value);
  };

  const onFigureChangeP2 = (value) => {
    setFigureOfUser2(value);
    handleImgSrcChangeP2(value);
  };

  const handleImgSrcChangeP1 = (value) => {
    const p1Figure = value;
    setImageSrcUser1(figureImages[p1Figure]);
  };

  const handleImgSrcChangeP2 = (value) => {
    const p2Figure = value;
    setImageSrcUser2(figureImages[p2Figure]);
  };

  const handleImgClassP1 = (value) => {
    setImgClassUser1("figure-" + value);
  };

  const handleImgClassP2 = (value) => {
    setImgClassUser2("figure-" + value);
  };

  const handleStatusChangeP1 = () => {
    if (
      (isReadyUser2 && colorOfUser1 === colorOfUser2) ||
      (isReadyUser2 && figureOfUser1 === figureOfUser2)
    ) {
      console.log("invalid");
    } else {
      setIsReadyUser1((prevState) => !prevState);
    }
  };

  const handleStatusChangeP2 = () => {
    if (
      (isReadyUser1 && colorOfUser1 === colorOfUser2) ||
      (isReadyUser1 && figureOfUser1 === figureOfUser2)
    ) {
      console.log("invalid");
    } else {
      setIsReadyUser2((prevState) => !prevState);
    }
  };

  useEffect(() => {
    setIsLoggedOut(!(user1 && user2));
  }, [user1, user2]);

  useEffect(() => {
    setIsDisabled(!(isReadyUser1 && isReadyUser2));
  }, [isReadyUser1, isReadyUser2]);

  const handleLoginPlayer1 = (email, password) => {
    login(email, password, 1).then((userData1) => setUser1(userData1));
    localStorage.setItem("player1Data", JSON.stringify(player1Data));
    loadPlayersData();
  };

  const handleLoginPlayer2 = (email, password) => {
    login(email, password, 2).then((userData2) => setUser2(userData2));
    localStorage.setItem("player2Data", JSON.stringify(player2Data));
    loadPlayersData();
  };

  const handleLogoutPlayer1 = () => {
    logOut(1).then(() => setUser1(null));
  };

  const handleLogoutPlayer2 = () => {
    logOut(2).then(() => setUser2(null));
  };

  const handleGoButtonClick = () => {
    const player1Data = {
      email: user1.email,
      name: nameOfUser1,
      color: colorOfUser1,
      figure: figureOfUser1,
    };

    const player2Data = {
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
          <img
            className="bg-content right-bottom"
            src={ticTacToe}
            alt="tic-tac-toe"
          />
          <img
            className="bg-content left-bottom"
            src={ticTacToe}
            alt="tic-tac-toe"
          />

          <div className="container">
            {isLoggedOut && (
              <div className={`row ${!isLoggedOut ? "hide" : ""}`}>
                <div className="col text-center">
                  <h2>Five in a Row (for 2 players)</h2>
                  <span>
                    In order to play, both players need to be logged in.
                  </span>
                </div>
              </div>
            )}
            <hr />
            <div className="players row gap-5 justify-content-center">
              <div className="players-card col-md-6 col-lg-4 p-4 px-5">
                <h1>Player 1</h1>
                {!!user1 ? (
                  <>
                    <p>{nameOfUser1}</p>
                    {imageSrcUser1 && (
                      <img
                        className={"figure " + imgClassUser1}
                        src={imageSrcUser1}
                        alt="figure"
                      />
                    )}
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
                    <button
                      onClick={handleStatusChangeP1}
                      style={{ backgroundColor: isReadyUser1 ? "green" : "" }}
                    >
                      Ready
                    </button>
                  </>
                ) : (
                  <Login onLoginPlayer={handleLoginPlayer1} />
                )}
              </div>
              <div className="players-card col-md-6 col-lg-4 p-4 px-5">
                <h1>Player 2</h1>
                {!!user2 ? (
                  <>
                    <p>{nameOfUser2}</p>
                    {imageSrcUser2 && (
                      <img
                        className={"figure " + imgClassUser2}
                        src={imageSrcUser2}
                        alt="figure"
                      />
                    )}
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
                    <button
                      style={{ backgroundColor: isReadyUser2 ? "green" : "" }}
                      onClick={handleStatusChangeP2}
                    >
                      Ready
                    </button>
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
                <Link className="reg-container" to="/registration">
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
        </>
      )}
    </div>
  );
}

export default Main;
