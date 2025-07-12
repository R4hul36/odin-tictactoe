const gameBoard = (function () {
  const cells = ['', '', '', '', '', '', '', '', '']

  const updateCells = (symbol, position) => {
    if (cells[position].length) {
      return
    } else {
      return (cells[position] = symbol)
    }
  }

  const clearCells =() =>{
    cells = ['', '', '', '', '', '', '', '', '']
    return
  }
  return { cells, updateCells, clearCells }
})()

//

const player = function (symbol) {
  return { symbol }
}

const switchTurn = (function () {
  const currSymbol = (symbol) => {
    
    symbol = symbol === 'x' ? 'o' : 'x'

    return symbol
  }
  return { currSymbol }
})()

const player1 = player('x')
const player2 = player('o')

// console.log(switchTurn.currSymbol(player1))
console.log(switchTurn.currSymbol(player1))

const gameController = (function () {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const currentCells = gameBoard.cells

  const checkWinner = (currSymbol) => {
    let winner = false
    winningCombination.map((combo) => {
      const checkCombo = combo.every(
        (cell) => currentCells[cell] === currSymbol
      )
      if (checkCombo) {
        winner = true
      }
    })
    return winner
  }

  const checkDraw = () => {
    return currentCells.every((cell) => cell.length > 0)
  }

  return { checkWinner, checkDraw }
})()

console.log(gameController.checkWinner('x'))

// const player1 = player("x")
// const player2 = player('o')

// console.log(player1.symbol)
// console.log(player2.symbol);

// gameBoard.updateCells(player1.symbol, 2);

// console.log(gameController.checkWinner());

// gameBoard.updateCells(player2.symbol, 3);

// console.log(gameBoard.cells);


const domController = (function () {

  let symbol = "x"

  document.querySelectorAll(".game-cell").forEach((cell) => {
  cell.addEventListener('click', (e) => {
    if(e.target.textContent !== "") {
      return
    }
    e.target.textContent = symbol
    const index = Number(e.target.dataset.cell);
    console.log(index);
    gameBoard.updateCells(symbol, index)
    const winner = gameController.checkWinner(symbol)
    const isDraw = gameController.checkDraw();

    const resetDom = () => document.querySelectorAll('.game-cell').forEach(cell => cell.textContent = "");

    if(winner) {
      alert(`Player ${symbol} win!!`)
      resetDom()
      gameBoard.clearCells()
      return
    }else if(isDraw) {
      alert("The game is a draw!!")
    }
    symbol=switchTurn.currSymbol(symbol)
   
    console.log(gameBoard.cells);
    
    
  })
}
)
})()

