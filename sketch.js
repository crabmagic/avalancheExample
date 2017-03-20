//Stanford moving box example
var fallingBoxes;
var startingLevel = 2;
var startTime;
var player;
var boxWidth = 50;
var score = 0;
var highScore = 0;

var instructions = "Use left & right arrows to move";
var showInstructions = true;
function setup() {
    startTime = millis();
  createCanvas(800,800);
  fallingBoxes = Group();
  player = createSprite(400, 700, 50, 50);
  player.friction = .98;
  for(var i = 0; i < startingLevel ; i++){
      fallingBoxes.add(createSprite(200+i*200, 0, boxWidth, boxWidth) );
      fallingBoxes.get(i).limitSpeed(5);
      //creates a terminal velocity
       // fallingBox.friction = .98;
  }

}

function draw() {
  background(250,255,250);
  drawSprites();
  textSize(36);

  if(showInstructions){
      instuct();
  }
  text("Your Score: "+score,50,50);
  text("Best Score: "+highScore,50,100);

  playerControl();
  spawnBoxes(5000);
  avalanche();
  fallingBoxes.bounce(player);

  if(player.position.y > height){
      reset();
  }
    //makes the falling boxes collies, gets pretty hectic
//  fallingBoxes.bounce(fallingBoxes);
}

function instuct() {
    if(keyIsPressed && millis()-startTime < 1000){
        showInstructions = false;
    }
    text(instructions,200,300);
}

function reset() {
    for(var i = fallingBoxes.length-1; i >=0; i--){
        fallingBoxes.get(i).remove();
    }
    fallingBoxes.clear();
    score = 0;
    player.position.x = 400;
    player.position.y = 700;
    player.velocity.x = 0;
    player.velocity.y = 0;
    startTime = millis()-4500;
    showInstructions = true;
}
function avalanche() {
    for(var i = 0; i < fallingBoxes.length ; i++){
        fallingBoxes.get(i).addSpeed(.1*(i+1)/10,90);
    }
    //fallingBox.setVelocity(-20,0);

    for(var i = 0; i < fallingBoxes.length ; i++){
        if(fallingBoxes.get(i).position.y > height){
            fallingBoxes.get(i).position.y = -fallingBoxes.get(i).height;
            fallingBoxes.get(i).position.x = random(width-fallingBoxes.get(i).width);
            fallingBoxes.get(i).setVelocity(0,0);
        }
    }
}

function spawnBoxes( spawnTimer) {
    if(millis()-startTime > spawnTimer){
        fallingBoxes.add(createSprite(random(width-boxWidth*1.5), 0, boxWidth, boxWidth) );
        startTime = millis();
        score = score + 1;
        if(score > highScore){
            highScore = score;
        }
    }
}

function playerControl() {
    if(keyDown(LEFT)){
      player.setVelocity( -2,0 );
    }
    if(keyDown(RIGHT)){
      player.setVelocity( 2,0 );
    }
    if(player.position.x < 0 || player.position.x > width-player.width){
        player.attractionPoint ( 10,  width/2 , player.position.y );
    }
}
