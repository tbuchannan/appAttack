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

  allObjects(){
    [].concat(this.player, this.enemies, this.skillShots);
  }

  draw(view){
    view.clearRect(0, 0, view.canvas.width, view.canvas.height);
    this.player.draw(view);
    this.enemies.forEach((enemy)=>{
      enemy.move();
      enemy.draw(view);
    });
    debugger
  }

  addEnemies(){
    for (let i = 0; i < 15; i++) {
      this.enemies.push(new Enemy(this.view));
    }
  }
}
module.exports = Game;
