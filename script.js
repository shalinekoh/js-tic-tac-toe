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
            cell.setAttribute("id", "cell")
            cell.innerHTML = element;
            gameBoard.appendChild(cell)
        });
    }
    return {
        board,
        render,
    }
})();

const Game = (() => {
    const start = () => {
        console.log("Started!")
        player1 = createPlayers(player1Name.value, "X")
        player2 = createPlayers(player2Name.value, "O")
        Gameboard.render();
    }
    return {
        start
    }
})();

// Gameboard.render();
