var frog,frogImg;
var  water ,waterImg;
var seaImg,coinImg;
var score,coinGroup,weedGroup;

var start=1;
var stop=0;
var gameState=start;


function preload(){
waterImg=loadImage("images/water.jpg");
frogImg=loadAnimation("images/frog.png","images/frog.png",'images/frog.png');
seaImg=loadImage("images/seaweed.png");
coinImg=loadImage("images/coin.png");
}

function setup(){
createCanvas(450,600);

water=createSprite(200,350,10,10);
water.addImage("water",waterImg);
water.velocityY=3;
water.scale=1.3;

frog=createSprite(180,420,20,1200);
frog.addAnimation("frog",frogImg);
frog.scale=0.1;

score=0;
coinGroup=new Group();
weedGroup=new Group();
}



function draw(){
    background("gray");
    drawSprites();
   textSize(20);
   fill("red");
   text("Score : "+score,300,90);

  
    
    if(gameState===start)
  {
    if(water.y>380)
      {water.y=water.height/2;}

   if(keyDown("space") && frog.y>50)
     frog.y=frog.y-5;
         
    if(keyDown("left") && frog.x>40)            
      frog.x=frog.x-5;       
    if(keyDown("right") && frog.x <360)  
       frog.x=frog.x+5;

     if(frog.isTouching(weedGroup))
       {
        gameState=stop;
        }

        seaWeed();
  } 
  else if(gameState===stop)
  { 
    water.velocityY=0;
    frog.visible=false;
    textSize(30);
    fill('yellow');
    text("Game Over",150,300);
    coinGroup.destroyEach();
    weedGroup.destroyEach();
  }
     
   

}
 

function seaWeed()
 { 
  var yPos=Math.round(random(20,120));
  var xPos=Math.round(random(90,320));
  
  if(frameCount%250===0)
   { 
    var seaW=createSprite(xPos,yPos,10,10);
    //seaW.setCollider('rectangle',0,0,40);
    seaW.addImage("seaweed",seaImg);
    seaW.scale=0.32;
    seaW.velocityY=2;
    weedGroup.add(seaW);
    seaW.lifetime=600/2;
    
    var coin=createSprite(xPos,yPos-80,30,30);
    coin.addImage("coin",coinImg);
    coin.scale=0.12;
    coin.velocityY=2;
    coinGroup.add(coin);
    
   }
   if(frog.isTouching(coinGroup))
    {
      score=score+1;    
      coinGroup.destroyEach(); 
    }

   
  }
   
     