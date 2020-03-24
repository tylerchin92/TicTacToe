const game = (() => {
    const player1Submit = document.getElementById('player1-submit');
    const player1Name = document.getElementById('player1-name');
    const player1Display = document.getElementById('player1-display');
    const player1Mark = document.getElementById('player1-mark');
    const player1Score = document.getElementById('player1-score');
    const player1Num = document.getElementById('player1-num');
    
    const compSelect = document.getElementById('computer-btn');
    const compDisplay = document.getElementById('computer-display');

    const player2Submit = document.getElementById('player2-submit');
    const player2Select = document.getElementById('player2-btn');
    const player2Name = document.getElementById('player2-name');
    const player2Display = document.getElementById('player2-display');
    const player2Mark = document.getElementById('player2-mark');
    const player2Score = document.getElementById('player2-score');
    const player2Num = document.getElementById('player2-num');

    player1Ready = false;
    player2Ready = false;
    computerPlay = false;
    



    player1Submit.addEventListener('click', function () {
        const player1 = player(player1Name.value);
        gameboard.players.push(player1.name);
        player1Name.style.display = 'none';
        this.style.display = 'none';
        player1Display.innerHTML = player1.name;
        player1Display.style.display = 'block';
        player1Mark.style.display = 'block';
        player1Score.style.display = 'block';
        player1Num.style.display = 'block';
        player1Name.value = '';
        player1Ready = true;
    });

    compSelect.addEventListener('click', function () {
        const playerComp = player('Computer');
        gameboard.players.push(playerComp.name);
        this.style.display = 'none';
        player2Select.style.display = 'none';
        compDisplay.style.display = 'block';
        player2Mark.style.display = 'block';
        player2Score.style.display = 'block';
        player2Num.style.display = 'block';
        player2Ready = true;
        computerPlay = true;

    });

    player2Select.addEventListener('click', function () {
        this.style.display = 'none';
        compSelect.style.display = 'none';
        player2Name.style.display = 'block';
        player2Submit.style.display = 'inline-block';

    })

    player2Submit.addEventListener('click', function () {
        const player2 = player(player2Name.value);
        gameboard.players.push(player2.name);
        this.style.display = 'none';
        compSelect.style.display = 'none';
        player2Name.style.display = 'none';
        player2Display.innerHTML = player2.name;
        player2Display.style.display = 'block';
        player2Mark.style.display = 'block';
        player2Score.style.display = 'block';
        player2Num.style.display = 'block';
        player2Name.value = '';
        player2Ready = true;
    })



    return {player1Ready, player2Ready,player1Num, player2Num, player1, player2, computerPlay};
})();

const gameboard = (() => {
    const board = document.getElementById('gameboard');
    const squares = document.getElementsByClassName('squares');
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const boardArray = [row1, row2, row3];
    const players = [];
    let compPlayArray = [0,1,2,3,4,5,6,7,8];
    let playerTurn = true;
    game.player1Num.textContent = 0
    game.player2Num.textContent = 0
    

    function createRows (start,end,rowArray) {
        for (i=start; i<end; i++) {
            const grid = document.createElement('div');
            grid.classList.add('squares');
            grid.id = `square${i+1}`
            board.appendChild(grid);
            rowArray[i-start] = document.getElementById(`square${i+1}`).innerHTML;
        }
    }

    function updateRows (start,end,row) {
        for (i=start; i<end; i++) {
            row[i-start] = document.getElementById(`square${i+1}`).innerHTML;
        }
    }

    function rowWinCondition (row, playerName, playerMark) {
        if (row.every(value => value == playerMark)) {
            alert(`${playerName} Wins!`)
            if (playerMark == 'O') {
                game.player2Num.textContent++
            } else {
                game.player1Num.textContent++
            }
            board.innerHTML = '';
            compPlayArray = [0,1,2,3,4,5,6,7,8];
            newBoard();
        }
    }

    function colWinCondition (col, playerName, playerMark) {
        colScore = 0;
        for(i=0; i<boardArray.length; i++) {
            if (boardArray[i][col] == playerMark) {
                colScore++
                if (colScore == 3) {
                    alert(`${playerName} Wins!`);
                    if (playerMark == 'O') {
                        game.player2Num.textContent++
                    } else {
                        game.player1Num.textContent++
                    }
                    board.innerHTML = '';
                    compPlayArray = [0,1,2,3,4,5,6,7,8];
                    newBoard();
                }
            }
        }
    }

    function diagonalWinCondition (playerName, playerMark) {
        diagScore1 = 0;
        diagScore2 = 0;
        for(i=0; i<3; i++) {
            if (boardArray[i][i] == playerMark) {
                diagScore1++;
                if (diagScore1 == 3) {
                    alert(`${playerName} Wins!`);
                    if (playerMark == 'O') {
                        game.player2Num.textContent++
                    } else {
                        game.player1Num.textContent++
                    }
                    board.innerHTML = '';
                    compPlayArray = [0,1,2,3,4,5,6,7,8];
                    newBoard();
                    break;
                }
            }
            if (boardArray[i][2-i] == playerMark) {
                diagScore2++;
                if (diagScore2 == 3) {
                    alert(`${playerName} Wins!`)
                    if (playerMark == 'O') {
                        game.player2Num.textContent++
                    } else {
                        game.player1Num.textContent++
                    }
                    board.innerHTML = '';
                    compPlayArray = [0,1,2,3,4,5,6,7,8];
                    newBoard();
                }
            }
        }

    }

    newBoard = () => {

        createRows(0,3,row1);
        createRows(3,6,row2);
        createRows(6,9,row3);

        for (i=0; i < squares.length; i++) {
            squares[i].style.height = `${(800-30)/3}px`;
            squares[i].style.width = `${(800-30)/3}px`;
            squares[i].onclick = (function (index) {
                return function () {
                    if (player1Ready && player2Ready) {
                        if (!this.innerHTML && playerTurn){
                            if (computerPlay) {
                                    delete compPlayArray[index];
                                    availableMoves = compPlayArray.filter(function(element) {
                                        if (element !== null) return element;
                                    });
                                    let compMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
                                    delete compPlayArray[compMove];
                                    this.innerHTML = 'X';
                                    if (compPlayArray.every((value) => value == null)) {   
                                    } else {
                                    document.getElementById(`square${compMove+1}`).innerHTML = 'O';
                                    }
                            } else {
                                this.innerHTML = 'X';
                                playerTurn = false;
                            }
                        } else if (!this.innerHTML && !playerTurn) {
                            this.innerHTML = 'O'
                            playerTurn = true;
                        }
                    }
                    updateRows(0,3,row1);
                    updateRows(3,6,row2);
                    updateRows(6,9,row3);

                    rowWinCondition(row1, players[0], 'X');
                    rowWinCondition(row2, players[0], 'X');
                    rowWinCondition(row3, players[0], 'X');

                    rowWinCondition(row1, players[1], 'O');
                    rowWinCondition(row2, players[1], 'O');
                    rowWinCondition(row3, players[1], 'O');

                    colWinCondition(0, players[0], 'X');
                    colWinCondition(1, players[0], 'X');
                    colWinCondition(2, players[0], 'X');

                    colWinCondition(0, players[1], 'O');
                    colWinCondition(1, players[1], 'O');
                    colWinCondition(2, players[1], 'O');

                    diagonalWinCondition(players[0], 'X');

                    diagonalWinCondition(players[1], 'O')
                }
            })(i);
            
        }

    }
    newBoard();
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', function () {
        board.innerHTML = '';
        newBoard()});
    return {row1, row2, row3, boardArray, players, compPlayArray}
    
})();


const player = (name) => {
    return {name};
};
