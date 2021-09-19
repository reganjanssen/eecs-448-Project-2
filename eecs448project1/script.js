const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var curPlyr = 1;
var numShips = 5;
let p1Grid;
let p1Guess;
let p2Grid;
let p2Guess;

// These arrays are the grids that will allow us to play the game.
let p1GridArr = createArray(10, 9);
let p1GuessArr = createArray(10, 9);
let p2GridArr = createArray(10, 9);
let p2GuessArr = createArray(10, 9);

/**
 * Creates the arrays necessary to store ship positions. This is necessary because JS does not natively support 2D arrays.
 *
 * @param {int} length - The length needed for each dimension of the array.
 * @return {array} - an n-dimensional array based upon how many args you passed for length.
 * @author Drew Fink - adapted from StackOverflow answer by Matthew Crumley
 */
function createArray(length)
{
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) // This just adds the specified number of dimensions to the array based upon how many arguments you feed createArray()
    {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args); // Recursively add the correct number of dimensions to the array.
    }

    return arr;
}

/**
 * Function that generates and populates all of the play-boards seen on the page, and embeds them with the appropriate functionality.
 *
 * @param {int} rows - The number of rows needed in the generated board.
 * @param {int} cols - The number of columns needed in the generated board.
 * @param {string} classname - The name of the HTML class the grid should belong to, for the purpose of CSS.
 * @param {function} callback - Allows for a custom function within each grid.
 * @author Drew Fink - adapted from StackOverflow answer by "Phrogz"
 */
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

/**
 * Populates the ship arrays with randomly-generated ship positions.
 *
 * @pre An array is generated, but is empty and so needs ships to be placed in it.
 * @param {array} arr - The array that will be filled with the ships.
 * @post The array is filled with ships (denoted as 1).
 * @author Zach Sambol & Drew Fink
 */
function placeShips(arr)
{
    var ships = 0;
    while(ships < numShips)
    {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 9);
        let vertOrHoriz = Math.floor(Math.random() * 2);
        
        if(vertOrHoriz == 0) // Vertical is chosen
        {
            if((row < 7 && arr[row][col] == null && arr[row + 1][col] == null && arr[row + 2][col] == null && arr[row + 3][col] == null)) // Check if the appropriate spaces are empty
            {
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
        if(vertOrHoriz == 1) // Horizontal is chosen
        {
            if((col < 3 && arr[row][col] == null && arr[row][col + 1] == null && arr[row][col + 2] == null && arr[row][col + 3] == null)) // Check if the adjacent spaces are empty
            {
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
}

/**
 * Changes turn after a player has made a move and hides the grids accordingly.
 *
 * @pre A player has just made a move and has been informed of whether their move was a hit or a miss.
 * @post The interface has now switched so the other player can make a move.
 * @author Andrew Brown
 */
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

/**
 * Draws the ship placement grids and guessing grids to the screen, and provides for redrawing them to show guesses by the other player.
 *
 * @pre The ships have been placed in the grid arrays but they have not been drawn to the screen.
 * @post The grids are now visible to the player.
 * @author Drew Fink & Andrew Brown
 */
function drawGrids()
{
    var player1grid = playBoard(10, 9, "p1-grid", function(cell, row, col, i){});

    var player2grid = playBoard(10, 9, "p2-grid", function(cell, row, col, i){});

    var player1guess = playBoard(10, 9, "p1-guess", function(cell, row, col, i)
    {
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
        player2grid = playBoard(10, 9, "p2-grid", function(cell, row, col, i){});
        p2Grid = document.getElementById("boards").appendChild(player2grid);
        p2Grid.setAttribute("id", "p2Grid");
        p2Grid.style.display = "none";

        changeTurn();
    });

    var player2guess = playBoard(10, 9, "p2-guess", function(cell, row, col, i)
    {
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
        player1grid = playBoard(10, 9, "p1-grid", function(cell, row, col, i){});
        p1Grid = document.getElementById("boards").appendChild(player1grid);
        p1Grid.setAttribute("id", "p1Grid");
        p1Grid.style.display = "none";

        changeTurn();
    });

    // At this point we do some initial setup for the grids and start the game proper.
    p1Guess = document.getElementById("guessBoards").appendChild(player1guess); // Do an initial drawing of all the grids.
    p1Guess.setAttribute("id", "p1Guess");
    
    p1Grid = document.getElementById("boards").appendChild(player1grid);
    p1Grid.setAttribute("id", "p1Grid");
    
    p2Guess = document.getElementById("guessBoards").appendChild(player2guess);
    p2Guess.setAttribute("id", "p2Guess");
    
    p2Grid = document.getElementById("boards").appendChild(player2grid);
    p2Grid.setAttribute("id", "p2Grid");
}

/**
 * Initiates the game by placing the ships and initializing the grids.
 *
 * @pre The players need to be ready to start the game.
 * @post The game has been started.
 * @author Raj Nara & Drew Fink
 */
function gameHandler()
{
    var resp = parseInt(window.prompt("How many ships? (min is 1, max is 6, default is 5)")); // Retrieve number of ships for gameplay and store as integer.
    
    if(Number.isInteger(resp)) // If someone were to enter, say, text, this would be NaN and therefore not work and just use the default.
    {
        if(resp < 1)
        {
            alert("You can't have less than 1 ship. Resetting to the default of 5.");
        }
        else if(resp > 6)
        {
            alert("You can't have more than 6 ships. Resetting to the default of 5.");
        }
        else
        {
            numShips = resp;
        }
    }
    else
    {
        alert("Your response was invalid so we're going with the default of 5 ships.");
    }

    placeShips(p1GridArr);
    placeShips(p2GridArr);
    document.getElementById('start').disabled = 'disabled';
    document.getElementById("playerNum").innerHTML = curPlyr;

    drawGrids();

    alert("Okay Player 1, you start. Player 2, turn your back.");
    setTimeout(() => p1Grid.style.display = "inline", 0); // Again using the setTimeout "trick" to ensure the alert plays first (whereas it never does otherwise)
    setTimeout(() => p1Guess.style.display = "inline", 0);
    setTimeout(() => p2Grid.style.display = "none", 0);
    setTimeout(() => p2Guess.style.display = "none", 0);
}
