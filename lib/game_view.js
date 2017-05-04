
const Player = require('./player');
const Game = require('./game');

class GameView {
  constructor(view) {
    this.view = view;
    this.player = new Player(view);
    this.game = new Game(this.player);

    const page = document.getElementsByTagName("body")[0];

    page.addEventListener("keydown", (e)=>{
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          this.player.moveUp();
          break;
        case 's':
        case 'ArrowDown':
          this.player.moveDown();
          break;
        case 'a':
        case 'ArrowLeft':
          this.player.moveLeft();
          break;
        case 'd':
        case 'ArrowRight':
        this.player.moveRight();
          break;
      }
      e.preventDefault();
    }, false);

    page.addEventListener("keyup", (e)=>{
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          this.player.vel[1]=0;
          break;
        case 's':
        case 'ArrowDown':
          this.player.vel[1]=0;
          break;
        case 'a':
        case 'ArrowLeft':
        this.player.vel[0] = 0;
          break;
        case 'd':
        case 'ArrowRight':
        this.player.vel[0] = 0;
          break;
      }
      e.preventDefault();
    }, false);

    // .addEventListener("keypress", (e)=>{
    function update(){
      // switch (e.which) {
      //   case 65:
      //   case 97:
      //     break;
      //   case 115:
      //   case 83:
      //     // move down
      //     console.log("DOWN");
      //     break;;
      //   case 100:
      //   case 68:
      //     // move right
      //     console.log("RIGHT");
      //     break;
      //   case 119:
      //   case 87:
      //     // move up
      //     console.log("UP");
      //     break;
      //   default:
      //
      // }
    }
  }

    update(delta){
      this.player.move(delta);
      this.game.draw(this.view);
      // this.player.draw(this.view);

    }

    start(){
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }

    animate(time){
      const delta = time - this.lastTime;
      // debugger
      // console.log(delta);
      this.update(delta);
      this.game.draw(this.view);
      this.lastTime = time;

      requestAnimationFrame(this.animate.bind(this));

      // this.player.move(delta);
    }
}
module.exports = GameView;
