const Player = require('./player');
const Enemy = require('./enemy');
const Axe = require('./axe');
const Hud = require('./hud');
class Game {
  constructor(player, view, enemySprites, items) {
    this.player = player;
    this.enemies = [];
    this.axes = [];
    this.view = view;
    this.huds = [new Hud(this.view, this.player)];

    this.enemySprites = enemySprites;
    this.items = items;

    this.addEnemies();
    this.addEnemyHuds();
  }

  addAxe(axe){
    if (this.axes.length > 10){
      this.axes.splice(0, 1);
    }
    this.axes.push(axe);
  }

  addEnemies(){
    for (let i = 0; i < 10; i++) {
      this.enemies.push(new Enemy(this.view, this, this.enemySprites));
    }
  }

  addEnemyHuds(){
    let max = this.enemies.length;
    for(let i = 0; i < max; i++){
      this.huds.push(new Hud(this.view, this.enemies[i]));
    }
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
    this.huds.forEach((hud)=>{
      hud.draw();
    });
    this.axes.forEach((axe)=>{
      axe.draw(view);
    });
    this.player.draw(view);
    this.enemies.forEach((enemy)=>{
      enemy.move();
      enemy.draw(view);
    });
  }

  increaseScore(){
    this.player.score += 1;
  }

  remove(item){
    let totalEnemies = this.enemies.length;
    if (item instanceof Axe){
      this.axes.splice(this.axes.indexOf(item), 1);
    } else if (item instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(item), 1);
      this.removeHud(item);
      this.increaseScore();
    }
    if (totalEnemies <= 0 ){
      this.addEnemies();
      this.addEnemyHuds();
     }
  }

  removeHud(enemy){
    let max = this.huds.length;
    for (let i = 1; i < max; i++) {
      let tempEnemy = this.huds[i].player;
      if (tempEnemy === enemy) {
        this.huds.splice(i, 1);
        break;
      }
    }
  }

  gameOver(){
    let modalClass = document.getElementsByClassName("modal")[0].className;
    let gameOverClass = document.getElementsByClassName("game_over_window")[0].className;
    document.getElementsByClassName("modal")[0].className = modalClass.split(" ")[0];

    document.getElementsByClassName("game_over_window")[0].className = gameOverClass.split(" ")[0];
    document.getElementsByClassName("modal")[0].className += " game_over";
    }

  repopulate(){
    this.enemies = [];
    this.addEnemies();
    this.addEnemyHuds();
    this.player.resurrect();

  }
}
module.exports = Game;
