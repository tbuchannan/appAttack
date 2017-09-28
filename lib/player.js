const Axe = require('./axe');
class Player {
  constructor(view, sprites, items) {
    this.pos = [0, 268];
    this.rockBottom = this.pos[1];

    this.setStats();

    this.vel = [7, 0];
    this.width = 101;
    this.height = 114;

    this.sprites = sprites;
    this.activeSprite = this.sprites[0];

    this.srcX = 0;
    this.srcY = 0;
    this.gravity = 1.5;
    this.alive = true;

    this.score = 0;

    this.items = items;
    this.view = view;
    this.lastDirection = 'right';
    this.setSpriteAsIdle();
  }

  onLoadFunc() {
    this.setSpriteAsIdle();
  }

  moveLeft(){
    if(this.alive){
      this.pos[0] -= this.vel[0];
      this.running = "left";
      this.lastDirection = 'left';
    }
  }

  moveRight(){
    if(this.alive){
      this.pos[0] += this.vel[0];
      this.running = "right";
      this.lastDirection = 'right';
    }
  }

  jump(){
    if (this.onGround()){
      this.vel[1] = -20;
    }
  }

  die(){
    this.alive = false;
    this.running = "";
    this.changeSpriteDirection();
    // this.view.stop();
    this.game.gameOver();
  }


  setSpriteAsIdle(){
    this.reset();
    this.activeSprite = this.sprites[0];
    this.colCount = 37;
    this.rowCount = 10;
    this.lastSprite = [31,9];
    this.running = "";
  }

  throwAxe(dir){
    let throwDir;
    if(this.alive){
      if (dir){
        throwDir = dir === 'left' ? -1 : 1;
      }else {
        throwDir = this.running === "left" ? -1 : 1;
      }
      let axe = new Axe([this.pos[0], this.pos[1]], this.view, throwDir, this.game, this.items[0]);
      this.game.addAxe(axe);
    }
  }

  onGround(){
    return this.pos[1] === this.rockBottom;
  }

  draw(){
    this.updateSprite();

    this.view.drawImage(
      this.activeSprite, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height
    );
    // this.view.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
    // this.view.strokeStyle = 'red';
  }

  updateSprite(){
    if (this.currentHealth < 0 && this.alive){
      this.die();
    } else if (this.running){
       this.changeSpriteDirection();
     }

    this.currX = ++this.currX % this.colCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.colCount);

    if (this.currY === this.lastSprite[1] && this.currX === this.lastSprite[0]){
      if(this.alive){
        this.reset();
      }
      else {
        this.currY = -1;
        this.currX = -1;
      }
     }

    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
    this.vel[1] += this.gravity;
    this.pos[1] += this.vel[1];

    this.checkBoundaries();

  }

  checkBoundaries(){
    if (this.pos[1] > this.rockBottom){
      this.pos[1] = this.rockBottom;
      this.vel[1] = 0;
    }
    if (this.pos[0] < 0){
      this.pos[0] = 0;
    }
    if (this.pos[0] > this.view.canvas.width ){
      this.pos[0] = this.view.canvas.width - 10 ;
    }
  }

  reset(){
    this.currX = 0;
    this.currY = 0;
    this.frames = 0;
  }

  resetSpriteVariables(){
    if (this.currX > this.colCount || this.currY > this.rowCount){
      this.reset();
    }
  }

  changeSpriteDirection(){
    if(this.alive){
      this.colCount = 8;
      this.rowCount = 2;
      this.lastSprite = [7,1];
      this.resetSpriteVariables();
      this.activeSprite = this.running === 'right' ?
      this.sprites[3] : this.sprites[2];
    } else {
      this.colCount = 9;
      this.rowCount = 5;
      this.lastSprite = [8, 4];
      this.resetSpriteVariables();
      this.activeSprite = this.sprites[1];
    }
  }

  addGame(game){
    this.game = game;
  }

  isTouching(){ }

  takeDamage(damageDealt){
    this.currentHealth -= damageDealt;
  }

  setStats(){
    // Random attack between 20 and 30
    // Random health between 200 and 300

    this.maxHealth = Math.floor(Math.random() * (300 - 200)) + 200;
    this.currentHealth = this.maxHealth;
  }
}
module.exports = Player;
