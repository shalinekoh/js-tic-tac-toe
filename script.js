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
})();

const Game = (() => {
    let player1Turn;
    const start = () => {
        player1 = createPlayers(player1Name.value, "X")
        player2 = createPlayers(player2Name.value, "O")
        player1Turn = true;
        Gameboard.render();
    }

    const addMove = (mark, index) => {
        if (Gameboard.board[index] != 'X' && Gameboard.board[index] != 'O'){
            Gameboard.board[index] = mark
            switchPlayerTurn();
            }
            Gameboard.render();

    }

    const switchPlayerTurn = () => {
        player1Turn = !player1Turn
    }
    // TODO
    const gameOver = (playerMark) => {
        // gameBoard.innerHTML = '';
        container.removeChild(gameBoard);
        gameOverContainer = document.createElement("div");
        container.appendChild(gameOverContainer)
        gameOverText = document.createElement("h3");
        gameOverContainer.appendChild(gameOverText);
        gameOverText.innerHTML = "GAME OVER."
        winningText = document.createElement("h2");
        gameOverContainer.appendChild(winningText);
        player = playerMark == "X" ? 1 : 2;
        winningText.innerHTML = `Player ${player} wins!`;
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
            if(Gameboard.board[a] === Gameboard.board[b] && Gameboard.board[a] === Gameboard.board[c] && Gameboard.board[a] != ''){
                gameOver(Gameboard.board[a]);
            }
        }
    }

    const handleClick = (event) => {
        let cellClicked = parseInt(event.target.id.slice(-1));
        playerMark = player1Turn ? player1.mark : player2.mark;
        addMove(playerMark, cellClicked);
        checkWin();

    }
    return {
        start,
        handleClick
    }
})();
