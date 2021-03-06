const Player = require('./player');
const Axe = require('./axe');
class Enemy {
  constructor(view, game, sprites) {
    let x = Math.floor(Math.random() * 900 + 100);
    this.pos = [x, 215];
    this.vel = [Math.floor(Math.random() *  2)];
    this.view = view;
    this.width = 251;
    this.height = 186;

    this.sprites = sprites;

    this.setSprite();

    this.setStats();

    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
    this.game = game;
    this.alive = true;
    this.injured = false;
  }

  setSprite(){
    if (this.vel[0] === 0){
      this.rowCount = 9;
      this.colCount = 15;
      this.lastSprite = [14,8];
      this.activeSprite = this.sprites[0];
    } else {
      this.activeSprite = this.sprites[1];
      this.rowCount = 6;
      this.colCount = 3;
      this.lastSprite = [ 0, 5];
    }
  }


  move() {
  this.pos[0] -= this.vel[0];
  this.checkBoundaries();
}

  draw(){
    if (Math.random() * 10 > 6.5){
      this.updateSprite();
    }
    this.view.drawImage(
      this.activeSprite, this.srcX, this.srcY, this.width, this.height, this.pos[0],
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
      this.activeSprite = this.sprites[2];
    }
    if (this.pos[0] > this.view.canvas.width - this.width/2){
      this.vel[0] *= -1;
      this.pos[0] = this.view.canvas.width - this.width/2;
      this.activeSprite = this.sprites[1];
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
      if(this.currentHealth <= 0){
        this.game.remove(this);
      }
      this.game.remove(otherObject);
    }
  }

  takeDamage(){
    let damage = Math.floor(Math.random() * (30 - 25)) + 25;
    this.currentHealth -= damage;
    this.injured = true;

  }

  drawDamage(damage){

  }

  setStats(){
    // Random health between 150 - 200
    // Random attack between 15 - 20
    this.maxHealth = Math.floor(Math.random() * (300 - 200)) + 200;
    this.currentHealth = this.maxHealth;
  }
}
module.exports = Enemy;
