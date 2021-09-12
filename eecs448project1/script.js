let canvas;

var c1 = document.getElementById("board1");
var ctx1 = c1.getContext("2d");
var c2 = document.getElementById("board2");
var ctx2 = c2.getContext("2d");
ctx1.strokeStyle = 'red';
ctx2.strokeStyle = 'blue';

function drawgrid()
{
    for (let i = 1; i < 10; i++)
    {
        ctx1.beginPath();
        ctx1.moveTo(i * 50, 0)
        ctx1.lineTo(i * 50, 450)
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(0, i * 45)
        ctx1.lineTo(450, i * 45)
        ctx1.stroke();

        ctx2.beginPath();
        ctx2.moveTo(i * 50, 0)
        ctx2.lineTo(i * 50, 450)
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.moveTo(0, i * 45)
        ctx2.lineTo(450, i * 45)
        ctx2.stroke();
    }

    document.getElementById('start').disabled = 'disabled';
}
