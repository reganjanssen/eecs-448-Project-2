let canvas;

const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var isChanging = 0;
var curPlyr = 1;
var gameOn = false;
let p1Grid;
let p1Guess;
let p2Grid;
let p2Guess;

let p1GridArr = createArray(10, 9);
let p1GuessArr = createArray(10, 9);
let p2GridArr = createArray(10, 9);
let p2GuessArr = createArray(10, 9);

class Ship
{
    sunk = false; // Our ship obviously won't start already sunk.
    constructor(size, posX, posY)
    {
        this.size = size; // Carriers are 5, battleships are 4, cruisers & subs are 3, destroyers are 2
        this.posX = posX;
        this.posY = posY;
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

function placeShips(arr)
{
    var ships = 0;
    while(ships < 5)
    {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 9);
        let vertOrHoriz = Math.floor(Math.random() * 2);
        
        if(vertOrHoriz == 0) // Horizontal is chosen
        {
            if((row < 7 && arr[row][col] == null && arr[row + 1][col] == null && arr[row + 2][col] == null && arr[row + 3][col] == null)) // Check if the appropriate spaces are empty
            {
                console.log("Placed one - vertical at " + row + ", " + col);
                arr[row][col] = 1;
                arr[row + 1][col] = 1;
                arr[row + 2][col] = 1;
                ships++;
            }
            else // If not, cut the loop and try again
            {
                continue;
            }
        }
        if(vertOrHoriz == 1) // Vertical is chosen
        {
            if((col < 3 && arr[row][col] == null && arr[row][col + 1] == null && arr[row][col + 2] == null && arr[row][col + 3] == null)) // Check if the adjacent spaces are empty
            {
                console.log("Placed one - horizontal at " + row + ", " + col);
                arr[row][col] = 1;
                arr[row][col + 1] = 1;
                arr[row][col + 2] = 1;
                ships++;
            }
            else // If not, cut the loop and try again
            {
                continue;
            }
        }
    }
    return arr;
}

function drawgrid()
{
    placeShips(p1GridArr);
    placeShips(p2GridArr);
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

    alert("You and your opponent have the following ships: 1x1");
}

function ship2()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('5ship').disabled = true;
    document.getElementById('6ship').disabled = true;

    alert("You and your opponent have the following ships: 1x1, 1x2");

}

function ship3()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('2ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('5ship').disabled = true;
    document.getElementById('6ship').disabled = true;

    alert("You and your opponent have the following ships: 1x1, 1x2, 1x3");

}

function ship4()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('2ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('5ship').disabled = true;
    document.getElementById('6ship').disabled = true;

    alert("You and your opponent have the following ships: 1x1, 1x2, 1x3, 1x4");

}

function ship5()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('2ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('6ship').disabled = true;

    alert("You and your opponent have the following ships: 1x1, 1x2, 1x3, 1x4, 1x5");

}

function ship6()
{
    document.getElementById('1ship').disabled = true;
    document.getElementById('2ship').disabled = true;
    document.getElementById('3ship').disabled = true;
    document.getElementById('4ship').disabled = true;
    document.getElementById('5ship').disabled = true;

    alert("You and your opponent have the following ships: 1x1, 1x2, 1x3, 1x4, 1x5, 1x6");

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
