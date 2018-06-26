//canvas
var btnStart = document.getElementById('start-btn');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//constants
var bricks = [];

//Class
class Board {
  constructor(){}
  draw(){}
  gameOver(){}
}

class Dohko {
  constructor(){}
  draw(){}
}

class Blick(){
  constructor(){}
  draw(){}
}

//Instances
var board = new Board();
var dohko = new Dohko();

//mainFunctions

function update(){}
function start(){}

//aux functions
function generateBricks(){}
function drawBricks() {}
function finishHim(){}
function restart(){}

//listeners
addEventListener('keydown', function(e){}});
btnStart.addEventListener('click', start);

