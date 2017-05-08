class Axe{
  constructor(pos, view, throwDir, game) {
    // console.log(pos);
    this.vel = [8 * throwDir, -5 ];
    this.srcX = 0;
    this.srcY = 0;
    this.pos = pos;
    this.rockBottom = 325;
    this.view = view;
    this.gravity = 0.3;
    this.width = 48;
    this.height = 44;
    this.img = new Image();
    this.img.src = "./sprites/axeOfDoom.png";
    this.live = true;
    this.game = game;
  }

  draw(){
    this.updateSprite();

    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height
    );
      // this.view.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
  }

  updateSprite(){
    this.pos[0] += this.vel[0];
    this.vel[1] += this.gravity;
    this.pos[1] += this.vel[1];
    this.checkBoundaries();
  }

  checkBoundaries(){
    if (this.pos[1] > this.rockBottom){
      this.pos[1] = this.rockBottom;
      this.vel[1] = 0;
      this.vel[0] = 0;
      this.game.remove(this);
    }
  }
  isTouching(){ }
}
module.exports = Axe;
