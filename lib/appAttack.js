const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = 5000;
  canvas.height = 500;

  const view = canvas.getContext("2d");
  // const game = new Game();
  new GameView(view).start();
});
