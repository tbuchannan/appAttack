const Player = require('./player');
const Enemy = require('./enemy');
class Game {
  constructor(player, view) {
    this.player = player;
    this.enemies = [];
    this.skillShots = [];
    this.view = view;

    this.addEnemies();
  }

  draw(view){
    view.clearRect(0, 0, 5000, 500);
    view.fillStyle = "red";
    this.player.draw(view);
    this.enemies.forEach((enemy)=>{enemy.draw(view);});
  }

  addEnemies(){
    for (let i = 0; i < 5; i++) {
      this.enemies.push(new Enemy(this.view));
    }
  }
}
module.exports = Game;
