let canvas;

const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var curPlyr = 1;
var amntShips = 0;
let p1Grid;
let p1Guess;
let p2Grid;
let p2Guess;

let p1GridArr = createArray(10, 9);
let p1GuessArr = createArray(10, 9);
let p2GridArr = createArray(10, 9);
let p2GuessArr = createArray(10, 9);

function createArray(length) // JS does not natively support 2D arrays, so we have to make a special function to create them.
{
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) // This just adds the specified number of dimensions to the array based upon how many arguments you feed createArray()
    {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}



function playBoard(rows, cols, classname, callback) // The "callback" is a function we use for our event listener.
{
    var letter = 65; // 65 is ASCII for the letter A. We use this when numbering the grid.
    var i = 1; // This is also used for numbering the grid.
    var grid = document.createElement('table');

    grid.className = classname; // Determines if it's the 1st or 2nd player grid
    for (var r = 0; r < rows; ++r)
    {
        var tr = grid.appendChild(document.createElement('tr')); // Put a new row in
        for (var c = 0; c < cols; ++c)
        {
            var cell = tr.appendChild(document.createElement('td')); // Put a new column in
            cell.innerHTML = `${String.fromCharCode(letter)}${i++}`; // Insert the grid number, like A1, B2, C3 etc.
            if(grid.className == "p1-grid")
            {
                if(p1GridArr[r][c] == 1)
                {
                    cell.className = 'clicked';
                }
                if(p1GridArr[r][c] == 2)
                {
                    cell.className = 'hit';
                }
                if(p1GridArr[r][c] == 3)
                {
                    cell.className = 'benign';
                }
            }
            if(grid.className == "p2-grid")
            {
                if(p2GridArr[r][c] == 1)
                {
                    cell.className = 'clicked';
                }
                if(p2GridArr[r][c] == 2)
                {
                    cell.className = 'hit';
                }
                if(p2GridArr[r][c] == 3)
                {
                    cell.className = 'benign';
                }
            }
            else
            {
                cell.addEventListener('click', (function(element, r, c, i) // This inserts a "listener" for the event so that we know when it's clicked.
                {
                    return function()
                    {
                        callback(element, r, c, i); // Pass the element, rows, columns, and item number back.
                    }
                })(cell, r, c, i), false);
            }
        }
        i = 1;
        letter++;
    }
    return grid;
}

//Asks for startpoint and endpoint of ship, then formats them to work with the grid
function getCoords(shipNum) {
	let coordString = window.prompt("Enter Starting Point for Ship " + shipNum + " as a Grid ID (ex. B3) within A-J, 1-9");
	coordSplit = coordString.split("");
	let coordX1 = parseInt(coordSplit[1]) - 1;		//Both coords normalized to grid format (begins with 0) (goes row, column)
	let coordY1 = parseInt(coordSplit[0], 36) - 10;
	
	coordString = window.prompt("Enter Ending Point for Ship " + shipNum + " as a Grid ID (ex. B3)");
	coordSplit = coordString.split("");
	let coordX2 = parseInt(coordSplit[1]) - 1;		//Both coords normalized to grid format (begins with 0) (goes row, column)
	let coordY2 = parseInt(coordSplit[0], 36) - 10;
	
	let coordTogether = [coordY1, coordX1, coordY2, coordX2];
	
	
	return(coordTogether);
}

//function doesn't check size, just making sure startpoint and endpoint are in either same row or column
function isOrthogonal(toCheck) {
	if(toCheck[0] == toCheck[2] || toCheck[1] == toCheck[3]) {
		return(true);
	}
	else {
		return(false);
	}
}

//function makes sure ship is occupying the right amount of tiles for its size
//using nasty if statements to avoid absolute value
function isSize(toCheck, size) {
	if(toCheck[0] == toCheck[2] && toCheck[1] == toCheck[3] && size == 1) {
		return(true);
	}
	else if(toCheck[0] == toCheck[2] && (((toCheck[1] - toCheck[3]) == size-1) || ((toCheck[3] - toCheck[1]) == size-1))) {
		return(true);
	}
	else if(toCheck[1] == toCheck[3] && (((toCheck[0] - toCheck[2]) == size-1) || ((toCheck[2] - toCheck[0]) == size-1))) {
		return(true);
	}
	else {
		return(false);
	}
		
}

//only checks if values are within gameboard
function isWithinBounds(toCheck) {
	if(toCheck[0] > 9 || toCheck[0] < 0 || toCheck[1] > 8 || toCheck[1] < 0 || toCheck[2] > 9|| toCheck[2] < 0 || toCheck[3] > 8 || toCheck[3] < 0) {
		return(false);
	}
	else {
		return(true);
	}
}

//again, pain for absolute values
//stops ships from being placed on each other
function isOnEmpty(toCheck, playerGrid) {
	let pass = true;
	if(toCheck[0] == toCheck[2] && toCheck[1] == toCheck[3] && playerGrid[toCheck[0]][toCheck[1]] == 0) {
		return(true);
	}
	else if(toCheck[0] == toCheck[2]) {
		if(toCheck[1] < toCheck[3]) {
			for(let j = toCheck[1]; j <= toCheck[3]; j++) {
				if(playerGrid[toCheck[0]][j] == 1) {
					pass = false;
				}
			}
		}
		else {
			for(let j = toCheck[3]; j <= toCheck[1]; j++) {
				if(playerGrid[toCheck[0]][j] == 1) {
					pass = false;
				}
			}
		}
	}
	else if(toCheck[1] == toCheck[3]) {
		if(toCheck[0] < toCheck[2]) {
			for(let j = toCheck[0]; j <= toCheck[2]; j++) {
				if(playerGrid[j][toCheck[1]] == 1) {
					pass = false;
				}
			}
		}
		else {
			for(let j = toCheck[2]; j <= toCheck[0]; j++) {
				if(playerGrid[j][toCheck[1]] == 1) {
					pass = false;
				}
			}
		}
	}
	else {
		return(false);
	}
	return(pass);
}

function placeShips(arr)
{

	
	var coords = [];
	var doesPass;
	var passError;
	
	for(let i = 1; i <= amntShips; i++) {								//this gets coords and runs above tests to see if they are fit
	
		alert("Placing Ship " + i + ", Size: 1x" + i);
	
		do {
			coords = getCoords(i);
			
			doesPass = false;
			passError = 0;
			
			if(isOrthogonal(coords) == true) {
				if(isSize(coords, i) == true) {
					if(isWithinBounds(coords) == true) {
						if(isOnEmpty(coords, arr) == true) {			//isOnEmpty MUST BE CALLED AFTER isWithinBounds - causes errors if looking outsite arr
							doesPass = true;
							console.log(isOnEmpty(coords, arr));
						}
						else {
							passError = 1;
						}
					}
					else {
						passError = 2;
					}
				}
				else {
					passError = 3;
				}
			}
			else {
				passError = 4;
			}
			
			switch(passError) {
				case 0:
					alert("Ship Placed!");
					break;
				case 1:
					alert("Ship overlaps another ship. Try again.");
					break;
				case 2:
					alert("Ship is out of bounds of the game board. Try again.");
					break;
				case 3:
					alert("Coordinate range does not match ship size. Try again.");
					break;
				case 4:
					alert("Ship is not horizontal or vertical. Try again.");
					break;
			}
			
			console.log(coords[0]);							//debug statements
			console.log(coords[1]);
			console.log(coords[2]);
			console.log(coords[3]);
			console.log(isOrthogonal(coords));
			console.log(isSize(coords, i));
			console.log(isWithinBounds(coords));
			
		}while(doesPass == false);
		
		//below if-blocks decide how to and place ships on arr
		//again, avoiding use of absolute value
		if(coords[0] == coords[2] && coords[1] == coords[3]) {
			arr[coords[0]][coords[1]] = 1;
			
			console.log("Using placement 1");
			console.log("Placed ship " + i + " at Row, Column " + coords[0] + ", " + coords[1]);
		}
		else if(coords[0] == coords[2]) {
			if(coords[1] < coords[3]) {
				for(let startX = coords[1]; startX <= coords[3]; startX++) {
					arr[coords[0]][startX] = 1;
					
					console.log("Using placement 2");
					console.log("Placed ship " + i + " at Row, Column " + coords[0] + ", " + coords[startX]);
				}
			}
			else {
				for(let startX = coords[3]; startX <= coords[1]; startX++) {
					arr[coords[0]][startX] = 1;
					
					console.log("Using placement 3");
					console.log("Placed ship " + i + " at Row, Column " + coords[0] + ", " + coords[startX]);
				}
			}
		}
		else if(coords[1] == coords[3]) {
			if(coords[0] < coords[2]) {
				for(let startY = coords[0]; startY <= coords[2]; startY++) {
					arr[startY][coords[1]] = 1;
					
					console.log("Using placement 4");
					console.log("Placed ship " + i + " at Row, Column " + coords[startY] + ", " + coords[1]);
				}
			}
			else {
				for(let startY = coords[2]; startY <= coords[0]; startY++) {
					arr[startY][coords[1]] = 1;
					
					console.log("Using placement 5");
					console.log("Placed ship " + i + " at Row, Column " + coords[startY] + ", " + coords[1]);
				}
			}
		}
	}
}

function drawgrid()
{
	alert("Next prompt will ask for the number of ships in play. Amount of ships corresponds with ship size. Ex. 1 ship gives each player a 1x1 ship. 3 ships gives each player a 1x1, 1x2, and 1x3 ship to place.");
	
	do {
		amntShips = window.prompt("Enter amount of ships for each player (1 - 6)");
		
		if(amntShips != null) {
			amntShips = parseInt(amntShips, 10);		//forces int input
		}
		
	}while(((amntShips <=6) && (amntShips >= 1)) != true);
	
	alert("Player 1 will place ships first. Each ship placement will require 2 coordinates: a start and endpoint. For example, a 1x3 ship with start point A1 and end point A3 will occupy tiles A1, A2, and A3. As long as points are horizontal or vertical to each other, order does not matter.");
	
    placeShips(p1GridArr);
	
	alert("Player 2 will now place ships.");
	
    placeShips(p2GridArr);
	
    document.getElementById('start').disabled = 'disabled';
    document.getElementById("playerNum").innerHTML = curPlyr;

    var player1grid = playBoard(10, 9, "p1-grid", function(cell, row, col, i)
    {
        console.log("x: " + row + " y: " + col + " i: " + i);
    });

    var player2grid = playBoard(10, 9, "p2-grid", function(cell, row, col, i)
    {
        console.log("x: " + row + " y: " + col);
    });

    var player1guess = playBoard(10, 9, "p1-guess", function(cell, row, col, i)
    {
        console.log("x: " + row + " y: " + col);
        if(p2GridArr[row][col] == 1)
        {
            p2GridArr[row][col] = 2;
            alert("It's a hit!");
            cell.className = 'hit';
        }
        else
        {
            p2GridArr[row][col] = 3;
            alert("It's a miss.");
            cell.className = 'clicked';
        }
        document.getElementById("boards").removeChild(player2grid); // Redraw player 2's bottom grid so that it reflects where player 1 has guessed.
        player2grid = playBoard(10, 9, "p2-grid", function(cell, row, col, i)
        {
            console.log("x: " + row + " y: " + col + " i: " + i);
        });
        p2Grid = document.getElementById("boards").appendChild(player2grid);
        p2Grid.setAttribute("id", "p2Grid");
        p2Grid.style.display = "none";
        changeTurn();
    });

    var player2guess = playBoard(10, 9, "p2-guess", function(cell, row, col, i)
    {
        console.log("x: " + row + " y: " + col);
        if(p1GridArr[row][col] == 1)
        {
            p1GridArr[row][col] = 2;
            alert("It's a hit!");
            cell.className = 'hit';
        }
        else
        {
            p1GridArr[row][col] = 3;
            alert("It's a miss.");
            cell.className = 'clicked';
        }
        document.getElementById("boards").removeChild(player1grid); // Redraw player 1's bottom grid so that it reflects where player 2 has guessed.
        player1grid = playBoard(10, 9, "p1-grid", function(cell, row, col, i)
        {
            console.log("x: " + row + " y: " + col + " i: " + i);
        });
        p1Grid = document.getElementById("boards").appendChild(player1grid);
        p1Grid.setAttribute("id", "p1Grid");
        p1Grid.style.display = "none";
        changeTurn();
    });

    p1Guess = document.getElementById("guessBoards").appendChild(player1guess); // Do an initial drawing of all the grids.
    p1Guess.setAttribute("id", "p1Guess");

    p1Grid = document.getElementById("boards").appendChild(player1grid);
    p1Grid.setAttribute("id", "p1Grid");

    p2Guess = document.getElementById("guessBoards").appendChild(player2guess);
    p2Guess.setAttribute("id", "p2Guess");

    p2Grid = document.getElementById("boards").appendChild(player2grid);
    p2Grid.setAttribute("id", "p2Grid");

    gameStart();
}

//This function will block the board while the players are changing in order to prevent the a player from seeing the others ship locations.
function changeTurn()
{
    if(curPlyr == 1)
    {
        var p2HasShips = false;
        for(var r = 0; r < 10; r++)
        {
            for(var c = 0; c < 9; c++)
            {
                if (p2GridArr[r][c] == 1)
                {
                    p2HasShips = true;
                }
            }
        }
        if(p2HasShips)
        {
            p1Grid.style.display = "none";
            p1Guess.style.display = "none";
            setTimeout(() => alert("Okay, Player 1, turn your back, and Player 2, press OK to advance."), 0); // These three lines use setTimeout to ensure the grid is properly hidden BEFORE the alert. It doesn't actually hide otherwise. It's a dumb JS quirk.
            setTimeout(() => p2Grid.style.display = "inline", 0);
            setTimeout(() => p2Guess.style.display = "inline", 0);
            curPlyr++;
        }
        else
        {
            alert("Game over, Player 1 wins!");
        }
    }
    else
    {   
        var p1HasShips = false;
        for(var r = 0; r < 10; r++)
        {
            for(var c = 0; c < 9; c++)
            {
                if (p1GridArr[r][c] == 1)
                {
                    p1HasShips = true;
                }
            }
        }
        if(p1HasShips)
        {
            p2Grid.style.display = "none";
            p2Guess.style.display = "none";
            setTimeout(() => alert("Okay, Player 2, turn your back, and Player 1, press OK to advance."), 0); // These three lines use setTimeout to ensure the grid is properly hidden BEFORE the alert. It doesn't actually hide otherwise. It's a dumb JS quirk.
            setTimeout(() => p1Grid.style.display = "inline", 0);
            setTimeout(() => p1Guess.style.display = "inline", 0);
            curPlyr--;
        }
        else
        {
            alert("Game over, Player 2 wins!");
        }
    }
    document.getElementById("playerNum").innerHTML = curPlyr;
}

function gameStart()
{
    alert("Okay Player 1, you start. Player 2, turn your back.");
    setTimeout(() => p1Grid.style.display = "inline", 0); // Again using the setTimeout "trick" to ensure the alert plays first (whereas it never does otherwise)
    setTimeout(() => p1Guess.style.display = "inline", 0);
    setTimeout(() => p2Grid.style.display = "none", 0);
    setTimeout(() => p2Guess.style.display = "none", 0);
}
