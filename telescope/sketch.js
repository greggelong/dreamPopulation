let fated = false;
let greg; //variable to hold gurtle
let population = [];
let pressed = false; //for de bouncing
let bg;
let cnv;
let dy;
let x, y, angle;
let noiseOffsetX = 0;
let noiseOffsetY = 1000;
let noiseOffsetAngle = 2000;

function preload() {
  bg = loadImage("bgbj.jpg");
  dy1 = loadImage("dy.png");
}
function setup() {
  pixelDensity(1);
  cnv = createCanvas(658 * 1.3, 375 * 1.3);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  bg.resize(width, height);
  angleMode(DEGREES);
  dy1.resize(0, 100);
  // to crop a segment of the image using coordinates
  dy = dy1.get(0, 0, dy1.width, 70);
  for (let i = 0; i < 21; i++) {
    population[i] = new Creature(color(255, 255), random(5, 30));
  }
}

function draw() {
  background(bg);
  // Update position and angle with Perlin noise
  x = noise(noiseOffsetX) * width;
  y = noise(noiseOffsetY) * height;
  angle = noise(noiseOffsetAngle) * TWO_PI;

  noiseOffsetX += 0.005;
  noiseOffsetY += 0.005;
  noiseOffsetAngle += 0.002;
  // Constrain to keep entire image on canvas
  let halfW = dy.width / 2;
  let halfH = dy.height / 2;
  x = constrain(x, halfW, width - halfW);
  y = constrain(y, halfH, height - halfH);

  push();
  translate(x, y);
  rotate(angle);
  image(dy, 0, 0);
  pop();

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
