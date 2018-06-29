//canvas
var onePlayer = document.getElementById('one-player');
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
  angry: 'assets/img/angry.png',
  dohkoSad: 'assets/img/dohko-sad.png',
  cup: 'assets/img/trofeo.png',
}
var width = 50;
var height = 50;
var padding = 10;
var offsetTop = 30;
var offsetLeft = 30;
var row = 7;
var column = 3;
var rightPressed = false;
var leftPressed = false;
var dx = 3;
var dy = -3;
var template = '<li> <span>__name__</span>'+ ' '+ ' <span> __score__</span><span> points</span></li>'; 
var players = [];
var name = '';


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

class Sad{
  construsctor(ctx){
    this.ctx = ctx;
  }
  draw(image_arg, image_x, image_y) {
    var image = new Image();
    image.src = image_arg;
    image.onload = function() {
      ctx.drawImage(image, image_x, image_y, 200, 180);
    };
  }
}

class Players {
  constructor (name = 'I dont know', points = 0){
    this.name = name;
    this.points = points;
  }
}

//Instances
var board = new Board();
var dohko = new Dohko();
var heart = new Heart(dohko);

//mainFunctions
function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawAngrys();
  dohko.draw();
  heart.draw();
  collisionDetection();
  move(heart, dohko);
}
function start(){
  if(interval) return;
  name = document.getElementById('name').value;
  generateAngrys();
  interval = setInterval(update, 1000/60);
  document.getElementById('name').value = '';
}

//aux functions
function generateAngrys(){
  for(c=0; c<column; c++) {
    angrys[c] = [];
    for(r=0; r<row; r++) {
      angrys[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}
function drawAngrys() {
  for(c=0; c<column; c++) {
    for(r=0; r<row; r++) {
      if(angrys[c][r].status == 1) {
        var angryX = (r*(width+padding))+offsetLeft;
        var angryY = (c*(height+padding))+offsetTop;
        angrys[c][r].x = angryX;
        angrys[c][r].y = angryY;
        var image = new Image();
        image.src = images.angry;
        ctx.drawImage(image, angryX,angryY,width,height);
      }
    }
  }
}

function collisionDetection() {
  for(c=0; c<column; c++) {
    for(r=0; r<row; r++) {
      var b = angrys[c][r];
      if(b.status == 1) {
        if(heart.x > b.x && heart.x < b.x+width && heart.y > b.y && heart.y < b.y+height) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == row*column) {
            finishHim();
            youWon();
          }
        }
      }
    }
  }
  drawScore();
}

function move(heart, dohko){
  if(heart.x + dx > canvas.width-heart.width || heart.x + dx < heart.width) {
    dx = -dx;
  }
  if(heart.y + dy  < dohko.height) {
    dy = -dy;
  }

  else if(heart.y + dy > canvas.height-dohko.height ) {
    if(heart.x > dohko.x && heart.x < dohko.x + dohko.width) {
      dy = -dy;
    }
    else {
      lives--;
      if(lives == 0) {
        finishHim()
        drawGameOver()
      }
      else {
        dohko.x = canvas.width/2 - dohko.width/2;
        heart.x = dohko.width/2 + dohko.x - heart.width/2;
        heart.y = dohko.y - heart.height +5;
        dx = 4;
        dy = -4;

      }
    }
  }
  if(rightPressed && dohko.x < canvas.width-dohko.width) {
    dohko.x += 7;
  }
  else if(leftPressed && dohko.x > 0) {
    dohko.x -= 7;
  }

  heart.x += dx;
  heart.y += dy;
  drawLives();
}

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
  } else if(e.keyCode == 27 && !interval){
    console.log('hola');
    restart();
  }
}

function finishHim(){
  clearInterval(interval);
  interval = undefined;
  highestScore();
}
function youWon(){
  var imagenSad = new Sad(ctx);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.font = "70px Mono";
  ctx.fillStyle = "#000";
  ctx.shadowBlur = 4;
  ctx.fillText("YOU WON", canvas.width/4, canvas.height/4);
  ctx.closePath();
  ctx.beginPath();
  ctx.font = "30px Mono";
  ctx.fillStyle = "#000";
  ctx.fillText("Press 'Esc' to reset", canvas.width/6, canvas.height/2);
  ctx.closePath();
  imagenSad.draw(images.cup, canvas.width/3, canvas.height -200, 100);
}
function restart(){
  if(interval) return;
  angrys = [];
  frames = 0;
  score = 0;
  lives = 3;
  dohko.x = canvas.width/2 - dohko.width/2;
  heart.x = dohko.width/2 + dohko.x - heart.width/2;
  heart.y = dohko.y - heart.height +5;
  dx = 3;
  dy = -3;

  start();
}
function drawScore() {
  ctx.font = "16px Mono";
  ctx.fillStyle = "#784831";
  ctx.fillText("Score: " + score, 8, 16);
}
function drawLives() {
  ctx.font = "16px Mono";
  ctx.fillStyle = "#784831";
  ctx.fillText("Lives: " + lives, canvas.width - 100, 16);
}
function drawGameOver(){
  var imagenSad = new Sad(ctx);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.font = "70px Mono";
  ctx.fillStyle = "#000";
  ctx.shadowBlur = 4;
  ctx.fillText("GAME OVER", canvas.width/8, canvas.height/4);
  ctx.closePath();
  ctx.beginPath();
  ctx.font = "30px Mono";
  ctx.fillStyle = "#000";
  ctx.fillText("Press 'Esc' to reset", canvas.width/6, canvas.height/2);
  ctx.closePath();
  imagenSad.draw(images.dohkoSad, canvas.width/3, canvas.height -200, 100);  
}

function highestScore (){
  var finalScore = score +(lives*3);
  var highestScore = new Players(name, finalScore);

  players.push(highestScore);
  players.sort(function (o1,o2) {
    if (o1.points < o2.points) { //comparación lexicogŕafica
      return 1;
    } else if (o1.points > o2.points) {
      return -1;
    } 
    return 0;
  });

  listPlayers();
}

function listPlayers (){
  var finalTemplate = '';

  players.forEach(function (player){
    finalTemplate += template.replace('__name__', player.name).replace('__score__', player.points);
  });
  console.log(finalTemplate);
  document.getElementById('scores').innerHTML= finalTemplate;
}
//listeners
addEventListener('keydown', keyDownHandler);
addEventListener("keyup", keyUpHandler);
onePlayer.addEventListener('click', start);
onePlayer.addEventListener('click', function (){
  onePlayer.setAttribute('disabled', true);
})


