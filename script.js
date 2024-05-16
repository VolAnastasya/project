class Particle {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(1,8);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }


  createParticle() {
    noStroke();
    fill('darkred');
    circle(this.x,this.y,this.r);
  }

  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

  
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        strokeWeight(1)
        stroke('rgba(255,255,255,0.04)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}


let particles = [];

let score = 0; 
let x = 100; 
let y = 100; 
let targetX; 
let targetY; 
let targetRadius = 20; 
let radius = 20; 
let speed = 5; 
let track = [];


function setup() {
  createCanvas(720, 400);
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }

  targetX = random(width); 
  targetY = random(height); 
}

function draw() {
  background('#0f0f0f');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }

  fill(176, 219, 255); 
  stroke(0,0,0)
  strokeWeight(2)
  ellipse(targetX, targetY, targetRadius * 2, targetRadius * 2);


  fill(216, 182, 239);
  stroke(0,0,0)
  strokeWeight(2)
  ellipse(x, y, radius * 2, radius * 2);

  for(var i=0; i<track.length; i++) {
      strokeWeight(0)
    fill(216, 182, 239, (255/track.length)*i);
    ellipse(track[i].x, track[i].y, radius * 2, radius * 2);
  }


  if (dist(x, y, targetX, targetY) < radius + targetRadius) {
    score++; 
    track.push({x: x, y: y});
    targetX = random(width); 
    targetY = random(height); 
  }


  if (keyIsDown(LEFT_ARROW) && x > radius) {
    x -= speed;
  }
  if (keyIsDown(RIGHT_ARROW) && x < width - radius) {
    x += speed;
  }
  if (keyIsDown(UP_ARROW) && y > radius) {
    y -= speed;
  }
  if (keyIsDown(DOWN_ARROW) && y < height - radius) {
    y += speed;
  }

  for(var i=0; i<track.length; i++) {
    track[i].x += (x-track[i].x)*(0.1*(i+1))
    track[i].y += (y-track[i].y)*(0.1*(i+1))
  }


  textSize(32);
  fill(255, 235, 243);
  stroke(0,0,0)
  strokeWeight(7)
  text("Scores: " + score, 10, 30);

}
