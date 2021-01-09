//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  SdogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkimg = loadImage("images/Milk.png");

}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  
  foodObj = new Food();
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog = createSprite(800,220,150,150);
  dog.addImage(SdogImg)
  dog.scale = 0.15

  // milk = createSprite(720, 220,150,150);
  // milk.scale = 0

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  //add styles here

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill(255);
  textSize(20);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + "PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350, 30);
  }else{
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }

  
  drawSprites();
  
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function writeStock(foodS){
  //database.ref('/').update({
 // 'Food': foodS 
  //})  
//}

function feedDog(){
  dog.addImage(happyDog);
  //milk.addImage(milkimg);
  //milk.scale = 0.1;
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
 //foodObj.addF();
  //foodObj.updateFoodStock();
  foodS++;

  database.ref('/').update({
    Food : foodS
  })
}

// async function hour(){
//   var site = await fetch("http://worldtimeapi.org/api/timezone/America/New_York");
//   var siteJSON = await site.json();
//   var datetime = siteJSON.datetime;
//   var hourTime = datetime.slice(11,13);
//   return hourTime;
// }