var currentCell;
var sudokuStates = [];
var currentSudokuStatePosition;

var startTime = new Date();
var jsonItem = JSON.parse(window.localStorage.getItem("sudokus")).sudokus;
var id = getSearchParameters()['id'];
var jsonItemId;
var currentSudoku;
for (var i = 0; i < jsonItem.length; i++) {
	if (jsonItem[i].id == id) {
		jsonItemId = i;
		currentSudoku = jsonItem[i];
	}
};
var initialCurrentSudokuTime = currentSudoku.time;

var myVar = setInterval(function () {displayTime()}, 1000);

function getNewTime() {

	var endTime = new Date();

	var str = endTime.toJSON();
	var patt = new RegExp("^.*T");
	var begin = patt.exec(str);
	var currentSudokuTime = new Date(begin+initialCurrentSudokuTime+"Z");

	var timeDifference = new Date(endTime - startTime);
	currentSudokuTime.setTime(currentSudokuTime.getTime() + timeDifference.getTime());


	str = currentSudokuTime.toJSON();
	patt = new RegExp("[0-9]{2}:[0-9]{2}:[0-9]{2}");
	currentSudoku.time = patt.exec(str);
	return currentSudoku.time;
}


function displayTime() {
	var deltaTime = getNewTime();
	var time = document.getElementById("time");
	time.innerHTML = "<p>Zeit: "+deltaTime+"</p>";
}

function init() {
	var currentSudokuState = document.getElementById('sudoku-grid').outerHTML;
	sudokuStates.push(currentSudokuState);
}

function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
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

function displaySudoku() {

	document.write("<table id='sudoku-grid'>");
	for (var rows = 0; rows < 9; rows++) {
		
		document.write("<tr>");

		for (var i = 0; i < 9; i++) {
			var number = currentSudoku.currentRows[rows].cells[i].number;

			if (number == null) {
				document.write("<td onclick='setCurrentCell(this)'>");
			} else {
				document.write("<td class='grey'>");
				document.write(number);
			}
			document.write("</td>");
		};
		document.write("</tr>");
	};
	document.write("</table>");
}

function displaySudokuName() {
	var id = getSearchParameters()['id']
	document.write("<p>Sudoku#"+id+"</p>");
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

function saveInJSON() {
	if (currentSudoku.state = 'not started') {
		currentSudoku.state = 'started';
	}



	jsonItem[jsonItemId] = currentSudoku;
	var preJSON = {"sudokus":jsonItem};
	window.localStorage.setItem("sudokus",JSON.stringify(preJSON));


}



