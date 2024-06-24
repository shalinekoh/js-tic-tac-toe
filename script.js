startButton = document.querySelector("form button")
// player1Name = document.getElementById("player1")
// player2Name = document.getElementById("player2")
gameBoard = document.querySelector(".game-board")
container = document.querySelector("body");

startButton.addEventListener("click", (event) =>{
    event.preventDefault();
    Game.start();
})

const createPlayers = (mark) => {
    return {
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
            cell.style.color = "red";
            gameBoard.appendChild(cell);

            cell.addEventListener("click", Game.handleClick, {once: true})

            cell.addEventListener("mouseover", (event) => {
                if (event.target.innerHTML === '') {
                    event.target.innerHTML = Game.getCurrentPlayer();
                    event.target.style.color = "gray"; // Change color to distinguish hover effect
                }
            });

            cell.addEventListener("mouseout", (event) => {
                if (event.target.style.color === "gray") {
                    event.target.innerHTML = '';
                }
            });
        });
    }
    return {
        board,
        render,
    }
});

const Game = (() => {
    let player1Turn;
    let gameOverFlag;

    const start = () => {
        gameboard = Gameboard();
        player1 = createPlayers("X")
        player2 = createPlayers("O")
        player1Turn = true;
        gameOverFlag = false;
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
        if (gameOverFlag) return;
        gameOverFlag = true;
        startButton.disabled = true;
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
        restartBtn.id = "restartBtn"

        restartBtn.addEventListener("click", () => {
            container.removeChild(gameOverContainer);
            gameOverContainer.innerHTML = "";
            startButton.disabled = false;
        })

        // Add styles
        gameOverContainer.style.position = "absolute";
        gameOverContainer.style.top = "50%";
        gameOverContainer.style.left = "50%";
        gameOverContainer.style.transform = "translate(-50%, -50%)";
        gameOverContainer.style.textAlign = "center";
        gameOverContainer.style.color = "white";

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
                return true;
            }
        }
    }

    const checkDraw = () => {
        for(i=0; i<gameboard.board.length; i++){
            if (gameboard.board[i] == ''){
                return
            }
            }
        if (checkWin() != true){
            gameOver();
            resultText.innerHTML = "It's a draw."
        };
    }

    const getCurrentPlayer = () => {
        return player1Turn ? player1.mark : player2.mark;
    }

    const handleClick = (event) => {
        if (gameOverFlag) return;
        let cellClicked = parseInt(event.target.id.slice(-1));
        playerMark = getCurrentPlayer();
        addMove(playerMark, cellClicked);
        checkWin();
        checkDraw();
    }
    return {
        start,
        getCurrentPlayer,
        handleClick
    }
})();
