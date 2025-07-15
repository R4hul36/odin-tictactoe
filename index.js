
//module that adds and removes symbols to the game board
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

//switches player after each move
const switchTurn = (function () {
  const currSymbol = (symbol) => {
    symbol = symbol === 'X' ? 'O' : 'X'

    return symbol
  }
  return { currSymbol }
})()

const player1 = player('x')
const player2 = player('o')


//game logic that finds a winner by checking the pattern
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

//using the modules above renders the game on the page
const domController = (function () {
  let symbol = ''
  let gameActive = false
  const msg = document.querySelector('.game-msg')

 //highlights the current player 
  function highlightActivePlayer(symbol) {
    const xBtn = document.getElementById('xSymbol')
    const oBtn = document.getElementById('oSymbol')

    xBtn.classList.remove('x-active')
    oBtn.classList.remove('o-active')

    if (symbol === 'X') {
      xBtn.classList.add('x-active')
    } else if (symbol === 'O'){
      oBtn.classList.add('o-active')
    }
  }

  document.querySelectorAll('.symbol-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      symbol = btn.textContent
      highlightActivePlayer(symbol)
      if (gameActive) {
        btn.disabled = true
      }
    })
  })

  //creates a message element that shows the result after each game
  let gameMessage = document.createElement('p')
  gameMessage.style.color = '#facc15'
  gameMessage.style.fontSize = '1.3rem'
  gameMessage.style.marginBottom = '20px'

 //removes all the symbols from game board and resets to default 
  const resetDom = () =>
    document.querySelectorAll('.game-cell').forEach((cell) => {
      cell.textContent = ''
      cell.classList.remove('win')
      gameMessage.textContent = ''
  })

  //creates each player symbol and styles them, when player clicks on a particular cell
  const addSymbolToDom = function (symbol) {
    const playerSymbol = document.createElement('p')
      playerSymbol.textContent = symbol
      if (symbol === 'X') {
        playerSymbol.style.color = '#e94560'
      } else {
        playerSymbol.style.color = '#08d9d6'
      }

      playerSymbol.style.fontSize = '3.8rem'
      playerSymbol.style.fontWeight = '500'
      return playerSymbol;
  }

  
  document.querySelectorAll('.game-cell').forEach((cell) => {
    cell.addEventListener('click', (e) => {
      //if player selected a symbol then game starts
      //then the intial message is hidden and the selection button are also disabled
      if (symbol) {
        gameActive = true
        if (gameActive) {
          msg.style.display = 'none'
        }
        document.querySelectorAll('.symbol-btn').forEach((btn) => {
          btn.disabled = true
        })
      }
      if (!gameActive || e.target.textContent !== '') {
        return
      }

      const playerSymbol = addSymbolToDom(symbol)
      cell.appendChild(playerSymbol)

      //get the index of the clicked cell, then adds to the gameboard using the updatecell module
      //after each cells is clicked checkWinner will check for a winner and checkDraw for draw
      const index = Number(e.target.dataset.cell)
      gameBoard.updateCells(symbol, index)
      let { winner, winningCombo } = gameController.checkWinner(symbol)
      const isDraw = gameController.checkDraw()

      
      if (winner) {
        renderWinner(winningCombo)
      } else if (isDraw) {
        renderDraw()
      }
      symbol = switchTurn.currSymbol(symbol)
      highlightActivePlayer(symbol)
      
    })
  })

  //adds a background color on the winning cells and renders on the page
  const renderWinner = function (winningCombo) {
    winningCombo.forEach((index) => {
    const cell = document.querySelector(`[data-cell="${index}"]`)
      cell.classList.add('win')
          
    })

    //prints the winner and also sets every thing to default
    gameMessage.textContent = `Player "${symbol}" won the game!!`
    document.querySelector('.game-status-msg').appendChild(gameMessage)
    gameActive = false
    symbol = ''
    highlightActivePlayer(symbol)
    return
  }  

  //message when game is drawn
  const renderDraw = function () {
    gameMessage.textContent = 'This game is a draw!!'
    document.querySelector('.game-status-msg').appendChild(gameMessage)
    gameActive = false
    symbol = ''
    highlightActivePlayer(symbol)
    return
  }

  //restarts the game
  const restartBtn = document.querySelector('.restart-btn')
  restartBtn.addEventListener('click', (e) => {
    resetDom()
    gameBoard.resetBoard()
    highlightActivePlayer('')
    msg.style.display = 'block'
    document.querySelectorAll('.symbol-btn').forEach((btn) => {
      btn.disabled = false
    })
  })
})()
