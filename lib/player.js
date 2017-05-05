class Player {
  constructor(view) {
    // this.x_pos = 200;
    // this.y_pos = 200;
    this.pos = [200, 268];
    this.rockBottom = this.pos[1];
    this.vel = [5, 0];
    this.view = view;
    this.width = 101;
    this.height = 114;
    // width: 101
    //  height: 114
    this.img = new Image();
    this.img.src = "./sprites/gumDrop.png";
    this.rowCount = 37;
    this.colCount = 10;
    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
    this.gravity = 0.3;

  }

  moveLeft(modifier){
    console.log(modifier);
    this.pos[0] -= this.vel[0];
  }

  moveRight(modifier){
    this.pos[0] += this.vel[0];
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

  onGround(){
    return this.pos[1] === this.rockBottom;
  }

//   move(timeDelta) {
//    let fps = 1000/60;
//    console.log(timeDelta/fps);
//    const velocity = timeDelta / fps,
//        offsetX = this.vel[0] * velocity,
//        offsetY = (this.vel[1] + this.gravity) * velocity;
//

//
//     this.pos[0] += offsetX;
//     this.pos[1] += offsetY;
//
// }

  draw(){
    // let sprite = new Image ();
    this.updateSprite();
    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);

  }

  updateSprite(){
    this.currX = ++this.currX % this.rowCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.rowCount);
    if (this.currY > 10) {
      this.currY = 0;
    }
    if (this.currY === 9 && this.currX === 31){
      this.currX = 0;
      this.currY = 0;
      this.frames = 0;
    }
    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
    this.vel[1] += this.gravity;
    this.pos[1] += this.vel[1];
       if (this.pos[1] > this.rockBottom){
        this.pos[1] = this.rockBottom;
        this.vel[1] = 0;
        }
    // console.log('This is X: ' + this.currX, 'This is Y: ' + this.currY);

  }
}
module.exports = Player;
