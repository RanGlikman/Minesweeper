'use strict'

// <script src="js/utils.js"></script>



function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomEmptyCellPosition() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            if (!cell.gameElement && cell.type === FLOOR) {
                emptyCells.push({ i, j })
            }
        }
    }

    if (!emptyCells.length) return null

    const randIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[randIdx]
}

// get diagonal
function printPrimaryDiagonal(mat) {
    for (var d = 0; d < mat.length; d++) {
        var currItem = mat[d][d]
        console.log(currItem)
    }
}
// get diagonal
function printScondaryDiagonal(mat) {
    for (var d = 0; d < mat.length; d++) {
        var currItem = mat[d][mat.length - d - 1]
        console.log(currItem)
    }
}

// get random item from array
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

//create matrix
function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

// random 
function getRandomInt(min, max) {
    var diff = max - min
    var res = Math.floor(Math.random() * diff + min)
    return res
}

// Timers
function updateTimer() {
    const currentTime = new Date().getTime()
    const elapsedTime = (currentTime - gStartTime) / 1000
    document.querySelector('.timer').innerText = elapsedTime.toFixed(3)
}

function startTimer() {
    gStartTime = new Date().getTime()
    gInterval = setInterval(updateTimer, 37)
}

function stopTimer() {
    clearInterval(gInterval)
}



function countAvailableSeatsAround(board, rowIdx, colIdx) {
    var count = 0;
    // Start looping from one row before the current row to one row after
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        // Skip if the row index is out of bounds (less than 0 or greater than the last index)
        if (i < 0 || i >= board.length) continue;

        // Start looping from one column before the current column to one column after
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // Skip the iteration if it's the current cell itself
            if (i === rowIdx && j === colIdx) continue;
            // Skip if the column index is out of bounds (less than 0 or greater than the last index)
            if (j < 0 || j >= board[i].length) continue;

            // Get the current cell object from the board
            var currCell = board[i][j];

            // Check if the current cell is a seat and it is not booked
            if (currCell.isSeat && !currCell.isBooked) {
                // If so, increment the count
                count++;
            }
        }
    }
    // Return the total count of available seats around the given cell
    return count;
}
