//canvas
var btnStart = document.getElementById('start-btn');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//constants
var interval;
var frames = 0;
var score = 0;
var lives = 3;
var angrys = [];
var images = {
  dohkoImg: 'assets/img/pug.png',
  heart: 'assets/img/heart.png',
  angry: 'assets/img/angry.png'
}

//Class
class Board {
  constructor(){}
  draw(){}
  gameOver(){}
}

class Dohko {
  constructor(){
    this.height = 75;
    this.width = 70;
    this.x = canvas.width/2 - this.width/2;
    this.y = canvas.height-this.height;
    this.image = new Image();
    this.image.src = images.dohkoImg;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
  }
  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
class Heart{
  constructor(dohko){
    this.width = 20;
    this.height = 20;
    this.x = dohko.width/2 + dohko.x - this.width/2;
    this.y = dohko.y - this.height +5;
    this.image = new Image();
    this.image.src = images.heart;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
  }
  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
class Angry{
  constructor(){
    this.width = 50;
    this.height = 50;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.row = 7;
    this.column = 3;
    this.image = new Image();
    this.image.src = images.angry;
    this.image.onload = function(){
      this.draw();
    }.bind(this)
  }
  draw() { 
    for(var i=0; i<this.column; i++) {
      angrys[i] = [];
      for(var j=0; j<this.row; j++) {
        angrys[i][j] = { x: 0, y: 0, status: 1 };
      }
    }
    for(var i=0; i<this.column; i++) {
      for(var j=0; j<this.row; j++) {
        if(angrys[i][j].status == 1) {
          this.x = (j*(this.width+this.padding))+this.offsetLeft;
          this.y = (i*(this.width+this.padding))+this.offsetTop;
          angrys[i][j].x = this.x;
          angrys[i][j].y = this.y;
          ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        }
      }
    }
  }
}

//Instances
var board = new Board();
var dohko = new Dohko();
var heart = new Heart(dohko);
var angry = new Angry();

//mainFunctions

function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dohko.draw();
  heart.draw();
  angry.draw();

}
function start(){
  interval = setInterval(update, 1000/60);
}

//aux functions
function generateBricks(){}
function drawBricks() {}
function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}
function finishHim(){}
function restart(){}

//listeners
addEventListener('keydown', keyDownHandler);
addEventListener("keyup", keyUpHandler);
btnStart.addEventListener('click', start);

