var currentCell;
var sudokuStates = [];
var currentSudokuStatePosition;

function init() {
	var currentSudokuState = document.getElementById('sudoku-grid').outerHTML;
	sudokuStates.push(currentSudokuState);
}

function displayTestSudoku() {
	document.write("<table id='sudoku-grid'>");
	for (var rows = 0; rows < 9; rows++) {
		
		document.write("<tr>");

		for (var i = 0; i < 9; i++) {
			document.write("<td onclick='setCurrentCell(this)'>");
			document.write("0");
			document.write("</td>");
		};
		document.write("</tr>");
	};
	document.write("</table>");
}

function setCurrentCell(object) {
	var tds = document.getElementsByTagName("td");

	for(var i = 0; i < tds.length; i++) {
	   tds[i].style.backgroundColor = "white";
	}
	currentCell = object;
	currentCell.style.backgroundColor = "yellow";
}

function displayButtons() {
	document.write("<table>");
	var counter = 0;
	for (var rows = 1; rows < 4; rows++) {
		document.write("<tr>");
		for (var i = 1; i < 4; i++) {
			counter++;
			document.write("<td>");
			document.write("<button onclick='insertValue("+counter+")'>");
			document.write(counter);
			document.write("</button>");
			document.write("</td>");
		};
		document.write("</tr>");
	};
	document.write("</table>");
}

function insertValue(number) {
	if (currentCell != null) {
		currentCell.innerHTML = number;
		currentCell.style.backgroundColor = null;
		currentCell = null;
		var currentSudokuState = document.getElementById('sudoku-grid').outerHTML;
		sudokuStates.push(currentSudokuState);
		currentSudokuStatePosition = sudokuStates.length;
	}
}

function stepBack() {
	if (sudokuStates[currentSudokuStatePosition-2] != null) {
		var sudokuGrid = document.getElementById('sudoku-grid');
		sudokuGrid.innerHTML = sudokuStates[currentSudokuStatePosition-2];
		currentSudokuStatePosition--;
	}
}

function stepForward() {
	if (sudokuStates[currentSudokuStatePosition] != null) {
		var sudokuGrid = document.getElementById('sudoku-grid');
		sudokuGrid.innerHTML = sudokuStates[currentSudokuStatePosition];
		currentSudokuStatePosition++;
	}
}



