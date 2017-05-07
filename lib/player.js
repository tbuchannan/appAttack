class Player {
  constructor(view) {
    this.pos = [200, 268];
    this.rockBottom = this.pos[1];

    this.vel = [5, 0];
    this.view = view;
    this.width = 101;
    this.height = 114;

    this.img = new Image();
    this.sources = ["./sprites/gumDrop.png", "./sprites/gumDropRight.png", "./sprites/gumDropLeft.png"];
    this.img.src = this.sources[0];
    this.colCount = 37;
    this.rowCount = 10;

    this.lastSprite = [31,9];

    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
    this.gravity = 0.3;
    this.running;
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
      this.vel[1] = -9;
    }
  }

  idle(){
    this.img.src = "./sprites/gumDrop.png";
    this.colCount = 37;
    this.rowCount = 10;
    this.lastSprite = [31,9];
    this.running = "";
  }

  onGround(){
    return this.pos[1] === this.rockBottom;
  }

  draw(){
    this.updateSprite();
    // console.log("Col: "+ this.colCount+ " Row: " + this.rowCount);

    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);
  }

  updateSprite(){
    if (this.running){ this.changeSpriteDirection(); }

    this.currX = ++this.currX % this.colCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.colCount);
    // if (this.currY > this.rowCount) {
    //   this.currY = 0;
    // }
    console.log("X: " + this.currX + " Y: " + this.currY);

    if (this.currY === this.lastSprite[1]){ this.reset(); }

    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
    this.vel[1] += this.gravity;
    this.pos[1] += this.vel[1];

    if (this.pos[1] > this.rockBottom){
      this.pos[1] = this.rockBottom;
      this.vel[1] = 0;
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
    this.resetSpriteVariables();
    this.img.src = this.running === 'right' ? this.sources[1] : this.sources[2];
    
    this.vel[0] = 7;
    this.colCount = 8;
    this.rowCount = 2;
    this.lastSprite = [8,2];
  }
}
module.exports = Player;
