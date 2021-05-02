'use strict'

const btnElm = document.querySelectorAll('.cell')
const boardSize = 10
const getField = (row, column) => btnElm[row * boardSize + column]

let move = 'circle'

btnElm.forEach(cell => {
  cell.addEventListener('click', (e) => {
    const cell = e.target
    if (move !== 'circle') {
      cell.classList.add('add-cross');
      document.querySelector('.ikon').src = 'img/circle.svg';
      document.querySelector('.ikon').alt = 'circle';
      move = 'circle'
      isWinningMove(cell)
    } else {
      cell.classList.add('add-circle');
      document.querySelector('.ikon').src = 'img/cross.svg';
      document.querySelector('.ikon').alt = 'cross';
      move = 'cross'
      isWinningMove(cell)
    }
    cell.disabled = true
  }, {once: true})
})

const getSymbol = (field) => {
	if (field.classList.contains('add-cross')) {
		return 'křížek'   //cross
	} else if (field.classList.contains('add-circle')) {
		return 'kroužek'   //circle
	} else {
    return undefined
  }
}

const getPosition = (field) => {
	let fieldIndex = 0
	while (fieldIndex < btnElm.length && field !== btnElm[fieldIndex]) {
		fieldIndex++
	}

	return {
		row: Math.floor(fieldIndex / boardSize),
		column: fieldIndex % boardSize,
	}
}

const symbolsToWin = 5
const isWinningMove = (field) => {
	const origin = getPosition(field)
	const symbol = getSymbol(field)

	let i
	
 /*------------row-----------*/
	let inRow = 1 

	// vlevo
	i = origin.column
	while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
		inRow++
		i--
	}

	// vpravo
	i = origin.column
	while (i < boardSize - 1 &&	symbol === getSymbol(getField(origin.row, i + 1))) {
		inRow++
		i++
	}

	if (inRow >= symbolsToWin) {
		const confirmation = confirm(`Vyhral ${symbol}. Spustit novou hru?`)
		if (confirmation) {
			location.reload()
		} else {
			return false
		}
	}

	/*--------------column----------*/
	let inColumn = 1

	// nahoru
	i = origin.row
	while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
		inColumn++
		i--
	}

  // dolu
	i = origin.row
	while ( i < boardSize - 1 && symbol === getSymbol(getField(i + 1, origin.column))) {
		inColumn++
		i++
	}

	if (inColumn >= symbolsToWin) {
		const confirmation = confirm(`Vyhral ${symbol}. Spustit novou hru?`)
		if (confirmation) {
			location.reload()
		} else {
			return false
		}
	}


	/*---------------diagonal---------*/

	let r
  
	let leftToBottomRight = 1
	 
	 // vlevo nahoru
	i = origin.column
	r = origin.row
  while (i > 0 && r > 0 && symbol === getSymbol(getField( r - 1, i - 1))) {
    leftToBottomRight++
		i--
		r--
	}	
  
  // vpravo dolu
	i = origin.column
	r = origin.row
  while ( i < boardSize - 1 && r < boardSize - 1 && symbol === getSymbol(getField(r + 1, i + 1))
	) {
		leftToBottomRight++
		i++
		r++
	}

	if (leftToBottomRight >= symbolsToWin) {
		const confirmation = confirm(`Vyhral ${symbol}. Spustit novou hru?`)
		if (confirmation) {
			location.reload()
		} else {
			return false
		}
	}


  /*---------------diagonal---------*/

  let rightToBottomLeft = 1 

  //vlevo dolu
	i = origin.column
  r = origin.row
  while (i > 0 && r < boardSize -1 && symbol === getSymbol(getField(r + 1 , i - 1))) {
		rightToBottomLeft++
		i--
		r++
	}

  //vpravo hore
	i = origin.column
	r = origin.row
	while (i < boardSize - 1 && r > 0 && symbol === getSymbol(getField( r - 1, i + 1))) {
		rightToBottomLeft++
		i++
		r--
	}

	if (rightToBottomLeft >= symbolsToWin) {
		const confirmation = confirm(`Vyhral ${symbol}. Spustit novou hru?`)
		if (confirmation) {
			location.reload()
		} else {
			return false
		}
	}

	return false
}

