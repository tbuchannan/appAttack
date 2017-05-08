const Player = require('./player');
const Enemy = require('./enemy');
const Axe = require('./axe');
class Game {
  constructor(player, view) {
    this.player = player;
    this.enemies = [];
    this.axes = [];
    this.view = view;

    this.addEnemies();
  }

  allObjects(){
    return [].concat(this.player, this.enemies, this.axes);
  }

  detectCollisions(){
    let allObjects = this.allObjects();
    let length = allObjects.length
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        let objectOne = allObjects[i];
        let objectTwo = allObjects[j];

        if (objectOne.isTouching(objectTwo)){
          let result = objectOne.collidedWith(objectTwo);
          if (result) {return;}
        }
      }
    }
  }


  draw(view){
    view.clearRect(0, 0, view.canvas.width, view.canvas.height);
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
    if (item instanceof Axe){
      this.axes.splice(this.axes.indexOf(item), 1);
    } else if (item instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(item), 1);
    }
  }

}
module.exports = Game;
