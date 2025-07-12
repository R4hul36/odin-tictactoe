const gameBoard = (function () {
  const cells = ['', '', '', '', '', '', '', '', '']

  const updateCells = (symbol, position) => {
    if (cells[position].length) {
      return
    } else {
      return (cells[position] = symbol)
    }
  }

  const resetBoard = () => {
    return cells.forEach((cell, index) => (cells[index] = ''))
  }

  return { cells, updateCells, resetBoard }
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

const domController = (function () {
  let symbol = 'x'

  const resetDom = () =>
    document
      .querySelectorAll('.game-cell')
      .forEach((cell) => (cell.textContent = ''))

  document.querySelectorAll('.game-cell').forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (e.target.textContent !== '') {
        return
      }

      e.target.textContent = symbol
      const index = Number(e.target.dataset.cell)
      console.log(index)
      gameBoard.updateCells(symbol, index)
      let winner = gameController.checkWinner(symbol)
      console.log(winner)

      const isDraw = gameController.checkDraw()

      if (winner) {
        alert(`Player ${symbol} win!!`)
        resetDom()
        gameBoard.resetBoard()
        console.log(gameBoard.cells)
        return
      } else if (isDraw) {
        alert('The game is a draw!!')
      }
      symbol = switchTurn.currSymbol(symbol)

      console.log(gameBoard.cells)
    })
  })
})()
