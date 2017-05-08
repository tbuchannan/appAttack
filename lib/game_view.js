
const Player = require('./player');
const Game = require('./game');

class GameView {
  constructor(view) {
    this.view = view;
    this.player = new Player(view);
    this.game = new Game(this.player, view);
    this.player.addGame(this.game);
    this.keysDown = {};
    this.validKeys = [65, 37, 68, 39];


    const page = document.getElementsByTagName("body")[0];

    page.addEventListener("keydown", (e)=>{
        this.keysDown[e.keyCode] = true;
      e.preventDefault();
    });

    page.addEventListener("keyup", (e)=>{
      if (this.validKeys.includes(e.keyCode)){
        this.player.setSpriteAsIdle();
      }
      delete this.keysDown[e.keyCode];
      e.preventDefault();
    });
    page.addEventListener("click", (e)=>{
      e.preventDefault();
      this.player.throwAxe();
    });
  }

    update(delta){
      let modifier = Math.floor(delta / (1000/60));
      // if(87 in this.keysDown || 38 in this.keysDown){
      //   // if (this.player.pos[0] + this.player.width)
      //   this.player.moveUp(modifier);
      // }
      // if(83 in this.keysDown || 40 in this.keysDown){
      //   this.player.moveDown(modifier);
      // }
      // console.log(this.keysDown);

      if (32 in this.keysDown){
        this.player.jump();
      }
      if(65 in this.keysDown || 37 in this.keysDown){
          this.player.moveLeft(modifier);
      }
      if(68 in this.keysDown || 39 in this.keysDown){
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
      this.game.detectCollisions();
      this.lastTime = time;
      let frames = 60;
      setTimeout(()=>{
        requestAnimationFrame(this.animate.bind(this));
      }, 1000/frames);
    }
}
module.exports = GameView;
