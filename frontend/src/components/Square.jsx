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
  resetSquare
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [figureColor, setFigureColor] = useState("");

  useEffect(() => {
    setIsDisabled(false);
    setImageSrc("");
    setFigureColor("");
  }, [resetSquare]);

  const onChangePlayersTurn = () => {
    handleChangePlayersTurn();
  };

  const handleClick = () => {
    if (!isGameOver) {
      handleImgSrc();
      handleFigureColor();
      onChangePlayersTurn();
      handleDisabled();
      handleSquareClick();
    }
  };

  const handleImgSrc = () => {
    if (playersTurn === player1Data.name) {
      setImageSrc(player1Figure);
    } else {
      setImageSrc(player2Figure);
    }
  };

  const handleFigureColor = () => {
    if (playersTurn === player1Data.name) {
      setFigureColor(player1Data.color);
    } else {
      setFigureColor(player2Data.color);
    }
  };

  const handleDisabled = () => {
    setIsDisabled(true);
  };

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
      style={{ ...buttonStyle, ...squareStyle }}
    >
      {imageSrc && (
        <img className={"figure-" + figureColor} src={imageSrc} alt="figure" />
      )}
    </button>
  );
}

export default Square;
