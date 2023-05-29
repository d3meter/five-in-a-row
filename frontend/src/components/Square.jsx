import React, { useState, useEffect } from "react";
import "./css/Square.css";

function Square({
  playersTurn,
  handleChangePlayersTurn,
  handleSquareClick,
  isGameOver,
  isWinningElement,
  player1Data,
  player2Data,
  player1Figure,
  player2Figure,
  resetSquare,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [figureColor, setFigureColor] = useState("");

  //Reset single square
  useEffect(() => {
    setIsDisabled(false);
    setImageSrc("");
    setFigureColor("");
  }, [resetSquare]);

  const onChangePlayersTurn = () => {
    handleChangePlayersTurn();
  };

  // Fill/modify single square and call each necessary function after clicking 
  const handleClick = () => {
    if (!isGameOver) {
      handleImgSrc();
      handleFigureColor();
      onChangePlayersTurn();
      handleDisabled();
      handleSquareClick();
    }
  };

  // Handle the source of inserted figure depending on the player
  const handleImgSrc = () => {
    if (playersTurn === player1Data.name) {
      setImageSrc(player1Figure);
    } else {
      setImageSrc(player2Figure);
    }
  };

  // Handle the figure/player color depending on the player
  const handleFigureColor = () => {
    if (playersTurn === player1Data.name) {
      setFigureColor(player1Data.color);
    } else {
      setFigureColor(player2Data.color);
    }
  };

  // Disable single square
  const handleDisabled = () => {
    setIsDisabled(true);
  };

  // Dynamically changing button and square styles depending on their states
  const buttonStyle =
    isDisabled || isGameOver
      ? { backgroundColor: "inherit", filter: "none", cursor: "default" }
      : {};

  const squareStyle =
    isWinningElement && isGameOver ? { backgroundColor: "#534341" } : {};

  return (
    <button
      className="Square"
      onClick={handleClick}
      disabled={isDisabled}
      style={{
        ...buttonStyle,
        ...squareStyle,
      }}
    >
      {imageSrc && (
        <img className={"figure-" + figureColor} src={imageSrc} alt="figure" />
      )}
    </button>
  );
}

export default Square;
