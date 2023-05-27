import React, { useState, useEffect } from "react";
import "./css/PlayerConfig.css";
import miniLoader from "../imgs/miniloader.gif";

function PlayerConfig({
  user,
  nameOfUser,
  colorOfUser,
  figureOfUser,
  onLogoutPlayer,
  onNameChange,
  onColorChange,
  onFigureChange,
  onStatusChange,
  isReadyUser,
  imgClassUser,
  imageSrcUser
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  const handleLogout = () => {
    onLogoutPlayer();
  };

  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  const handleColorChange = (event) => {
    onColorChange(event.target.value);
  };

  const handleFigureChange = (event) => {
    onFigureChange(event.target.value);
  };

  const handleStatusChange = () => {
    onStatusChange();
  };

  return (
    <div className="PlayerConfig">
      {isLoading ? (
        <div className="loader-container">
          <img className="mini-loader" src={miniLoader} alt="loading..." />
        </div>
      ) : (
        <>
          {imageSrcUser && (
            <img
              className={"figure " + imgClassUser}
              src={imageSrcUser}
              alt="figure"
            />
          )}
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <input
            onChange={handleNameChange}
            type="text"
            placeholder="name"
            value={nameOfUser}
          />
          <select
            onChange={handleFigureChange}
            name="figure"
            id="figure"
            value={figureOfUser}
          >
            <option value="triangle">Triangle</option>
            <option value="cross">Cross</option>
            <option value="circle">Circle</option>
            <option value="star">Star</option>
            <option value="square">Square</option>
          </select>
          <select
            onChange={handleColorChange}
            name="color"
            id="color"
            value={colorOfUser}
          >
            <option value="orange">orange</option>
            <option value="purple">purple</option>
            <option value="green">green</option>
            <option value="yellow">yellow</option>
            <option value="blue">blue</option>
            <option value="pink">pink</option>
            <option value="red">red</option>
          </select>
          <button
            style={{ backgroundColor: isReadyUser ? "green" : "" }}
            onClick={handleStatusChange}
          >
            Ready
          </button>
        </>
      )}
    </div>
  );
}

export default PlayerConfig;
