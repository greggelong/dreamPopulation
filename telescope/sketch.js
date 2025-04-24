let fated = false;
let greg; //variable to hold gurtle
let population = [];
let pressed = false; //for de bouncing
let bg;
let cnv;

function preload() {
  bg = loadImage("bgbj.jpg");
}
function setup() {
  pixelDensity(1);
  cnv = createCanvas(658, 375);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  bg.resize(width, height);
  angleMode(DEGREES);
  for (let i = 0; i < 21; i++) {
    population[i] = new Creature(color(255, 255), random(5, 30));
  }
}

function draw() {
  background(bg);
  for (let i = 0; i < population.length; i++) {
    population[i].show();
    population[i].squirm(frameCount);
    population[i].wither(); // forgot to call tis
    population[i].move();
  }

  if (!fated) {
    fill(255, 255, 0);
    textSize(30);
    noStroke();
    text("Press anywhere to choose fate", 10, 50);
  } else {
    fill(255, 0, 0);
    textSize(20);
    noStroke();
    text("After result press anywhere reset population", 10, 50);
  }
}

function mouseClicked() {
  let fate = random([instr, instr2]);
  if (!pressed) {
    pressed = true;
    if (!fated) {
      for (let i = 0; i < population.length; i++) {
        if (population[i].gene === fate) {
          population[i].dying = true;
        }
        fated = true;
      }
    } else {
      for (let i = 0; i < population.length; i++) {
        population[i].gene = random([instr, instr2]);
        population[i].dying = false;
        population[i].dead = false;
        population[i].sz = random(5, 30); //reset size
        population[i].deathClock = random(100, 500); // need to reset death clock too
      }
      fated = false;
    }
  }
}

function mouseReleased() {
  pressed = false;
}
