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
import goButton from "../imgs/play.png";
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

  const [user1, setUser1] = useState(null);
  const [errorMessagePlayer1, setErrorMessagePlayer1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [errorMessagePlayer2, setErrorMessagePlayer2] = useState(null);

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
    }, 2000);
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
    setIsReadyUser1(false);
  };

  const onNameChangeP2 = (value) => {
    setNameOfUser2(value);
    setIsReadyUser2(false);
  };

  const onColorChangeP1 = (value) => {
    setColorOfUser1(value);
    handleImgClassP1(value);
    setIsReadyUser1(false);
  };

  const onColorChangeP2 = (value) => {
    setColorOfUser2(value);
    handleImgClassP2(value);
    setIsReadyUser2(false);
  };

  const onFigureChangeP1 = (value) => {
    setFigureOfUser1(value);
    handleImgSrcChangeP1(value);
    setIsReadyUser1(false);
  };

  const onFigureChangeP2 = (value) => {
    setFigureOfUser2(value);
    handleImgSrcChangeP2(value);
    setIsReadyUser2(false);
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

  const onStatusChangeP1 = () => {
    if (
      (isReadyUser2 && colorOfUser1 === colorOfUser2) ||
      (isReadyUser2 && figureOfUser1 === figureOfUser2)
    ) {
      setErrorMessagePlayer1("Colors, figures must be different!");
    } else {
      setIsReadyUser1((prevState) => !prevState);
    }
  };

  const onStatusChangeP2 = () => {
    if (
      (isReadyUser1 && colorOfUser1 === colorOfUser2) ||
      (isReadyUser1 && figureOfUser1 === figureOfUser2)
    ) {
      setErrorMessagePlayer2("Colors, figures must be different!");
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

  const handleLoginPlayer1 = async (email, password) => {
    if (user2?.email !== email) {
      try {
        await login(email, password, 1).then((userData1) =>
          setUser1(userData1)
        );
        localStorage.setItem("player1Data", JSON.stringify(player1Data));
        loadPlayersData();
        setErrorMessagePlayer1(null);
      } catch (error) {
        setErrorMessagePlayer1("Wrong email or password!");
      }
    } else {
      setErrorMessagePlayer1("Email already logged in!");
    }
  };

  const handleLoginPlayer2 = async (email, password) => {
    if (user1?.email !== email) {
      try {
        await login(email, password, 2).then((userData2) =>
          setUser2(userData2)
        );
        localStorage.setItem("player2Data", JSON.stringify(player2Data));
        loadPlayersData();
        setErrorMessagePlayer2(null);
      } catch (error) {
        setErrorMessagePlayer2("Wrong email or password!");
      }
    } else {
      setErrorMessagePlayer2("Email already logged in!");
    }
  };

  const handleLogoutPlayer1 = () => {
    logOut(1).then(() => setUser1(null));
    setIsReadyUser1(false);
  };

  const handleLogoutPlayer2 = () => {
    logOut(2).then(() => setUser2(null));
    setIsReadyUser2(false);
  };

  const handleGoButtonClick = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

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
                {!!user1 ? (
                  <>
                    <PlayerConfig
                      user={user1}
                      nameOfUser={nameOfUser1}
                      colorOfUser={colorOfUser1}
                      figureOfUser={figureOfUser1}
                      onLogoutPlayer={handleLogoutPlayer1}
                      onNameChange={onNameChangeP1}
                      onColorChange={onColorChangeP1}
                      onFigureChange={onFigureChangeP1}
                      onStatusChange={onStatusChangeP1}
                      isReadyUser={isReadyUser1}
                      imageSrcUser={imageSrcUser1}
                      imgClassUser={imgClassUser1}
                      errorMessage={errorMessagePlayer1}
                      setErrorMessagePlayer={setErrorMessagePlayer1}
                    />
                  </>
                ) : (
                  <>
                    <h1>Player 1</h1>
                    <Login
                      errorMessage={errorMessagePlayer1}
                      onLoginPlayer={handleLoginPlayer1}
                    />
                  </>
                )}
              </div>
              <div className="players-card col-md-6 col-lg-4 p-4 px-5">
                {!!user2 ? (
                  <PlayerConfig
                    user={user2}
                    nameOfUser={nameOfUser2}
                    colorOfUser={colorOfUser2}
                    figureOfUser={figureOfUser2}
                    onLogoutPlayer={handleLogoutPlayer2}
                    onNameChange={onNameChangeP2}
                    onColorChange={onColorChangeP2}
                    onFigureChange={onFigureChangeP2}
                    onStatusChange={onStatusChangeP2}
                    isReadyUser={isReadyUser2}
                    imageSrcUser={imageSrcUser2}
                    imgClassUser={imgClassUser2}
                    errorMessage={errorMessagePlayer2}
                    setErrorMessagePlayer={setErrorMessagePlayer2}
                  />
                ) : (
                  <>
                    <h1>Player 2</h1>
                    <Login
                      errorMessage={errorMessagePlayer2}
                      onLoginPlayer={handleLoginPlayer2}
                    />
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
                    onChange={(event) =>
                      setSelectedBoardSize(event.target.value)
                    }
                    name="board-size"
                    id="board-size"
                    value={selectedBoardSize}
                  >
                    <option value="10">10 x 10</option>
                    <option value="15">15 x 15</option>
                    <option value="19">19 x 19</option>
                    <option value="24">24 x 24</option>
                  </select>
                </div>
                <Link
                  className={`game-button ${isDisabled ? "disabled" : ""}`}
                  to="/game"
                  onClick={handleGoButtonClick}
                  data-toggle="tooltip"
                  data-placement="right"
                  title={isDisabled ? "Both players must be 'READY' first." : "Let's play!"}
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
}

export default Main;
