let canvas;

var c1 = document.getElementById("board1");
var ctx1 = c1.getContext("2d");
var c2 = document.getElementById("board2");
var ctx2 = c2.getContext("2d");
ctx1.strokeStyle = 'red';
ctx2.strokeStyle = 'blue';
const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];


function drawgrid()
{
    for (let i = 1; i < 10; i++)
    {
        ctx1.beginPath();
        ctx1.moveTo(i * 45, 0)
        ctx1.lineTo(i * 45, 450)
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(0, i * 50)
        ctx1.lineTo(450, i * 50)
        ctx1.stroke();

        ctx2.beginPath();
        ctx2.moveTo(i * 45, 0)
        ctx2.lineTo(i * 45, 450)
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.moveTo(0, i * 50)
        ctx2.lineTo(450, i * 50)
        ctx2.stroke();
    }

    for (let j = 0; j < 11; j++)
    {
        ctx1.font = "15px Arial";
        ctx1.fillText(col[j], j*45, 13);
    }

    for (let j = 0; j < 10; j++)
    {
        ctx1.font = "15px Arial";
        ctx1.fillText(j, 0, j*50);
    }

    for (let j = 0; j < 10; j++)
    {
        ctx2.font = "15px Arial";
        ctx2.fillText(col[j], j*45, 13);
    }

    for (let j = 0; j < 10; j++)
    {
        ctx2.font = "15px Arial";
        ctx2.fillText(j, 0, j*50);
    }

    document.getElementById('start').disabled = 'disabled';
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