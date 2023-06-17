// Players data and board size handling: default values, local storage operations

/* let player1Data = {
 name: "Player1",
 color: "red",
 figure: "circle"
};

let player2Data = {
 name: "Player2",
 color: "blue",
 figure: "cross"
}; */


/* const updatePlayer1Data = (data) => {
 player1Data = { ...player1Data, ...data };
 localStorage.setItem("player1Data", JSON.stringify(player1Data));
};

const updatePlayer2Data = (data) => {
 player2Data = { ...player2Data, ...data };
 localStorage.setItem("player2Data", JSON.stringify(player2Data));
}; */
export let boardSize = "10";

export const updateBoardSize = (size) => {
 boardSize = size;
 localStorage.setItem("boardSize", boardSize);
};