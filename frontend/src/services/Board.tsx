import { Component } from "react";

interface BoardState {
  size: number;
}

class Board extends Component<BoardState> {
  state: BoardState = {
    size: 10,
  };
}

export default Board;
