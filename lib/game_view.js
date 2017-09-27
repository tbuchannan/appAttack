
const Player = require('./player');
const Game = require('./game');

class GameView {
  constructor(view) {
    this.view = view;
    this.keysDown = {};
    this.validKeys = {65: true, 37: true, 68: true, 39: true, 32: true};

    const page = document.getElementsByTagName("body")[0];
    const canvas = document.getElementById("canvas");

    page.addEventListener("keydown", (e)=>{
        let keyCode = e.keyCode;
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

    animate(time){
      const delta = time - this.lastTime;
      // let fps = Math.floor(1000/delta);

      this.update();
      this.game.draw(this.view);
      this.game.detectCollisions();
      this.lastTime = time;

      let frames = 120;
      setTimeout(()=>{
        requestAnimationFrame(this.animate.bind(this));
      }, 1000/frames);
    }

    load(){
      this.enemySprites = [];
      this.playerSprites = [];
      this.items = [];

      let enemyFileNames = [
        "./sprites/aligator.png",
        "./sprites/aligatorWalk.png",
        "./sprites/aligatorWalkRight.png"
      ];

      let playerFileNames = [
        "./sprites/gumDrop-min.png",
        "./sprites/gumDropDead.png",
        "./sprites/gumDropLeft.png",
        "./sprites/gumDropRight.png"
      ];

      let itemNames = [
        "./sprites/axeOfDoom.png"
      ];

      for (let i = 0; i < enemyFileNames.length; i++){
        let img = new Image();
        img.src = enemyFileNames[i];
        this.enemySprites.push(img);
      }

      for (let j = 0; j < playerFileNames.length; j++){
        let tempImg = new Image();
        tempImg.src = playerFileNames[j];
        this.playerSprites.push(tempImg);
      }

      for (let k = 0; k < itemNames.length; k++){
        let itemImg = new Image();
        itemImg.src = itemNames[k];
        this.items.push(itemImg);
      }

      this.player = new Player(this.view, this.playerSprites, this.items);
      this.game = new Game(this.player, this.view, this.enemySprites, this.items);
      this.player.addGame(this.game);
    }

    start(){
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }

    update(){
      if (32 in this.keysDown){
        this.player.jump();
      }
      if(65 in this.keysDown || 37 in this.keysDown){
          this.player.moveLeft();
      }
      if(68 in this.keysDown || 39 in this.keysDown){
          this.player.moveRight();
      }
    }

}
module.exports = GameView;
