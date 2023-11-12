//! PHASE 1  - CORRECT NUMBERS - DONE
/////todo make a table of 16 squares
/////todo put 2 mines on the board (fixed location, later do it randomly)
/////todo each square contains the number of mine around it (0-8)

//! PHASE 2 - PLAYING
//todo make all cell hidden in the beginning of the game
//todo clicking on a cell reveals surrounding neighbor cell that aren't mine.
//todo if the cell is 0, it goes beyond it, until it reaches a cell which is > 0
//todo each mine revealed drops the lives counter by 1 (starts from 3)
//todo clicking on a mine when live > 0 only reveals its cell, and not its neighbors
//todo clicking on a mine when live = 0 only reveals all mines, and not its neighbors
//todo each time the reveal function is called, the function to check lives is also called. >>>>> if lives=0 then isGameOver
//todo if isGameOver the user cannot reveal any more cell, shows game over modal with restart button change all disarmed mines icons from 💣 to 💥
//todo if isGameOver shows game over modal with restart button
//todo if isGameOver change all disarmed mines icons from 💣 to 💥

//! PHASE 3 - OPTIONS AND TUNING
/////todo options to bigger boards
/////todo mines are put randomly on board
//todo clicking on a mine for the 1st time never detonates it. maybe perform the action to place the mines randomly only after the 1st click?

//! PHASE 4 - DESIGNING
//todo each number shall have a different color of danger indication
//todo upon beating the game, change all disarmed mines icons from 💣 to 🚩
//todo better design overall

//! PHASE 5 - BONUSES
//todo kick ass :)

/* -------------------------------------------------------------------------- */

"use strict";

const MINE = "💣";
const EMPTY = "";
const size = 6;
const board = [];
var lives = 3;
var isGameOver = false;

var randoms = [];

function buildBoard() {
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      board[i][j] = EMPTY;
    }
    console.log('Board built:', board);
  }

  function puttingMinesInRandomCells() {
    for (let i = 0; i < size; i++) {
      const randomLocationi = getRandomIntInclusive(0, size - 1);
      const randomLocationj = getRandomIntInclusive(0, size - 1);
      if (board[randomLocationi][randomLocationj] !== MINE)
        board[randomLocationi][randomLocationj] = MINE;
      else {
        i--;
      }
    }
    console.log(randoms);
  }

  puttingMinesInRandomCells();

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] !== MINE) {
        board[i][j] = countingMines(i, j);
      }
    }
  }
  console.log('Mines placed:', board);
  return board;
}

function countingMines(rowIdx, colIdx) {
  let count = 0;
  for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
    for (let j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i >= 0 && i < size && j >= 0 && j < size) {
        if (board[i][j] === MINE) {
          count++;
        }
      }
    }
  }
  return count;
}

function renderBoard(board) {
  let strHTML = '';
  for (let i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (let j = 0; j < board[i].length; j++) {
      strHTML += `<td class="cell cell-${i}-${j}" onclick="cellClicked(this)">${board[i][j]}</td>`;
    }
    strHTML += '</tr>';
  }
  const elTable = document.querySelector('.board');
  elTable.innerHTML = strHTML;
}

function cellClicked(cellElement, row, col){
  let strHTML = '';
  console.log(`Cell clicked: [${row}, ${col}]`, cellElement);
  console.log('HTML for board:', strHTML);
  // cellElement.classList.remove('hidden-content')
  cellElement.classList.add("revealed")
  console.log('HTML for board:', strHTML);
}


const myBoard = buildBoard();
renderBoard(myBoard);
console.log('Render board called');
