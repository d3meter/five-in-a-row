import React, { useContext, useEffect, useState } from "react";
import "./css/Main.css";
import { Link } from "react-router-dom";
import UserContext from "../admin/UserContext";

function Main() {
  const { user1, user2 } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!user1 || !user2);
  }, [user1, user2]);

  return (
    <div className="Main">
      <div className="container">
        <h1>Welcome</h1>
        <Link to="/registration">Registration</Link>
      </div>
      <Link to="/game">
        <button disabled={isDisabled}>Play</button>
      </Link>
    </div>
  );
}

export default Main;
