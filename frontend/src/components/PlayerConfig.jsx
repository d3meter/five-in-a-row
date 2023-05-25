import React from "react";

function PlayerConfig({
  user,
  nameOfUser,
  colorOfUser,
  figureOfUser,
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
    </div>
  );
}

export default PlayerConfig;
