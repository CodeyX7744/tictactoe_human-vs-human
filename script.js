var origBoard;
const huPlayer1 = "O"
const huPlayer2 = "X"
let turnFlag = true;
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    turnFlag = true;
    for (var i=0; i<cells.length; i++) {

        cells[i].innerText = '';
        cells[i].style.fontSize = '85px';
        cells[i].style.fontWeight = 'bold';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
		if (turnFlag) {
            turn(square.target.id, huPlayer1);
            turnFlag = false;
           
	    } else if (!turnFlag && !checkWin(origBoard, huPlayer1)) {
            turn(square.target.id, huPlayer2);
            turnFlag = true;
            checkTie();
        }
    }

}
function checkWin(board,player) {
    let plays = board.reduce((a,e,i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    console.log("at checkWin:", (gameWon));
    for (let [index, win] of winCombos.entries()) {
       if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
       };
    }
    return gameWon;
}

function turn(squareId, player) {
   
    origBoard[squareId] = player;
    if (player == huPlayer1) {
         document.getElementById(squareId).style.color = 'rgb(82,147,240)';
    } else {
        document.getElementById(squareId).style.color = 'rgb(247,163,28)';
    }
    document.getElementById(squareId).innerText = player;
    
    gameWon = checkWin(origBoard, player);
    console.log("at turn:", (gameWon));
    if (gameWon) {
        
        gameOver(gameWon);
        console.log("at gameOver:", (gameWon));
   
    } else {
        checkTie();
        console.log("at checkTie:", (gameWon));
    }
}



function gameOver(gameWon) {

    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
        gameWon.player == huPlayer1 ? "blue" : "red";
    }

    for (var i=0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer1 ? "You win!" : "You loose.");

}


function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');

}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}







