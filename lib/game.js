const Player = require('./player');

class Game {
  constructor(player) {
    this.player = player;
    this.enemies = [];
    this.skillShots = [];
  }

  draw(view){
    view.clearRect(0, 0, 5000, 500);
    view.fillStyle = "red";
    this.player.draw(view);
  }
}
module.exports = Game;
