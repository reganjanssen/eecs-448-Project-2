let canvas;

var c1 = document.getElementById("board1");
var ctx1 = c1.getContext("2d");
var c2 = document.getElementById("board2");
var ctx2 = c2.getContext("2d");
ctx1.strokeStyle = 'red';
ctx2.strokeStyle = 'blue';
const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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
            cell.addEventListener('click', (function(element, r, c, i) // This inserts a "listener" for the event so that we know when it's clicked.
            {
                return function()
                {
                    callback(element, r, c, i); // Pass the element, rows, columns, and item number back.
                }
            })(cell, r, c, i), false);
        }
        i = 1;
        letter++;
    }
    return grid;
}

function drawgrid()
{
    document.getElementById('start').disabled = 'disabled';

    var player1grid = playBoard(10, 10, "p1-grid", function(cell, row, col, i)
    {
        console.log("x: "+ row);
        console.log("y: " + col);

        cell.className = 'clicked';
    });

    var player2grid = playBoard(10, 10, "p2-grid", function(cell, row, col, i)
    {
        console.log("x: "+ row);
        console.log("y: " + col);

        cell.className = 'clicked';
    });

    document.getElementById("boards").appendChild(player1grid);
    document.getElementById("boards").appendChild(player2grid);
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