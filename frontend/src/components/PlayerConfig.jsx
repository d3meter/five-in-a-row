import React, { useEffect, useState } from "react";

function PlayerConfig({
  user,
  onLogoutPlayer,
  onNameChange,
  onColorChange,
  onFigureChange,
}) {

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

  return (
    <div>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <input onChange={handleNameChange} type="text" placeholder="name" />
      <select onChange={handleFigureChange} name="figure" id="figure">
        <option value="triangle">Triangle</option>
        <option value="x">X</option>
        <option value="circle">Cicle</option>
      </select>
      <select onChange={handleColorChange} name="color" id="color">
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="yellow">yellow</option>
      </select>
    </div>
  );
}

export default PlayerConfig;
