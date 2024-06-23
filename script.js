startButton = document.querySelector("form button")
player1Name = document.getElementById("player1")
player2Name = document.getElementById("player2")
gameBoard = document.querySelector(".game-board")
container = document.querySelector("body");

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
    board = ['','','','','','','','',''];

    const render = () => {
        gameBoard.innerHTML = '';
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
});

const Game = (() => {
    let player1Turn;
    const start = () => {
        gameboard = Gameboard();
        player1 = createPlayers(player1Name.value, "X")
        player2 = createPlayers(player2Name.value, "O")
        player1Turn = true;
        gameboard.render();
    }

    const addMove = (mark, index) => {
        if (gameboard.board[index] != 'X' && gameboard.board[index] != 'O'){
            gameboard.board[index] = mark
            switchPlayerTurn();
            }
            gameboard.render();

    }

    const switchPlayerTurn = () => {
        player1Turn = !player1Turn
    }

    const gameOver = () => {
        gameBoard.innerHTML = "";
        gameOverContainer = document.createElement("div");
        container.appendChild(gameOverContainer)
        gameOverText = document.createElement("h3");
        gameOverContainer.appendChild(gameOverText);
        gameOverText.innerHTML = "GAME OVER."
        resultText = document.createElement("h2");
        gameOverContainer.appendChild(resultText);
        restartBtn = document.createElement("button");
        gameOverContainer.appendChild(restartBtn);
        restartBtn.innerHTML = "Restart"

        restartBtn.addEventListener("click", () => {
            container.removeChild(gameOverContainer);
            gameOverContainer.innerHTML = "";
            console.log("RESTART")
        })
    }

    const checkWin = () => {
        const winningCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]]
        for(i=0; i<winningCombo.length; i++){
            const [a,b,c] = winningCombo[i];
            if(gameboard.board[a] === gameboard.board[b] && gameboard.board[a] === gameboard.board[c] && gameboard.board[a] != ''){
                gameOver();
                player = gameboard.board[a] == "X" ? 1 : 2;
                resultText.innerHTML = `Player ${player} wins!`;
            }
        }
    }

    const checkDraw = () => {
        for(i=0; i<gameboard.board.length; i++){
            if (gameboard.board[i] == ''){
                return
            }
            }
        gameOver();
        resultText.innerHTML = "It's a draw."
    }


    const handleClick = (event) => {
        let cellClicked = parseInt(event.target.id.slice(-1));
        playerMark = player1Turn ? player1.mark : player2.mark;
        addMove(playerMark, cellClicked);
        checkWin();
        checkDraw();
    }
    return {
        start,
        handleClick
    }
})();
