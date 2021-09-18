let canvas;

const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var isChanging = 0;
var curPlyr = 1;
var gameOn = false;
let p1Grid;
let p1Guess;
let p2Grid;
let p2Guess;
var gameType;	//set equal to number of ships on the board

var p1Ships = [];
var p2Ships = [];

var p1GridArr = createArray(10, 9);					//Note: could save time later by saving location of ship as its size - 1x1 ship at (X, Y) means value at (X, Y) = 1
let p1GuessArr = createArray(10, 9);
var p2GridArr = createArray(10, 9);
let p2GuessArr = createArray(10, 9);

class Ship
{
    sunk = false; // Our ship obviously won't start already sunk.
    constructor(size, posX, posY, facing)
    {
        this.size = size; // Carriers are 5, battleships are 4, cruisers & subs are 3, destroyers are 2
        this.posX = posX;
        this.posY = posY;
		this.facing = facing;	// posX and posY determine "origin" of ship, facing determines where extra ship parts go
								//0 = Up, 1 = Right, 2 = Down, 3 = Left ------ ex. 1x2 ship with origin E6 and facing 1 will occupy E6 AND E7
								//Exception: 1x1 ship given default facing of "0"
    }

    sink()
    {
        this.sunk = true;
    }

    getPosX()
    {
        return this.posX;
    }

    getPosY()
    {
        return this.posY;
    }

    isSunk()
    {
        return this.sunk;
    }
	
	getFacing() {
		return this.facing;
	}
	
	getSize() {
		return this.size;
	}
}

function createArray(length)
{
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
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
            }
            if(grid.className == "p2-grid")
            {
                if(p2GridArr[r][c] == 1)
                {
                    cell.className = 'clicked';
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

//Following placeShipx function are definitely not optimal, but should work
//Need to allow placement by clicking on grid
//CURRENTLY EXPECTS PERFECT INPUT (LETTER+NUMBER BOTH WITHIN GRID)
function getCoords() {
	let coordString = window.prompt("Enter Grid ID (ex. B3)");
	coordSplit = coordString.split("");
	let coordX = parseInt(coordSplit[1]) - 1;		//Both coords normalized to grid format (begins with 0) (goes row, column)
	let coordY = parseInt(coordSplit[0], 36) - 10;
	
	let coordTogether = [coordY, coordX];
	
	return(coordTogether);
}

function placeShip1(player) {
	alert("Placing 1x1 ship");
	let isSafePlace = 0;
	
	do {
		wantedCoords = getCoords().slice(0);
	
		//check if space is empty
		if((player == 1) && (p1GridArr[wantedCoords[0]][wantedCoords[1]] == null)) {
			isSafePlace = 1;
			p1Ships[0] = new Ship(1, wantedCoords[1], wantedCoords[0], 0);
			p1GridArr[wantedCoords[0]][wantedCoords[1]] = 1;
			
			console.log("Ship 1 created for Player 1: Size " + p1Ships[0].getSize() + ", Row: " + p1Ships[0].getPosY() + ", Column: " + p1Ships[0].getPosX() + ", Facing: " + p1Ships[0].getFacing());
			console.log("Synced with p1GridArr?: ");
			console.log(p1GridArr[p1Ships[0].getPosY()][p1Ships[0].getPosX()] == 1);
		}
		else if((player == 2) && (p2GridArr[wantedCoords[0]][wantedCoords[1]] == null)) {
			isSafePlace = 1;
			p2Ships[0] = new Ship(1, wantedCoords[1], wantedCoords[0], 0);
			p2GridArr[wantedCoords[0]][wantedCoords[1]] = 1;
			
			console.log("Ship 1 created for Player 2: Size " + p2Ships[0].getSize() + ", Row: " + p2Ships[0].getPosY() + ", Column: " + p2Ships[0].getPosX() + ", Facing: " + p2Ships[0].getFacing());
			console.log("Synced with p2GridArr?: ");
			console.log(p2GridArr[p2Ships[0].getPosY()][p2Ships[0].getPosX()] == 1); 
		}
	
	} while(isSafePlace == 0);
	
}

function placeShip2(player) {
	alert("Placing 1x2 ship");
	//Same as above, except: needs facing restrictions
	//ex. facing is 0, check (length of ship - 1) tiles above the origin
}

function placeShip3(player) {
	alert("Placing 1x3 ship");	
	
}

function placeShip4(player) {
	alert("Placing 1x4 ship");	
	
}

function placeShip5(player) {
	alert("Placing 1x5 ship");	
	
}

function placeShip6(player) {
	alert("Placing 1x6 ship");	
	
}

//TODO: Get "gameType" via "x ships per person" buttons before calling this
//REMINDER: REMOVE "gameType" VALUE DECLARED HERE - FOR TESTING ONLY
function placeShips(player)
{
	gameType = 1;
	
	switch(gameType) {
		case 1:
		placeShip1(player);
		
		break;
		case 2:
		placeShip1(player);
		placeShip2(player);
		
		break;
		case 3:
		placeShip1(player);
		placeShip2(player);
		placeShip3(player);
		
		break;
		case 4:
		placeShip1(player);
		placeShip2(player);
		placeShip3(player);
		placeShip4(player);		
		
		break;
		case 5:
		placeShip1(player);
		placeShip2(player);
		placeShip3(player);
		placeShip4(player);	
		placeShip5(player);
		
		break;
		case 6:
		placeShip1(player);
		placeShip2(player);
		placeShip3(player);
		placeShip4(player);
		placeShip5(player);
		placeShip6(player);
		
		break;
	}
}


function drawgrid()
{
    placeShips(1);
    placeShips(2);
	
    document.getElementById('start').disabled = 'disabled';
    document.getElementById("playerNum").innerHTML = curPlyr;

    var player1grid = playBoard(10, 9, "p1-grid", function(cell, row, col, i)
    {
        console.log("x: " + row + " y: " + col + " i: " + i);

        cell.className = 'clicked';
    });

    var player2grid = playBoard(10, 9, "p2-grid", function(cell, row, col, i)
    {
        console.log("x: " + row + " y: " + col);

        cell.className = 'clicked';
    });

    var player1guess = playBoard(10, 9, "p1-guess", function(cell, row, col, i)
    {
        console.log("x: " + row + " y: " + col);

        cell.className = 'clicked';
    });

    var player2guess = playBoard(10, 9, "p2-guess", function(cell, row, col, i)
    {
        console.log("x: " + row + " y: " + col);

        cell.className = 'clicked';
    });

    p1Guess = document.getElementById("guessBoards").appendChild(player1guess);
    p1Guess.setAttribute("id", "p1Guess");
    p1GuessArr = createArray(10, 9);

    p1Grid = document.getElementById("boards").appendChild(player1grid);
    p1Grid.setAttribute("id", "p1Grid");
	p1GridArr = createArray(10, 9);

    p2Guess = document.getElementById("guessBoards").appendChild(player2guess);
    p2Guess.setAttribute("id", "p2Guess");
    p2GuessArr = createArray(10, 9);

    p2Grid = document.getElementById("boards").appendChild(player2grid);
    p2Grid.setAttribute("id", "p2Grid");
    p2GridArr = createArray(10, 9);

    gameOn = true;
    gameLoop();
}

function ship1()
{
    document.getElementById('2ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('5ship').disabled = true;
    document.getElementById('6ship').disabled = true;
	
	gameType = 1;

    alert("You and your opponent have the following ships: 1x1");
}

function ship2()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('5ship').disabled = true;
    document.getElementById('6ship').disabled = true;
	
	gameType = 2;

    alert("You and your opponent have the following ships: 1x1, 1x2");

}

function ship3()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('2ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('5ship').disabled = true;
    document.getElementById('6ship').disabled = true;

	gameType = 3;

    alert("You and your opponent have the following ships: 1x1, 1x2, 1x3");

}

function ship4()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('2ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('5ship').disabled = true;
    document.getElementById('6ship').disabled = true;
	
	gameType = 4;

    alert("You and your opponent have the following ships: 1x1, 1x2, 1x3, 1x4");

}

function ship5()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('2ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('6ship').disabled = true;
	
	gameType = 5;

    alert("You and your opponent have the following ships: 1x1, 1x2, 1x3, 1x4, 1x5");

}

function ship6()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('2ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('5ship').disabled = true;
	
	gameType = 6;

    alert("You and your opponent have the following ships: 1x1, 1x2, 1x3, 1x4, 1x5, 1x6");

}

//Function should be run after curPlyr has sunk an opposing ship but before the turn changes
//Returns 0 if the game continues, or the ID of the winner (1 or 2);
function getWinner() {
	let nonSunk = false;
	if(curPlyr == 1) {
		for(let i = 0; i < gameType; i++) {
			if(p2Ships[i].isSunk() == false) {
				nonSunk = true;
			}
		}
	}
	else {
		for(let i = 0; i < gameType; i++) {
			if(p1Ships[i].isSunk() == false) {
				nonSunk = true;
			}
		}
	}
	if(nonSunk == false) {
		return(curPlyr);
	}
	else {
		return(0);
	}
}
				
		

//This function will block the board while the players are changing in order to prevent the a player from seeing the others ship locations.
//The button must be pressed twice: Once to block the boards so the players can switch, and then once more to switch to the other player.
function changeTurn()
{
    if(isChanging == 0)
    { //Checks to see if this is the first time the button is being pressed in a turn switch.
        isChanging = 1;
    }
    else
    {
        isChanging = 0;
        if(curPlyr == 1)
        {
            p1Grid.style.display = "inline";
            p1Guess.style.display = "inline";
            p2Grid.style.display = "none";
            p2Guess.style.display = "none";
            curPlyr++;
        }
        else
        {   
            p1Grid.style.display = "none";
            p1Guess.style.display = "none";
            p2Grid.style.display = "inline";
            p2Guess.style.display = "inline";
            curPlyr--;
        }
        document.getElementById("playerNum").innerHTML = curPlyr;
    } 
}

function gameLoop()
{		
    while(gameOn)
    {
        p1Grid.style.display = "inline";
        p1Guess.style.display = "inline";
        p2Grid.style.display = "none";
        p2Guess.style.display = "none";
        alert("Player 1, select on bottom where you will place your first ship. Must be three long/wide, horizontal/vertical only, and must not overlap any other ship.");
        gameOn = false;
    }
}
