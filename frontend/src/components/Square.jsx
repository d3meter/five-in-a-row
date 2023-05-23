import React, { useEffect, useState } from "react";
import "./css/Square.css";
import { player1Data, player2Data } from "../admin/gameData";
import circle from "../imgs/figures/circle.png";
import cross from "../imgs/figures/cross.png";
import square from "../imgs/figures/square.png";
import star from "../imgs/figures/star.png";
import triangle from "../imgs/figures/triangle.png";

function Square({ playersTurn, handleChangePlayersTurn }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const onChangePlayersTurn = () => {
    handleChangePlayersTurn();
  };

  const handleClick = () => {
    onChangePlayersTurn();
    handleDisabled();
    handleImgSrc();
    //change background to figure
    //add value 1 or 2
  };

  const figureImages = {
    circle,
    cross,
    square,
    star,
    triangle,
  };

  const handleImgSrc = () => {
    if (playersTurn === player1Data.name) {
      const p1Figure = player1Data.figure;
      setImageSrc(figureImages[p1Figure]);
    } else {
     const p2Figure = player2Data.figure;
      setImageSrc(figureImages[p2Figure]);
    }
  };

  const handleMouseEnter = (event) => {
    if (playersTurn === player1Data.name) {
      event.target.style.backgroundColor = player1Data.color;
      event.target.style.filter = "opacity(0.2)";
    } else {
      event.target.style.backgroundColor = player2Data.color;
      event.target.style.filter = "opacity(0.2)";
    }
  };

  const handleDisabled = () => {
    setIsDisabled(true);
  };

  const handleClearStyles = (event) => {
    event.target.style.backgroundColor = "inherit";
    event.target.style.filter = "none";
  };

  const buttonStyle = isDisabled
    ? { backgroundColor: "inherit", filter: "none" }
    : {};

  return (
    <button
      className="Square"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleClearStyles}
      onClick={handleClick}
      disabled={isDisabled}
      style={buttonStyle}
    >
      {imageSrc && <img src={imageSrc} alt="figure" />}
    </button>
  );
}

export default Square;
