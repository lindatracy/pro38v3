/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo=createSprite(150,250,50,50);
  kangaroo.addAnimation("running",kangaroo_running);
  kangaroo.addAnimation("collided",kangaroo_collided);
  kangaroo.scale=0.2;

  //kangaroo.debug=true;
  kangaroo.setCollider("circle",30,0,300);

  //kangaroo.x=camera.position.x-270;

  ground=createSprite(400,360,800,10);
  ground.visible=false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();

  gameOver=createSprite(width/2,height/2-20,50,50);
  gameOver.addImage(gameOverImg);
  
  restart=createSprite(width/2,height/2+30,50,50);
  restart.addImage(restartImg);
  restart.scale=0.09;
  score = 0;

}

function draw() {
  background(255);
  if(gameState==PLAY){
    gameOver.visible=false;
    restart.visible=false;
    jungle.velocityX=-4;

    if(jungle.x<0){
     jungle.x=width/2;
    }
    
    if(keyDown("space")){
      kangaroo.velocityY=-10;
      jumpSound.play();
    }
    kangaroo.velocityY+=0.8;
    spawnShrubs();
    spawnObstacles();

    if(kangaroo.isTouching(shrubsGroup)){
      score+=1;
      shrubsGroup.destroyEach();
    }
    if(kangaroo.isTouching(obstaclesGroup)){
      gameState=END;
    }
  }

  if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    kangaroo.changeAnimation("collided",kangaroo_collided);
    jungle.velocityX=0;
    shrubsGroup.destroyEach();
    obstaclesGroup.destroyEach();
    collidedSound.play();

  }
  kangaroo.collide(ground);

  drawSprites();
  textSize(30);
  fill("green");
  text("Score : "+score,400,100);
}

function spawnShrubs(){
  if(frameCount%150==0){
  shrub=createSprite(camera.position.x+500,330,40,10);
  shrub.velocityX=-4;
  rand=Math.round(random(1,3));
  switch(rand){
    case 1: shrub.addImage(shrub1);
    break;
    case 2: shrub.addImage(shrub2);
    break;
    case 3: shrub.addImage(shrub3);
    break;
    default:break;
  }
  shrub.scale=0.05;
  shrub.lifetime=300;
  shrubsGroup.add(shrub);
}
}

function spawnObstacles(){
  if(frameCount%230==0){
  obstacle=createSprite(camera.position.x+500,300,40,10);
  obstacle.velocityX=-4;
  obstacle.addImage(obstacle1);
  obstacle.scale=0.4;
  obstacle.lifetime=300;
  obstaclesGroup.add(obstacle);
}
}
