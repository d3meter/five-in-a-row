import React, { useState, useEffect } from "react";
import "./css/Header.css";
import { logOut } from "../admin/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import LoginPlayer1 from "./LoginPlayer1";
import LoginPlayer2 from "./LoginPlayer2";

function Header() {
  const [logState, setLogState] = useState("logged out");
  const [userLoggedin, setUserLoggedin] = useState("");
  const [showDropdownLeft, setShowDropdownLeft] = useState(false);
  const [showDropdownRight, setShowDropdownRight] = useState(false);

  showDropdownLeft || showDropdownRight
    ? disableBodyScroll(document)
    : enableBodyScroll(document);

  async function signOut() {
    await logOut();
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogState(`logged in`);
        setUserLoggedin(user.email);
      } else {
        setLogState(`logged out`);
        setUserLoggedin("");
      }
    });
  }, []);

  return (
    <>
      <div className="Header">
        <div className="section-left">
          <button onClick={() => setShowDropdownLeft((oldValue) => !oldValue)}>
            <h1>Player 1</h1>
          </button>
        </div>
        <div className="section-mid">menu</div>
        <div className="section-right">
          <button onClick={() => setShowDropdownRight((oldValue) => !oldValue)}>
            <h1>Player 2</h1>
          </button>
        </div>
        {/*       <div className="header-section3">
        {logState === "logged in" ? (
          <>
            <span className="material-icons md-36">verified_user</span>
            <h2>{userLoggedin}</h2>
            <button className="header-btn" onClick={signOut}>
              <span className="material-icons md-48">logout</span>
              <p>Logout</p>
            </button>
          </>
        ) : (
          <>
            <Link className="header-btn" to="/login">
              <span className="material-icons md-48">login</span>
              <p>Login</p>
            </Link>
          </>
        )}
      </div> */}
      </div>
      <div
        className="dropdown-menu dd-menu-left"
        style={{ display: showDropdownLeft ? "flex" : "none" }}
      >
        <nav className="menu-list">
          <LoginPlayer1 />
        </nav>
      </div>
      <div
        className="dropdown-menu dd-menu-right"
        style={{ display: showDropdownRight ? "flex" : "none" }}
      >
        <nav className="menu-list">
          <LoginPlayer2 />
        </nav>
      </div>
    </>
  );
}

export default Header;
