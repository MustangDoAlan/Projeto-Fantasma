var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;

  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}


function draw() {
  background(0);

  if(gameState === "play"){
  
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("W"))  {
    ghost.velocityY = -5;
  }

  if(keyDown("A")) {
    ghost.x = ghost.x + -5;
  }

  if(keyDown("D")) {
    ghost.x = ghost.x + 5;
  }

  ghost.velocityY = ghost.velocityY + 0.9;

  if(frameCount % 240 === 0){

  gerarportas();
  }

  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }

  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600) {
    ghost.destroy();
    gameState = "end";
  }
  drawSprites();
}
  if(gameState === "end") {
    textSize(30);
    fill("yellow");
    text("Game Over",230,250);
  }

    
}

function gerarportas(){
 door = createSprite(random(120,400),-50);
 door.velocityY = 1;
 door.addImage(doorImg);
 ghost.depth = door.depth;
 ghost.depth = ghost.depth + 1;
 climber = createSprite(door.x,10);
 climber.addImage(climberImg);
 climber.velocityY = 1;
 invisibleBlock = createSprite(climber.x,15);
 invisibleBlock.height = 2;
 invisibleBlock.width = climber.width;
 invisibleBlock.velocityY = 1;
 invisibleBlock.debug = true;

 doorsGroup.add(door);
 climbersGroup.add(climber);
 invisibleBlockGroup.add(invisibleBlock);
}
