class Player {
  constructor(view) {
    // this.x_pos = 200;
    // this.y_pos = 200;
    this.pos = [200, 200];
    this.vel = 5;
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
  }

  moveLeft(modifier){
    this.pos[0] -= this.vel * modifier;
  }

  moveRight(modifier){
    this.pos[0] += this.vel * modifier;
  }

  moveUp(modifier){
    this.pos[1] -= this.vel * modifier;
  }

  moveDown(modifier){
    this.pos[1] += this.vel * modifier;
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

      // view.beginPath();
      // view.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, false);
      // view.fillStyle = 'green';
      // view.fill();
      // view.lineWidth = 5;
      // view.strokeStyle = '#003300';
      // view.stroke();
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
    // console.log('This is X: ' + this.currX, 'This is Y: ' + this.currY);

  }
}
module.exports = Player;
