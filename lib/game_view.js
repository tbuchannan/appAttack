
const Player = require('./player');
const Game = require('./game');

class GameView {
  constructor(view) {
    this.view = view;
    this.player = new Player(view);
    this.game = new Game(this.player, view);
    this.player.addGame(this.game);
    this.keysDown = {};
    this.validKeys = {65: true, 37: true, 68: true, 39: true, 16: true, 32: true};



    const page = document.getElementsByTagName("body")[0];
    const canvas = document.getElementById("canvas");

    page.addEventListener("keydown", (e)=>{
        let keyCode = e.keyCode;
        console.log(keyCode);
        // prevents user from holding the shoot button and spamming axes.
        if (keyCode !== 16) {
          this.keysDown[keyCode] = true;
          if (keyCode in this.validKeys){
            e.preventDefault();
          }
        }
    });

    page.addEventListener("keyup", (e)=>{
      let keyCode = e.keyCode;

      if (keyCode === 16){
          this.player.running === "left" ? this.player.throwAxe("left") : this.player.throwAxe('right');
      }
      if (keyCode in this.validKeys && this.player.alive){
        this.player.setSpriteAsIdle();
      }
      delete this.keysDown[keyCode];
        e.preventDefault();

    });

    canvas.addEventListener("click", (e)=>{
      let rect = e.currentTarget.getBoundingClientRect();
      let pos = e.clientX - rect.left;
      let dir = pos > this.player.pos[0] ? 'right' : 'left';
      this.player.throwAxe(dir);
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
      if(16 in this.keysDown){

      }
      this.game.draw(this.view);
    }

    start(){
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }

    animate(time){
      const delta = time - this.lastTime;

      let fps = Math.floor(1000/delta);
      // console.log(fps);

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
