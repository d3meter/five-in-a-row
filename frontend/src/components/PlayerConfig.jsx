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
  imageSrcUser,
  errorMessage,
  setErrorMessagePlayer
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  const handleLogout = () => {
    onLogoutPlayer();
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    onNameChange(newName);
    setIsNameValid(newName.trim().length >= 3);
  };

  const handleColorChange = (event) => {
    onColorChange(event.target.value);
    setErrorMessagePlayer(null);
  };

  const handleFigureChange = (event) => {
    onFigureChange(event.target.value);
    setErrorMessagePlayer(null);
  };

  const handleStatusChange = () => {
    if (isNameValid) {
      onStatusChange();
    }
  };

  return (
    <div className="PlayerConfig container">
      {isLoading ? (
        <div className="loader-container">
          <img className="mini-loader" src={miniLoader} alt="loading..." />
        </div>
      ) : (
        <>
          <h1 className="text-center">{isNameValid ? nameOfUser : "..."}</h1>
          <div className="row gap-2 d-flex justify-content-center">
            <div className="row text-center">
              <p className="m-0">{user.email}</p>
            </div>
            <div className="figure-container row justify-content-center">
              {imageSrcUser && (
                <img
                  className={"figure " + imgClassUser}
                  src={imageSrcUser}
                  alt="figure"
                />
              )}
            </div>
            <form className="px-4 pt-2 d-flex flex-column gap-2">
              <div className="form-group row ">
                <label for="name" class="col-sm-4 col-form-label">
                  Name:
                </label>
                <div className="col-sm-8">
                  <input
                    className={`custom-input w-100 ${
                      !isNameValid ? "is-invalid" : ""
                    }`}
                    onChange={handleNameChange}
                    type="text"
                    placeholder="name"
                    id="name"
                    value={nameOfUser}
                    maxLength={8}
                    minLength={3}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="figure" class="col-sm-4 col-form-label">
                  Figure:
                </label>
                <div className="col-sm-8">
                  <select
                    className="custom-select"
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
                </div>
              </div>
              <div className="form-group row">
                <label for="color" class="col-sm-4 col-form-label">
                  Color:
                </label>
                <div className="col-sm-8">
                  <select
                    className="custom-select"
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
              </div>
            </form>
          </div>
          <hr />
          <div className="w-40 d-flex justify-content-center">
            <button
              className={
                isReadyUser ? "btn btn-warning px-4" : "btn btn-secondary px-4"
              }
              onClick={handleStatusChange}
            >
              READY
            </button>
          </div>
          {(!isNameValid || errorMessage) && (
            <p className="text-danger text-center py-2">
              {isNameValid ? errorMessage : "Invalid name format!"}
            </p>
          )}
          <button className="logout-btn btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default PlayerConfig;
