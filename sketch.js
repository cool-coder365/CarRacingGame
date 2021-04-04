var startingImg,starting,invisibleSprite;
var screen2,screen2Img;
var play,playImg,help,helpImg;
var helpPage,helpPageImg,backArrow,backArrowImg;
var road,roadImg,car1,car1Img,car2,car2Img,car3,car3Img,car4,car4Img,carG;
var coin,coinImg,coinG;
var playercar,playerImg;
var leftAr,leftImg,rightAr,rightImg,speedAr,speedImg;
var edge;
var distance = 0,coins=0;
var roadB1,roadB2;
var restart,restartImg,home,homeImg;
//making the gamestate
var gameState = "screen1";

function preload(){
  startingImg = loadImage("./Screen1/Screenshot (38).png");
  screen2Img = loadImage("./Screen2/screen 2.jpg");
  playImg = loadImage("./Screen2/play button for game.png");
  helpImg = loadImage("./Screen2/icons8-help-64.png");
  helpPageImg = loadImage("./Screen3/Screenshot (40).png");
  backArrowImg = loadImage("./Screen3/icons8-back-arrow-24.png");
  roadImg = loadImage("./Screen4/ROAD FOR TOM BOY GAME.jpg")
  car1Img = loadImage("./Screen4/top-car-view-png-34865.png");
  car2Img = loadImage("./Screen4/top-car-view-png-34876.png");
  car3Img = loadImage("./Screen4/top-car-view-png-34877.png");
  car4Img = loadImage("./Screen4/top-car-view-png-34880 (1).png");
  coinImg = loadImage("./Screen4/icons8-coin-48.png");
  playerImg = loadImage("./Screen4/top-car-view-png-34864.png");
  rightImg = loadImage("./Screen4/icons8-arrow-right-64.png");
  leftImg = loadImage("./Screen4/icons8-arrow-left-64.png");
  speedImg = loadImage("./Screen4/icons8-go-64.png");
  restartImg = loadImage("./Screen5/Restart-PNG-Photos.png");
  homeImg = loadImage("./Screen5/house.png");
}

function setup() {
  createCanvas(600,600);
  
  //making first screen
  starting = createSprite(300,300);
  starting.addImage(startingImg);
  
  //making the invisible Sprite
  invisibleSprite = createSprite(200,200);
  invisibleSprite.velocityY = -2;
  invisibleSprite.visible = false;
  
  //making the screen 2
  screen2 = createSprite(300,300);
  screen2.addImage(screen2Img);
  screen2.scale = 1.5;
  
  //making the play button
  play = createSprite(300,300-70);
  play.addImage(playImg);
  play.scale = 0.06;
  
  //making the help button
  help = createSprite(300,300+70);
  help.addImage(helpImg);
  help.scale = 1.3;
  
  //making the help page
  helpPage = createSprite(300,300);
  helpPage.addImage(helpPageImg);
  helpPage.scale = 0.9;
  
  //making the back arrow
  backArrow = createSprite(70,150);
  backArrow.addImage(backArrowImg);
  backArrow.scale = 1.5;
  
  //making the road
  road = createSprite(300,900);
  road.addImage(roadImg);
  road.scale = 5;
  
  //making the right arrow
  rightAr = createSprite(550,550);
  rightAr.addImage(rightImg);
  rightAr.scale = 0.8;
  
  //making the left arrow
  leftAr = createSprite(40,560);
  leftAr.addImage(leftImg);
  leftAr.scale = 0.8;
  
  // making the speed button
  speedAr = createSprite(300,550);
  speedAr.addImage(speedImg); 
  speedAr.scale = 0.8;
  
  //making the playerCar
  playerCar = createSprite(300,450);
  playerCar.addImage(playerImg);
  playerCar.scale = 0.16;
  
  //making the road's Boundary
  roadB1 = createSprite(80,300,2,900);
  roadB2 = createSprite(500,300,2,900);
  
  //making the home image
  home = createSprite(200,370);
  home.addImage(homeImg);
  home.scale = 0.16;
  
  //making the restart button
  restart = createSprite(370,370);
  restart.addImage(restartImg);
  restart.scale = 0.16;
  
  //making groups
  carG = new Group();
  coinG = new Group();
  
}

function draw() {
  background("orange");
  
  
  //making the edges of canvas
  edge = createEdgeSprites();
  
  // making the screen1 gameState 
  if(gameState === "screen1"){

  //making the splash screen
   if(invisibleSprite.isTouching(edge)){
     gameState = "start";
   } 
    
    screen2.visible = false;
    help.visible = false;
    play.visible = false;
    helpPage.visible = false;
    backArrow.visible = false;
    road.visible = false;
    playerCar.visible = false;
    rightAr.visible = false;
    leftAr.visible = false;
    speedAr.visible = false;
    roadB1.visible = false;
    roadB2.visible = false;
    home.visible = false;
    restart.visible = false;
  }
      
  
  //making the start gameState
  if(gameState === "start"){
    starting.visible = false;
    screen2.visible = true;
     help.visible = true;
    play.visible = true;
    backArrow.visible = false;
    road.visible =false;
    
    if(mousePressedOver(help)){
      gameState = "help";
    }
    
    if(mousePressedOver(play)){
      gameState = "play";
    }
  }
  
  if(gameState === "help"){
    helpPage.visible = true;
    screen2.visible = false;
    backArrow.visible = true;
    road.visible = false;
    
    if(mousePressedOver(backArrow)){
      gameState = "start";
       helpPage.visible = false;
    }
  }
  
  if(gameState === "play"){
    road.visible =true;
    roadB1.visible = false;
    roadB1.visible = false;
    screen2.visible = false;
    help.visible =false;
    play.visible = false;
    playerCar.visible = true;
    rightAr.visible = true;
    leftAr.visible = true;
    speedAr.visible = true;
    
    //to make the road mpve
     road.velocityY = 4;
     road.velocityY += 4*coins/2;
  
    //codes to repeat the road
  if(road.y > 890){
    road.y = 800;
  }
    
    //calling the functions
    Car1();
    Car2();
    Car3();
    Car4();
    Coin(); 
    
    //giving the functionality to speed button
    if(mousePressedOver(speedAr)){
      carG.setVelocityYEach(30);
      road.velocityY = 30;
    }
    
    //making the scoring system
    if(coinG.isTouching(playerCar)){
      coins += 1;
      coin.destroy();
    }
    
    // giving the functionality to playerCar
     if(mousePressedOver(rightAr) || keyDown("right")){
   (playerCar.x += 10);
    } 
       if(mousePressedOver(leftAr) || keyDown("left")){
  (playerCar.x -= 10);
    } 

    //making the lose system
    if(carG.isTouching(playerCar)){
      gameState = "end";
      carG .destroyEach();
      coinG.destroyEach();
      road.visible = false;
      playerCar.visible = false;
      speedAr.visible = false;
      leftAr.visible = false;
      rightAr.visible = false;
    }
    
    //making the car coolide to road's Boundary
    playerCar.collide(roadB1);
    playerCar.collide(roadB2);
    
    //maintaining the depth
    coinG.depth = carG.depth = speedAr.depth = rightAr.depth = leftAr.depth;
    speedAr.depth += 1;
    leftAr.depth += 1;
    rightAr.depth += 1;
  
    //making the distance feature
    distance += 1; 
   
    //writing the texts
  stroke("green");
  fill("blue")
  textSize(12);
  text("Distance:",2,36);
  text(distance,6,50);
  text("Coins:",560,36);
  text (coins,560,50);
  
  }
  
  if(gameState === "end"){
    
    restart.visible = true;
    home.visible = true;
    
    stroke("gray");
    strokeWeight(5);
    fill("red");
    textSize(30);
    text("You Losed",200,200);
    
    stroke("gray");
    strokeWeight(5);
    fill("green");
    textSize(30);
    text("Distance:"+ distance,250,250);
    text("Coins:"+ coins,250,300);
    
    if(mousePressedOver(home)){
      gameState = "start";
      restart.visible = false;
      home.visible = false;
    }
    
    if(mousePressedOver(restart)){
      gameState = "play";
      restart.visible = false;
      home.visible = false;
    }
  }
  
  
 drawSprites();
}

function Car1(){
  if(frameCount % 100 === 0){
    car1 = createSprite(Math.round(random(90,510)),-80);  
    car1.addImage(car1Img);
    car1.velocityY = 4;
    car1.velocityY += 4*coins/2;
    car1.scale = 0.4;
    car1.lifetime = 180;
    carG.add(car1);
  }
}
function Car2(){
  if(frameCount % 130 === 0){
    car2 = createSprite(Math.round(random(90,510)),-80);
    car2.addImage(car2Img);
    car2.velocityY = 4;
    car2.velocityY += 4*coins/2;
    car2.scale = 0.2;
    car2.lifetime = 180;
     carG.add(car2);
  }
}
function Car3(){
   if(frameCount % 160 === 0){
     car3 = createSprite(Math.round(random(90,510)),-80);
     car3.addImage(car3Img);
     car3.velocityY = 4;
     car3.velocityY += 4*coins/2;
     car3.scale = 0.2;
     car3.lifetime = 180;
      carG.add(car3);
   }
}
function Car4(){
    if(frameCount % 190 === 0){
  car4 = createSprite(Math.round(random(90,510)),-80);
  car4.addImage(car4Img);
  car4.velocityY = 4;
  car4.velocityY += 4*coins/2;
  car4.scale = 0.16;
  car4.lifetime = 180;
       carG.add(car4);
    }
}
function Coin(){
  if(frameCount % 200 === 0){
    coin = createSprite(Math.round(random(90,510)),-80);
    coin.addImage(coinImg);
    coin.velocityY = 4;
    coin.velocityY += 4*coins/2;
    coin.lifetime = 180;
    coinG.add(coin);
  }
}