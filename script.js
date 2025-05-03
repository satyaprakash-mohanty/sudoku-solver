const board = document.getElementById("sudoku-board");

function createBoard() {
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = "1";
      td.appendChild(input);
      tr.appendChild(td);
    }
    board.appendChild(tr);
  }
}

function getBoardValues() {
  const values = [];
  const inputs = board.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    const val = parseInt(inputs[i].value);
    values.push(isNaN(val) ? 0 : val);
  }
  return values;
}

function setBoardValues(values) {
  const inputs = board.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = values[i] !== 0 ? values[i] : '';
  }
}

function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num || 
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
      return false;
    }
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  let flatBoard = getBoardValues();
  let board = [];
  while (flatBoard.length) board.push(flatBoard.splice(0, 9));
  if (solve(board)) {
    setBoardValues(board.flat());
  } else {
    alert("No solution found!");
  }
}

createBoard();
