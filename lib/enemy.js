const Player = require('./player');
const Axe = require('./axe');
class Enemy {
  constructor(view, game) {
    let x = Math.floor(Math.random() * 900 + 100);
    this.pos = [x, 215];
    this.vel = [Math.floor(Math.random() *  2)];
    this.view = view;

    this.width = 251;
    this.height = 186;
    this.img = new Image();
    this.img.onload = this.setSprite();

    this.setSprite();
    this.setStats();

    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
    this.game = game;
  }

  setSprite(){
    if (this.vel[0] === 0){
      this.rowCount = 9;
      this.colCount = 15;
      this.lastSprite = [14,8];
      this.img.src = "./sprites/aligator.png";
    } else {
      this.img.src = "./sprites/aligatorWalk.png";
      this.rowCount = 6;
      this.colCount = 3;
      this.lastSprite = [ 0, 5];
    }
  }


  move() {
  //  let fps = 1000/60;
  //  const velocity = timeDelta / fps,
      //  offsetX = this.vel * velocity,
      //  offsetY = this.vel * velocity;
  //  this.pos[1] += offsetY;
  this.pos[0] -= this.vel[0];
  this.checkBoundaries();
}

  draw(){
    if (Math.random() * 10 > 6.5){
      this.updateSprite();
    }
    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);

      // this.view.strokeRect(this.pos[0]-25, this.pos[1]+40, this.width, this.height);
      // this.view.strokeStyle = 'red';
  }

  updateSprite(){

    this.currX = ++this.currX % this.colCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.colCount);

    if (this.currX === this.lastSprite[0] && this.currY === this.lastSprite[1]){
      this.reset();
    }

    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
  }

  reset(){
    this.currX = 0;
    this.currY = 0;
    this.frames = 0;
  }

  checkBoundaries(){
    if (this.pos[0] < 0){
      this.pos[0] = 0;
      this.vel[0] *= -1;
      this.img.src = "./sprites/aligatorWalkRight.png";
    }
    if (this.pos[0] > this.view.canvas.width - this.width/2){
      this.vel[0] *= -1;
      this.pos[0] = this.view.canvas.width - this.width/2;
      this.img.src = "./sprites/aligatorWalk.png";
    }
  }

  isTouching(otherObject){
    if (this.pos[0] < otherObject.pos[0] + (otherObject.width - 25)/2  &&
      this.pos[0] + (this.width - 25)/2 > otherObject.pos[0] &&
      (this.pos[1] + 80) < otherObject.pos[1] + otherObject.height &&
      this.height + (this.pos[1] + 0) > otherObject.pos[1])
      {
        this.collidedWith(otherObject);
      }
    }

  collidedWith(otherObject){
    if(otherObject instanceof Player){
      otherObject.takeDamage(Math.floor(Math.random() * 2));
    } else if(otherObject instanceof Axe && otherObject.live){
      this.takeDamage();
      console.log(this.health);
      if(this.health <= 0){
        this.game.remove(this);
      }
      this.game.remove(otherObject);
    }
  }

  takeDamage(){
    let damage = Math.floor(Math.random() * (30 - 25)) + 25;
    this.health -= damage;

    // Displaying damage taken
    this.drawDamage(damage);
    this.view.font = "40px Bangers";

    let gradient = this.view.createLinearGradient(0, 0, 0, 40);
    gradient.addColorStop(1, 'yellow');
    gradient.addColorStop(.5, 'orange');
    gradient.addColorStop(.06, 'red');
    this.view.fillStyle = gradient;


    this.view.strokeStyle = 'black';
    this.view.lineWidth = 8;
    this.view.strokeText(`${damage}`, this.pos[0], this.pos[1]);
    this.view.fillText(`${damage}`, this.pos[0], this.pos[1]);
    // END
  }

  drawDamage(damage){

  }

  setStats(){
    // Random health between 150 - 200
    // Random attack between 15 - 20
    this.health = Math.floor(Math.random() * (150 - 100) + 100);
  }
}
module.exports = Enemy;
