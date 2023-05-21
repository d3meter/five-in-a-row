import React, { useState, useEffect } from "react";
import "./css/Header.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import LoginPlayer1 from "./LoginPlayer1";
import LoginPlayer2 from "./LoginPlayer2";
import { login, logOut } from "../admin/auth";
import UserContext from "../admin/UserContext";

function Header() {
  const [showDropdownLeft, setShowDropdownLeft] = useState(false);
  const [showDropdownRight, setShowDropdownRight] = useState(false);
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);

  showDropdownLeft || showDropdownRight
    ? disableBodyScroll(document)
    : enableBodyScroll(document);

  const handleLoginPlayer1 = (email, password) => {
    login(email, password).then((userData1) => setUser1(userData1));
  };

  const handleLoginPlayer2 = (email, password) => {
    login(email, password).then((userData2) => setUser2(userData2));
  };

  const handleLogoutPlayer1 = () => {
    logOut().then(() => setUser1(null));
  };

  const handleLogoutPlayer2 = () => {
    logOut().then(() => setUser2(null));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user1 && user1.email === user.email) {
          setUser1(user);
        }
        if (user2 && user2.email === user.email) {
          setUser2(user);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user1, user2]);

  return (
    <UserContext.Provider value={{ user1, user2 }}>
      <div className="Header">
        <div className="section-left">
          <button onClick={() => setShowDropdownLeft((oldValue) => !oldValue)}>
            <h1>Player 1 {user1 && `(${user1.email})`}</h1>
          </button>
        </div>
        <div className="section-right">
          <button onClick={() => setShowDropdownRight((oldValue) => !oldValue)}>
            <h1>Player 2 {user2 && `(${user2.email})`}</h1>
          </button>
        </div>
      </div>
      <div
        className="dropdown-menu dd-menu-left"
        style={{ display: showDropdownLeft ? "flex" : "none" }}
      >
        <nav className="menu-list">
          <LoginPlayer1
            user1={user1}
            onLoginPlayer1={handleLoginPlayer1}
            onLogoutPlayer1={handleLogoutPlayer1}
          />
        </nav>
      </div>
      <div
        className="dropdown-menu dd-menu-right"
        style={{ display: showDropdownRight ? "flex" : "none" }}
      >
        <nav className="menu-list">
          <LoginPlayer2
            user2={user2}
            onLoginPlayer2={handleLoginPlayer2}
            onLogoutPlayer2={handleLogoutPlayer2}
          />
        </nav>
      </div>
    </UserContext.Provider>
  );
}

export default Header;
