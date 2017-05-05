
class Enemy {
  constructor(view) {
    // this.x_pos = 200;
    // this.y_pos = 200;
    let x = Math.floor(Math.random() * 1000 + 200);
    let y = Math.floor(Math.random() * 500);

    this.pos = [x, y];
    this.vel = 0;
    this.view = view;
    this.width = 251;
    this.height = 186;
    this.img = new Image();
    this.img.src = "./sprites/aligator.png";
    this.rowCount = 15;
    this.colCount = 9;
    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
  }


  move(timeDelta) {
   let fps = 1000/60;
   const velocity = timeDelta / fps,
       offsetX = this.vel * velocity,
       offsetY = this.vel * velocity;

   this.pos[0] += offsetX;
   this.pos[1] += offsetY;

}

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
    if (this.currY > 9) {
      this.currY = 0;
    }
    if (this.currY === 8 && this.currX === 14){
      this.currX = 0;
      this.currY = 0;
      this.frames = 0;
    }
    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
    // console.log('This is X: ' + this.currX, 'This is Y: ' + this.currY);

  }
}
module.exports = Enemy;
