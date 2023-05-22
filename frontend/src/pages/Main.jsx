import React, { useEffect, useState } from "react";
import "./css/Main.css";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { login, logOut } from "../admin/auth";
import PlayerConfig from "../components/PlayerConfig";

function Main() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [sectionHeight, setsectionHeight] = useState("auto");

  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);

  const [nameOfUser1, setNameOfUser1] = useState("player1");
  const [colorOfUser1, setColorOfUser1] = useState("red");
  const [figureOfUser1, setFigureOfUser1] = useState("circle");

  const [nameOfUser2, setNameOfUser2] = useState("player2");
  const [colorOfUser2, setColorOfUser2] = useState("blue");
  const [figureOfUser2, setFigureOfUser2] = useState("x");

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

  useEffect(() => {
    setIsLoggedOut(!(user1 && user2));
  }, [user1, user2]);

  useEffect(() => {
    if (!isLoggedOut) {
      setTimeout(() => {
        setsectionHeight("0");
      }, 1000);
    } else {
      setsectionHeight("auto");
    }
  }, [isLoggedOut]);

  const handleLoginPlayer1 = (email, password) => {
    login(email, password).then((userData1) => setUser1(userData1));
  };

  const handleLoginPlayer2 = (email, password) => {
    login(email, password).then((userData2) => setUser2(userData2));
  };

  const handleLogoutPlayer1 = () => {
    logOut(user1).then(() => setUser1(null));
  };

  const handleLogoutPlayer2 = () => {
    logOut(user2).then(() => setUser2(null));
  };

  useEffect(() => {
    setIsDisabled(!user1 || !user2);
  }, [user1, user2]);

  return (
    <div className="Main">
      <div className="container">
        {isLoggedOut && (
          <div
            className={`row ${!isLoggedOut ? "hide" : ""}`}
            style={{ height: sectionHeight }}
          >
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
                  onLogoutPlayer={handleLogoutPlayer1}
                  onNameChange={onNameChangeP1}
                  onColorChange={onColorChangeP1}
                  onFigureChange={onFigureChangeP1}
                />
              </>
            ) : (
              <Login
                onLoginPlayer={handleLoginPlayer1}
              />
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
                  onLogoutPlayer={handleLogoutPlayer2}
                  onNameChange={onNameChangeP2}
                  onColorChange={onColorChangeP2}
                  onFigureChange={onFigureChangeP2}
                />
              </>
            ) : (
              <Login onLoginPlayer={handleLoginPlayer2} />
            )}
          </div>
        </div>
        <hr />
        {isLoggedOut && (
          <div
            className={`row text-center collapse-section ${
              !isLoggedOut ? "hide" : ""
            }`}
            style={{ height: sectionHeight }}
          >
            <Link to="/registration">
              <span>Or you can </span>
              <h2>REGISTER HERE</h2>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
