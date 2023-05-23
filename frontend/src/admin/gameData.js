let player1Data = {
 name: "player1",
 color: "red",
 figure: "circle"
};

let player2Data = {
 name: "player2",
 color: "blue",
 figure: "cross"
};

let boardSize = "10";

const updatePlayer1Data = (data) => {
 player1Data = { ...player1Data, ...data };
};

const updatePlayer2Data = (data) => {
 player2Data = { ...player2Data, ...data };
};

const updateBoardSize = (size) => {
 boardSize = size;
};

export { player1Data, player2Data, boardSize, updatePlayer1Data, updatePlayer2Data, updateBoardSize };