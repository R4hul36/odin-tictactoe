

const gameBoard = (function () {
  const cells = ["x", "", "", "x", "", "", "x", "", ""];
  
  const updateCells = (symbol, position) => {
    if(cells[position].length){
      return
    }else {
      return cells[position] = symbol
    }
    
  }
  return {cells, updateCells}

})() 



// 

// gameBoard.updateCells("o", 2);

// console.log(gameBoard.cells);

const player = function (symbol) {
  return {symbol}
}

const gameController = (function () {

  const winningCombination = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
  const currentCells = gameBoard.cells

  const checkWinner = (currSymbol) => {
    let winner = "none";
    winningCombination.map((combo) => {
      const checkCombo = combo.every((cell) => currentCells[cell] === currSymbol)
      if(checkCombo) {
        winner = currSymbol;
      }
    }
    )
    return winner;
  }

  return {checkWinner}
})()

console.log(gameController.checkWinner('x'));



// const player1 = player("x")
// const player2 = player('o')

// console.log(player1.symbol)
// console.log(player2.symbol);

// gameBoard.updateCells(player1.symbol, 2);

// console.log(gameController.checkWinner());

// gameBoard.updateCells(player2.symbol, 3);

// console.log(gameBoard.cells);