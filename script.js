startButton = document.querySelector("form button")
player1Name = document.getElementById("player1")
player2Name = document.getElementById("player2")
gameBoard = document.querySelector(".game-board")

startButton.addEventListener("click", (event) =>{
    event.preventDefault();
    Game.start();
})

const createPlayers = (name, mark) => {
    return {
        name,
        mark
    }
}

const Gameboard = (() => {
    board = ['X','O','','','','','','',''];

    const render = () => {

        board.forEach((element, index) => {
            cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("id", `cell${index}`);
            cell.innerHTML = element;
            gameBoard.appendChild(cell);

            cell.addEventListener("click", Game.handleClick, {once: true})
        });
    }
    return {
        board,
        render,
    }
})();

const Game = (() => {
    let player1Turn = true;
    const start = () => {
        console.log("Started!")
        player1 = createPlayers(player1Name.value, "X")
        player2 = createPlayers(player2Name.value, "O")
        Gameboard.render();
    }

    const addMove = (mark, index) => {
        Gameboard.board[index] = mark
        Gameboard.render();
    }

    const switchPlayerTurn = (player1Turn) => {
        return !player1Turn
    }

    const handleClick = (event) => {
        let cellClicked = parseInt(event.target.id.slice(-1));
        playerMark = player1Turn == true ? player1.mark : player2.mark
        addMove(playerMark, cellClicked);
        // checkWinCondition();
        switchPlayerTurn(player1Turn);
    }
    return {
        start,
        handleClick
    }
})();

// Gameboard.render();
