import React from "react";
import "./css/Main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="Main">
      <div className="container">
        <h1>Welcome</h1>
        <Link to="/registration">Registration</Link>
      </div>
    </div>
  );
}

export default Main;
