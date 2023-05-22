import React, { useContext, useEffect, useState } from "react";
import "./css/Main.css";
import { Link } from "react-router-dom";
import UserContext from "../admin/UserContext";
import LoginPlayer1 from "../components/LoginPlayer1";
import LoginPlayer2 from "../components/LoginPlayer2";

function Main() {
  const { user1, user2 } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!user1 || !user2);
  }, [user1, user2]);

  return (
    <div className="Main">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h1>Five in a Row (for 2 players)</h1>
            <span>In order to play, both players need to be logged in.</span>
          </div>
        </div>
        <hr />
        <div className="row gap-5 justify-content-center">
          <div className="col-md-5 col-lg-5">
            <LoginPlayer1 />
          </div>
          <div className="col-md-5 col-lg-5">
            <LoginPlayer2 />
          </div>
        </div>
        <hr />
        <div className="row text-center">
          <Link to="/registration">
            <span>Or you can </span>
            <h2>REGISTER HERE</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
