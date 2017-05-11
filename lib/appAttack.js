const Game = require("./game");
const GameView = require("./game_view");

window.addEventListener("load", function(e){
  const canvas = document.getElementById("canvas");
  canvas.width = 1200;
  canvas.height = 500;

  const view = canvas.getContext("2d");
  new GameView(view).start();
});
