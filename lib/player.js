class Player {
  constructor(view) {
    this.x_pos = 200;
    this.y_pos = 200;
    this.vel = [0,0];
    this.draw(view);
  }

  move(x, y){
    // console.log("Old Pos: "+ [this.x_pos, this.y_pos]);
    this.x_pos += x;
    this.y_pos += y;
  }
  moveLeft(){
    this.vel[0] = -5;
  }

  moveRight(){
    this.vel[0] = 5;
  }

  moveUp(){
    this.vel[1] = -5;
  }

  moveDown(){
    this.vel[1] = 5;
  }

  move(timeDelta) {
   let fps = 1000/60;
   const velocity = timeDelta / fps,
       offsetX = this.vel[0] * velocity,
       offsetY = this.vel[1] * velocity;

   this.x_pos += offsetX;
   this.y_pos += offsetY;

}

  draw(view){
    // let sprite = new Image ();
      view.beginPath();
      view.arc(this.x_pos, this.y_pos, 20, 0, 2 * Math.PI, false);
      view.fillStyle = 'green';
      view.fill();
      view.lineWidth = 5;
      view.strokeStyle = '#003300';
      view.stroke();
  }
}
module.exports = Player;
