import { Component } from "react";
import gameOptions from "./gameOptions.json";

interface PlayerState {
  number: number;
  name: string;
  email?: string;
  color: string;
  figure: string;
}

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
    const colorKey = `defaultP${number}`;
    const figureKey = `defaultP${number}`;
    const color = gameOptions.colors[colorKey];
    const figure = gameOptions.figures[figureKey];

    const initPlayerState: PlayerState = {
      number: number,
      name: `player${number}`,
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
