let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;

let playerOPoints = 0;
let playerXPoints = 0;

//               0,  1,  2,  3,  4,  5,  6,  7,   8
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells;

let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let gameOver = false;

let playerOPointsElement = document.getElementById("player-o-score");
let playerXPointsElement = document.getElementById("player-x-score");
let resetScoresButton = document.getElementById("score-reset-button");
let restartGameButton = document.getElementById("game-restart-button");
let resetGameButton = document.getElementById("game-reset-button");

window.onload = function(){
    gameCells = this.document.getElementsByClassName("game-cell");
    for (let cell of gameCells) {
        cell.addEventListener("click", placeCell);
    }
    restartGameButton.addEventListener("click", restartGame);
    resetScoresButton.addEventListener("click", resetPoints);
    resetGameButton.addEventListener("click", resetGame);

}

function placeCell() {

    if(gameOver){
        return;
    }

    const index = parseInt(this.getAttribute("data-cell-index"));

    if(gameBoard[index] != "") {
        return;
    }

    this.innerText = currentPlayer;
    gameBoard[index] = currentPlayer;

    //change players
    currentPlayer = (currentPlayer == playerO) ? playerX : playerO;

    //check winner
    checkWinner();
}

function checkWinner() {
    for (let winCondition of winningConditions) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if(a==b&&b==c&&a!=""){
            //update styiling of winning cells
            for(let i = 0; i < gameBoard.length; i++) {
                if (winCondition.includes(i)) {
                    gameCells[i].classList.add("winning-game-cell");
                }
        }
        gameOver = true;
        updatePoints();

        setTimeout(restartGame, 1000);
        return;
    }

    if (!gameBoard.includes("")) {
        gameOver = true;
        setTimeout(restartGame, 1000);
    }
}

}
function restartGame() {
    gameOver = false;
    currentPlayer = playerO;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("winning-game-cell");
    }

}

function updatePoints() {
    if (currentPlayer == playerO) {
        playerXPoints++;
        playerXPointsElement.innerText = "Player X: " + playerXPoints;
    }
    else {
        playerOPoints++;
        playerOPointsElement.innerText = "Player O: " + playerOPoints;
    }
}

function resetPoints() {
    playerOPoints = 0;
    playerXPoints = 0;
    playerOPointsElement.innerText = "Player O: " + playerOPoints;
    playerXPointsElement.innerText = "Player X: " + playerXPoints;
}

function resetGame() {
    restartGame();
    resetPoints();
}