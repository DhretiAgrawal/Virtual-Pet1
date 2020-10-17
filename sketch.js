//Create variables here
var dogSprite , dogImg , happyDog , database , foodS = 0 ,foodStock ;

function preload()
{
  //load images here
  dogImg =loadImage("dog.png");
  happyDog=loadImage("happydog.png");
}

function setup() {
  database = firebase.database(); 
  createCanvas(500, 500);
  foodStock=database.ref("Food");
  foodStock.on("value", readStock); 
  dogSprite = createSprite(250,300,10,10);
  dogSprite.addImage(dogImg);
  dogSprite.scale =0.2;
}

//Dog sprite is not created. Without the sprite object how can you add image to it, so check that
function draw() {  
  background(46,139,87);
  //image(dogImg, 50, 200,200,200);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke("white");
  text("Food Remaining : ",200,200);

  textSize(20);
  fill("black");
  stroke("white");
  text("Note: PressUP_ARROW Key To Feed Drago Milk ",50,50);
  

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



