const Player = require('./player');
const Enemy = require('./enemy');
const Axe = require('./axe');
const Hud = require('./hud');
class Game {
  constructor(player, view) {
    this.player = player;
    this.enemies = [];
    this.axes = [];
    this.view = view;

    this.hud = new Hud(this.view, this.player);


    this.addEnemies();
  }

  allObjects(){
    return [].concat(this.player, this.enemies, this.axes);
  }

  detectCollisions(){
    let allItems = this.allObjects();
    let itemCount = allItems.length;
    for (let i = 0; i < itemCount; i++) {
      for (let j = 0; j < itemCount; j++) {
        let objectOne = allItems[i];
        let objectTwo = allItems[j];

        if (objectOne.isTouching(objectTwo)){
          let result = objectOne.collidedWith(objectTwo);
          if (result) {return;}
        }
      }
    }
  }


  draw(view){
    view.clearRect(0, 0, view.canvas.width, view.canvas.height);
    this.hud.draw();
    this.axes.forEach((axe)=>{
      axe.draw(view);
    });
    this.player.draw(view);
    this.enemies.forEach((enemy)=>{
      enemy.move();
      enemy.draw(view);
    });
  }

  addEnemies(){
    for (let i = 0; i < 10; i++) {
      this.enemies.push(new Enemy(this.view, this));
    }
  }

  addAxe(axe){
    if (this.axes.length > 10){
      this.axes.splice(0, 1);
    }
    this.axes.push(axe);
  }

  remove(item){
    let totalEnemies = this.enemies.length;
    if (item instanceof Axe){
      this.axes.splice(this.axes.indexOf(item), 1);
    } else if (item instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(item), 1);
    }
    if (totalEnemies <= 0 ){ this.addEnemies(); }
  }


}
module.exports = Game;
