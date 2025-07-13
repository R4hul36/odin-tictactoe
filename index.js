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
    symbol = symbol === 'X' ? 'O' : 'X'

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
    let winningCombo;
    winningCombination.map((combo) => {
      const checkCombo = combo.every(
        (cell) => currentCells[cell] === currSymbol
      )
      if (checkCombo) {
        winner = true
        winningCombo = combo;
      }
    })
    return {winner, winningCombo}
  }

  const checkDraw = () => {
    return currentCells.every((cell) => cell.length > 0)
  }

  return { checkWinner, checkDraw }
})()

const domController = (function () {
  let symbol = 'X'
  let gameActive = true;

  let gameMessage = document.createElement('p');
  gameMessage.style.color = "#d8ab8a"
  gameMessage.style.marginTop = "20px"

  const resetDom = () =>
    document
      .querySelectorAll('.game-cell')
      .forEach((cell) => {
        cell.textContent = ''
        cell.classList.remove('win')
        gameMessage.textContent = ""
      
      })

  document.querySelectorAll('.game-cell').forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (!gameActive || e.target.textContent !== '') {
        return
      }

      const playerSymbol = document.createElement('p')
      playerSymbol.textContent = symbol
      playerSymbol.style.color = 'white'
      playerSymbol.style.fontSize = '3.8rem'
      playerSymbol.style.fontWeight = '500'
      cell.appendChild(playerSymbol)

      const index = Number(e.target.dataset.cell)
      console.log(index)
      gameBoard.updateCells(symbol, index)
      let {winner, winningCombo} = gameController.checkWinner(symbol)
      console.log(winner)
      const isDraw = gameController.checkDraw()
      

      if(winner) {
        winningCombo.forEach((index) => {
          const cell = document.querySelector(`[data-cell="${index}"]`);
          cell.classList.add("win")
        })
        gameMessage.textContent= `player "${symbol}" won the game!!`
        document.querySelector('.game-status-msg').appendChild(gameMessage)
        gameActive = false;
        return
      }else if(isDraw){
        gameMessage.textContent= "This game is a draw!!"
        document.querySelector('.game-status-msg').appendChild(gameMessage)
        gameActive = false;
      }
       symbol = switchTurn.currSymbol(symbol)
      //restart game
      const restartBtn = document.querySelector('.restart-btn');
      restartBtn.addEventListener('click', (e) =>{
        resetDom()
        gameBoard.resetBoard()
        symbol= "X"
        gameActive = true;
      })


      console.log(gameBoard.cells)
    })
  })
})()
