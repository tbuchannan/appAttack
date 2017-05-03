const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = 5000;
  canvas.height = 500;

  const context = canvas.getContex("2d");
  const game = new Game();
  new GameView(game, context).start();
});


class Game {
  constructor() {
    this.player = [];
    this.enemies = [];

    this.addEnemies();
  }



  addEnemies(){
    for (let i = 0; i < GAME.TEMP_ENEMIES; i++) {
      array[i]
    }
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const canvas = document.getElementById("canvas");
//   const stage = new createjs.Stage("canvas");
//
//   createjs.Ticker.on("tick", tick);
//   createjs.Ticker.setFPS(60)
//
//   function tick(){
//
//   }
//
//   window.addEventListener("keydown", (e) =>{
//     debugger
//     switch (e.keyCode) {
//       case 37:
//
//         break;
//       case 38:
//
//         break;
//       case 39:
//
//         break;
//       case 40:
//
//         break;
//       default:
//
//     }
//
//       break;
//   });
//
//   function drawCircle(){
//   var circle = new createjs.Shape();
//   circle.graphics.beginFill("red").drawCircle(0,0,100);
//   circle.x = 100;
//   circle.y = 100;
//   stage.addChild(circle);
//   }
//
//   function drawStuff(){
//     drawCircle();
//     stage.update();
//   }
//
//   drawStuff();
// });
