class Axe{
  constructor(pos, view, throwDir, game, sprite) {
    this.vel = [25 * throwDir, -5 ];
    this.srcX = 0;
    this.srcY = 0;
    this.pos = pos;
    this.rockBottom = 325;
    this.view = view;
    this.gravity = 1.5;
    this.width = 48;
    this.height = 44;
    this.sprite = sprite;
    this.live = true;
    this.game = game;
  }

  draw(view){
    this.updateSprite();

    this.view.drawImage(
      this.sprite, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);
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
      this.game.remove(this);
    }
  }

  isTouching(){ }
}
module.exports = Axe;
