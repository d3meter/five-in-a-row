import { Component } from "react";

export interface BoardState {
  size: number;
}

class Board extends Component<BoardState> {
  state: BoardState = {
    size: 10,
  };

  static updateBoardSize(size: number) {
    localStorage.setItem("boardSize", JSON.stringify(size));
  }
}

export default Board;
