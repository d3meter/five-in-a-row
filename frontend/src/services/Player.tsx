import { Component } from "react";
import gameOptions from "./gameOptions.json";

export interface PlayerState {
  number: number;
  name: string;
  email?: string;
  color: string;
  figure: string;
}

type GameOptions = {
  boardsizes: {
    options: number[];
    default: number;
  };
  figures: {
    options: string[];
    defaultP1: string;
    defaultP2: string;
  };
  colors: {
    options: string[];
    defaultP1: string;
    defaultP2: string;
  };
};

const gameOptionsData: GameOptions = gameOptions as GameOptions;

class Player extends Component<PlayerState> {
  constructor(props: PlayerState);
  constructor(number: number, email: string);
  constructor(propsOrNumber: PlayerState | number, email?: string) {
    super(propsOrNumber as PlayerState);

    if (typeof propsOrNumber === "number" && email) {
      const number = propsOrNumber;
      Player.createPlayer(number, email);
    }
  }

  static createPlayer(number: number, email: string): Player {
    let color = "";
    let figure = "";

    if (number === 1) {
      color = gameOptionsData.colors.defaultP1;
      figure = gameOptionsData.figures.defaultP1;
    }
    if (number === 2) {
      color = gameOptionsData.colors.defaultP2;
      figure = gameOptionsData.figures.defaultP2;
    }

    const initPlayerState: PlayerState = {
      number: number,
      name: `Player${number}`,
      email: email,
      color: color,
      figure: figure,
    };

    const player = new Player(initPlayerState);

    return player;
  }

  static updatePlayerData(
    number: number,
    name: string,
    color: string,
    figure: string
  ) {
    const newPlayerState: PlayerState = {
      number: number,
      name: name,
      color: color,
      figure: figure,
    };

    const currentPlayerState: PlayerState | null = JSON.parse(
      localStorage.getItem(`player${number}Data`) || "null"
    );

    if (currentPlayerState) {
      const updatePlayerState: PlayerState = {
        ...currentPlayerState,
        ...newPlayerState,
      };

      localStorage.setItem(
        `player${number}Data`,
        JSON.stringify(updatePlayerState)
      );
    }
  }
}

export default Player;
