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


function getDifficulty() {
    var difficulty = getSearchParameters()['difficulty'];
    return difficulty;
}

function displaySudokus() {
    var difficulty = getDifficulty();
    var sudokus = JSON.parse(window.localStorage.getItem('sudokus')).sudokus;

    for (var i = 0; i < sudokus.length; i++) {
        if (sudokus[i].difficulty == difficulty) {
            document.write("<fieldset>");
            document.write("<p>Id: <a href='sudoku_level.html?id="+sudokus[i].id+"'>"+sudokus[i].id+"</a></p>");
            document.write("<p>Zeit: "+sudokus[i].time+"</p>");
            if(sudokus[i].state != "finished") {
                document.write("<p>Fehler: -</p>");    
            } else {
                document.write("<p>Fehler: "+sudokus[i].amountMistakes+"</p>");
            }
            document.write("<p>Status: "+sudokus[i].state+"</p>");
            document.write("</fieldset>");
        };
    };
}

var params = getSearchParameters();