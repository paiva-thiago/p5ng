var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var diameter = 50;
var xBallChange = 5;
var yBallChange = 5;
var xPaddle;
var yPaddle;
var paddleWidth = 100;
var paddleHeight = 25;
var started = false;
var score = 0;
var ativo = true;

var ftDisplay;
var ftEndGame;

var ball;
var mureta;
var imMureta;
var podeAumentarVelocidade=false;
function preload() {
  ftDisplay = loadFont('assets/8bitOperatorPlus8-Bold.ttf');
  ftEndGame = loadFont('assets/CreepyRegular.ttf');
  ball = loadImage('assets/ball.png');
  mureta = loadImage('assets/channel.png');
  
}
function velocidade(velo){
    if(velo<0){
        velo-=2;
    }else{
        velo+=2;
    }
    return velo;
}
function setup() {   
   createCanvas(windowWidth-50, windowHeight-50);
}

function draw() {
  if(ativo){
    if(podeAumentarVelocidade){
        xBallChange=velocidade(xBallChange);
        yBallChange=velocidade(yBallChange);
        podeAumentarVelocidade = false;
    }
    xBall += xBallChange;
    yBall += yBallChange;
    background(255, 197, 12);
    fill(0, 0, 0);
    noStroke();
    image(ball,xBall,yBall);//ellipse(xBall, yBall, diameter, diameter);
    if (xBall < diameter/2 || xBall > windowWidth - 0.5*diameter) {
        xBallChange *= -1;
    }
    if (yBall < diameter/2 ) {
        yBallChange *= -1;
    }
    if(yBall > windowHeight - diameter){
        
        clear();        
        textSize(50);
        fill(0,0,0);
        noStroke();
        rect(0,0, windowWidth,windowHeight+100);
        fill(120, 120,120);
        textFont(ftDisplay);
        text("FIM DE JOGO  PONTOS: " + score, 500, 500);
        
        ativo=false;
        
    }
    if ((xBall > xPaddle && xBall < xPaddle + paddleWidth) && (yBall + (diameter/2) >= yPaddle-70)) {
        xBallChange *= -1;
        yBallChange *= -1;
        score++;
        podeAumentarVelocidade=(score % 2 === 0);
    }
    if (!started) {
        xPaddle = windowWidth / 2;
        yPaddle = windowHeight - 100;
        started = true;
    }
    fill(255, 255, 255);
    noStroke();
    imMureta=image(mureta,xPaddle,yPaddle);//rect(xPaddle, yPaddle, paddleWidth, paddleHeight);
    fill(255, 255, 255);
    textSize(24);
    textFont(ftDisplay);
    text("Score: " + score, 10, 25);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    xPaddle -= 70;
  } else if (keyCode === RIGHT_ARROW) {
    xPaddle += 70;
  }
}