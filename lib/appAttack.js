const Game = require("./game");
const GameView = require("./game_view");

window.addEventListener("load", function(e){
  const canvas = document.getElementsByClassName("canvas")[0];
  canvas.width = 1200;
  canvas.height = 500;

  const view = canvas.getContext("2d");
  const game = new GameView(view);
  game.load();
});
