const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var ground
var tower, towerImg
var balls=[]
var boats=[]
var boatAnimation=[]
var boatSpriteData, boatSpriteSheet
var brokenBoatAnimation=[]
var brokenBoatSpriteData,brokenBoatSpriteSheet
var waterSplashAnimation=[]
var waterSplashSpriteData, waterSplashSpriteSheet

function preload() {
 back=loadImage("assets/background.gif")
 towerImg=loadImage("assets/tower.png")
 boatSpriteData=loadJSON("assets/boat/boat.json")
 boatSpriteSheet=loadImage("assets/boat/boat.png")
 brokenBoatSpriteData=loadJSON("assets/boat/brokenBoat.json")
 brokenBoatSpriteSheet=loadImage("assets/boat/brokenBoat.png")
 waterSplashSpriteData=loadJSON("assets/waterSplash/waterSplash.json")
 waterSplashSpriteSheet=loadImage("assets/waterSplash/waterSplash.png")


}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle=20
  var options={
    isStatic:true 
  }
  ground=Bodies.rectangle(0,height-5,width*2,2,options)
World.add(world,ground)

tower=Bodies.rectangle(160,350,160,310,options)
World.add(world,tower)

cannon=new Cannon (180,110,130,100,angle) 
var boatFrames=boatSpriteData.frames;
for(var i=0; i<boatFrames.length; i=i+1){
  var pos=boatFrames[i].position
  var Img=boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h)
  boatAnimation.push(Img)
}
var brokenBoatFrames=brokenBoatSpriteData.frames
for(var i=0; i<brokenBoatFrames.length; i=i+1){
  var pos=brokenBoatFrames[i].position
  var Img=brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h)
  brokenBoatAnimation.push(Img)
}


var waterSplashFrames=waterSplashSpriteData.frames
for(var i=0; i<waterSplashFrames.length; i=i+1){
  var pos=waterSplashFrames[i].position
  var Img=waterSplashSpriteSheet.get(pos.x, pos.y, pos.w, pos.h)
  waterSplashAnimation.push(Img)

}
console.log(waterSplashAnimation)





}

function draw() {
  background(189);
  image (back,0,0,1200,600)
  Engine.update(engine);
 rectMode(CENTER)
 noStroke()
 fill ("DarkCyan")
 rect(ground.position.x, ground.position.y,width*2,2)
 push()
 imageMode(CENTER)
  image(towerImg,tower.position.x, tower.position.y, 160,310)
pop()  
   
showBoats()
for (var i=0; i<balls.length; i=i+1){
  showCannonBalls(balls[i], i)
  CollisionWithBoat(i)
}
cannon.display()

}

function showCannonBalls(ball,index){
if (ball) {
  ball.display()
  ball.animate()
  if (ball.body.position.x>=width || ball.body.position.y>= height-50){
    ball.remove(index)
  }
}
}

function showBoats(){
  if (boats.length>0){
if (boats[boats.length-1]==undefined || boats[boats.length-1].body.position.x<width-300){
  var positions=[-40,-60,-70,-20]
  var position=random(positions)
  var boat=new Boat (width, height-100,170,170,position, boatAnimation) 
  boats.push(boat) 

}

for (var i =0; i<boats.length;i=i+1){
  if (boats [i]){

    Matter.Body.setVelocity(boats[i].body,{x:-1, y:0})
    boats[i].display()
    boats[i].animate()
  }
}
  }
  else {
  var boat=new Boat (width-80, height-60,170,170,-80, boatAnimation) 
  boats.push(boat) 
  }
}



function CollisionWithBoat (index){
for (var i=0; i<boats.length; i=i+1){
  if (balls[index]!==undefined && boats[i]!==undefined){
    var collision=Matter.SAT.collides(balls[index].body, boats[i].body)

    if (collision.collided){
      boats[i].remove(i)
   //   Matter.World.remove(world, balls[index].body)
     // delete balls[index]
     balls[index].remove(index)
    }
  }
}
}





function keyReleased(){
  if (keyCode==DOWN_ARROW){
  balls[balls.length-1].shoot()
  }
}

function keyPressed(){
  if (keyCode==DOWN_ARROW){
    var cannonBall=new Cannonball (cannon.x, cannon.y)
    balls.push(cannonBall)
  }
}