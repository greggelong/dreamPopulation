

let fated = false;
let greg; //variable to hold gurtle
let population=[];
let pressed = false //for de bouncing
function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  for (let i =0;i<80;i++){
    population[i]= new Creature(color(128,255),random(5,30))
  
  }
   
}


function draw(){
  background(0)
  for (let i = 0; i<population.length; i++){
  population[i].show();
  population[i].squirm(frameCount)
  population[i].move();
  }
}


function mousePressed(){
  let fate = random([instr,instr2])
  if (!pressed){
    pressed = true;
  if (!fated){
  for (let i =0;i<population.length;i++){
    population[i].gene = fate
    fated = true
  }
} else{
  for (let i =0;i<population.length;i++){
    population[i].gene = random([instr,instr2])
    fated = false
  }

}
  }
}


function mouseReleased(){
  pressed = false;
}