const Axe = require('./axe');
class Player {
  constructor(view, game) {
    this.pos = [0, 268];
    this.rockBottom = this.pos[1];

    this.vel = [7, 0];
    this.width = 101;
    this.height = 114;

    this.img = new Image();
    this.setSpriteAsIdle();

    this.srcX = 0;
    this.srcY = 0;
    this.gravity = 0.3;

    this.game = game;
    this.view = view;
  }

  moveLeft(modifier){
    this.pos[0] -= this.vel[0];
    this.running = "left";
  }

  moveRight(modifier){
    this.pos[0] += this.vel[0];
    this.running = "right";
  }

  moveUp(modifier){
    this.pos[1] -= this.vel * modifier;
  }

  moveDown(modifier){
    this.pos[1] += this.vel * modifier;
  }

  jump(){
    if (this.onGround()){
      console.log("I'm on the ground!");
      this.vel[1] = -10;
    }
  }

  setSpriteAsIdle(){
    this.reset();
    this.img.src = "./sprites/gumDrop.png";
    this.colCount = 37;
    this.rowCount = 10;
    this.lastSprite = [31,9];
    this.running = "";
  }

  throwAxe(){
    let throwDir = this.running === "left" ? -1 : 1;
    let axe = new Axe([this.pos[0], this.pos[1]], this.view, throwDir, this.game);
    this.game.addAxe(axe);
  }

  onGround(){
    return this.pos[1] === this.rockBottom;
  }

  draw(){
    this.updateSprite();
    // console.log("Col: "+ this.currY + " Row: " + this.currX);

    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height
    );
    // this.view.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
  }

  updateSprite(){
    if (this.running){ this.changeSpriteDirection(); }

    this.currX = ++this.currX % this.colCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.colCount);
    // if (this.currY > this.rowCount) {
    //   this.currY = 0;
    // }

    if (this.currY === this.lastSprite[1] && this.currX === this.lastSprite[0]){
       this.reset();
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
    this.colCount = 8;
    this.rowCount = 2;
    this.lastSprite = [7,1];
    this.resetSpriteVariables();
    this.img.src = this.running === 'right' ?
      "./sprites/gumDropRight.png" : "./sprites/gumDropLeft.png";
  }
  addGame(game){
    this.game = game;
  }

  isTouching(){ }
}
module.exports = Player;
