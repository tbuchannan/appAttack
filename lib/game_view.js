
const Player = require('./player');
const Game = require('./game');

class GameView {
  constructor(view) {
    this.view = view;
    this.player = new Player(view);
    this.game = new Game(this.player, view);
    this.keysDown = {};

    const page = document.getElementsByTagName("body")[0];

    page.addEventListener("keydown", (e)=>{
        this.keysDown[e.keyCode] = true;
      e.preventDefault();
    });

    page.addEventListener("keyup", (e)=>{
      delete this.keysDown[e.keyCode];
      e.preventDefault();
    });

  }

  inBounds(pos){
    // TODO: this will need to change once you have a viewport sort of thing;
    if ((pos[0] > 0 && pos[0] < this.view.canvas.width) &&
    (pos[1] > 0 && pos[1] < this.view.canvas.height)){
      return true;
    }
    return false;
  }

    update(delta){
      let modifier = Math.floor(delta / (1000/60));
      if(87 in this.keysDown){
        if (this.player.pos[0] + this.player.width)
        this.player.moveUp(modifier);
      }
      if(83 in this.keysDown){
        this.player.moveDown(modifier);
      }
      if(65 in this.keysDown){
        this.player.moveLeft(modifier);
      }
      if(68 in this.keysDown){
        this.player.moveRight(modifier);
      }
      this.game.draw(this.view);
    }

    start(){
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }

    animate(time){
      const delta = time - this.lastTime;
      this.update(delta);
      this.game.draw(this.view);
      this.lastTime = time;
      let frames = 40;
      setTimeout(()=>{
        requestAnimationFrame(this.animate.bind(this));
      }, 1000/frames);


    }
}
module.exports = GameView;
