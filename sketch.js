var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground, invisible;
var survivalTime = 0;
var GameState;
var PLAY, END;
var end, bananasEaten = 0;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}
function setup() {
  createCanvas(500, 500);

  PLAY = 1;
  GameState = PLAY;
  END = 0;

  FoodGroup = new Group();
  obstacleGroup = new Group();

  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(250, 405, 1000, 10);
  ground.x = ground.width / 2;
  ground.shapeColor = "Green";
  //ground.debug = true;

  invisible = createSprite(250, 407, 1000, 10);
  invisible.x = ground.width / 2;
  invisible.visible= false;

}
function draw() {
  background("blue");

  if (GameState === PLAY) {
    monkey.velocityY = monkey.velocityY + 0.9;

    //reset the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (invisible.x < 0) {
      invisible.x = invisible.width / 2;
    }
    invisible.velocityX = -5;

    if (keyDown("space") && monkey.isTouching(ground)) {
      monkey.velocityY = -20;
    }
    
    score = Math.round(frameCount / 3);
    survivalTime = Math.ceil(frameCount / frameRate());
     ground.velocityX = -(5 + 2 * score / 100);
    
    if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    bananasEaten ++;
  }
   
   Food();
   Obstacle();


    if (monkey.isTouching(obstacleGroup)) {
      GameState = END;
    }

} 
  else if (GameState === END) {
    monkey.velocityY = 0;
    
    ground.velocityX = 0;
    invisible.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
  }

  monkey.collide(invisible);

  stroke("black");
  textSize(20);
  fill("red");
  text("Score: " + score, 400, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time : " + survivalTime, 10, 50);
  
  stroke("black");
  textSize(20);
  fill("yellow");
  text("Bananas Eaten = " + bananasEaten, 190, 50);

  drawSprites();
}

function Food() {

  if (frameCount % 105 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    //banana.debug = true;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("circle", -40, -140,300);

  }
}
function Obstacle() {

  if (frameCount % 210 === 0) {
    var obstacle = createSprite(500, 365, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    //obstacle.debug = true;
    obstacle.setCollider("circle", 30, -20, 200)
  }
}