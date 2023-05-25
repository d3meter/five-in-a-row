import React, { useEffect, useState } from "react";
import "./css/Square.css";
import { player1Data, player2Data } from "../admin/gameData";
import circle from "../imgs/figures/circle.png";
import cross from "../imgs/figures/cross.png";
import square from "../imgs/figures/square.png";
import star from "../imgs/figures/star.png";
import triangle from "../imgs/figures/triangle.png";

function Square({
  playersTurn,
  handleChangePlayersTurn,
  handleSquareClick,
  isGameOver,
  isWinningElement,
  winningPlayerColor,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const onChangePlayersTurn = () => {
    handleChangePlayersTurn();
  };

  const handleClick = () => {
    if (!isGameOver) {
      onChangePlayersTurn();
      handleDisabled();
      handleImgSrc();
      handleSquareClick();
    }
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

  const handleDisabled = () => {
    setIsDisabled(true);
  };

  const buttonStyle = isDisabled || isGameOver
    ? { backgroundColor: "inherit", filter: "none", cursor: "default" }
    : {};

    const squareStyle = isWinningElement && isGameOver
    ? { backgroundColor: winningPlayerColor }
    : {};

  return (
    <button
      className="Square"
      onClick={handleClick}
      disabled={isDisabled}
      style={{ ...buttonStyle, ...squareStyle }}
    >
      {imageSrc && <img src={imageSrc} alt="figure" />}
    </button>
  );
}

export default Square;
