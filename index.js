

const gameBoard = (function () {
  const cells = ["", "", "", "", "", "", "", "", ""];
  
  const updateCells = (symbol, position) => {
    if(cells[position].length){
      return
    }else {
      return cells[position] = symbol
    }
    
  }
  return {cells, updateCells}

})() 

gameBoard.updateCells("x", 2);

console.log(gameBoard.cells);

gameBoard.updateCells("o", 2);

console.log(gameBoard.cells);