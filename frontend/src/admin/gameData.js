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
 localStorage.setItem("player1Data", JSON.stringify(player1Data));
};

const updatePlayer2Data = (data) => {
 player2Data = { ...player2Data, ...data };
 localStorage.setItem("player2Data", JSON.stringify(player2Data));
};

const updateBoardSize = (size) => {
 boardSize = size;
 localStorage.setItem("boardSize", boardSize);
};

export { player1Data, player2Data, boardSize, updatePlayer1Data, updatePlayer2Data, updateBoardSize };