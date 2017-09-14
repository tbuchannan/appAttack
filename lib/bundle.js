/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Axe{
  constructor(pos, view, throwDir, game) {
    this.vel = [25 * throwDir, -5 ];
    this.srcX = 0;
    this.srcY = 0;
    this.pos = pos;
    this.rockBottom = 325;
    this.view = view;
    this.gravity = 1.5;
    this.width = 48;
    this.height = 44;
    this.img = new Image();
    this.img.src = "./sprites/axeOfDoom.png";
    this.live = true;
    this.game = game;
  }

  draw(view){
    this.updateSprite();

    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);
      // this.view.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
  }

  updateSprite(){
    this.pos[0] += this.vel[0];
    this.vel[1] += this.gravity;
    this.pos[1] += this.vel[1];
    this.checkBoundaries();
  }

  checkBoundaries(){
    if (this.pos[1] > this.rockBottom){
      this.game.remove(this);
    }
  }
  isTouching(){ }
}
module.exports = Axe;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Axe = __webpack_require__(0);
class Player {
  constructor(view, game) {
    this.pos = [0, 268];
    this.rockBottom = this.pos[1];

    this.setStats();

    this.vel = [7, 0];
    this.width = 101;
    this.height = 114;

    this.img = new Image();
    this.img.onload = this.onLoadFunc();

    this.srcX = 0;
    this.srcY = 0;
    this.gravity = 1.5;
    this.alive = true;

    this.game = game;
    this.view = view;
    this.lastDirection = 'right';
  }

  onLoadFunc() {
    this.setSpriteAsIdle();
  }

  moveLeft(modifier){
    if(this.alive){
      this.pos[0] -= this.vel[0];
      this.running = "left";
      this.lastDirection = 'left';
    }
  }

  moveRight(modifier){
    if(this.alive){
      this.pos[0] += this.vel[0];
      this.running = "right";
      this.lastDirection = 'right';
    }
  }

  moveUp(modifier){
    if(this.alive){
      this.pos[1] -= this.vel * modifier;
    }
  }

  moveDown(modifier){
    if(this.alive){
      this.pos[1] += this.vel * modifier;
    }
  }

  jump(){
    if (this.onGround()){
      this.vel[1] = -20;
    }
  }

  die(){
    this.alive = false;
    this.changeSpriteDirection();
  }


  setSpriteAsIdle(){
    this.reset();
    this.img.src = "./sprites/gumDrop-min.png";
    this.colCount = 37;
    this.rowCount = 10;
    this.lastSprite = [31,9];
    this.running = "";
  }

  throwAxe(dir){
    let throwDir;
    if(this.alive){
      if (dir){
        throwDir = dir === 'left' ? -1 : 1;
      }else {
        throwDir = this.running === "left" ? -1 : 1;
      }
      let axe = new Axe([this.pos[0], this.pos[1]], this.view, throwDir, this.game);
      this.game.addAxe(axe);
    }
  }
  // throwAxe(){
  //   let throwDir;
  //   if(this.alive){
  //       throwDir = this.lastDirection === 'left' ? -1 : 1;
  //     }
  //     let axe = new Axe([this.pos[0], this.pos[1]], this.view, throwDir, this.game);
  //     this.game.addAxe(axe);
  //   }

  onGround(){
    return this.pos[1] === this.rockBottom;
  }

  draw(){
    this.updateSprite();
    // console.log("Col: "+ this.currY + " Row: " + this.currX);
    // debugger
    // console.log("SRCX: "+ this.srcX + " Y: " + this.srcY);

    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height
    );
    // this.view.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
    // this.view.strokeStyle = 'red';
  }

  updateSprite(){
    if (this.health < 0 && this.alive){
      this.die();
    } else if (this.running){
       this.changeSpriteDirection();
     }

    this.currX = ++this.currX % this.colCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.colCount);
    // if (this.currY > this.rowCount) {
    //   this.currY = 0;
    // }

    if (this.currY === this.lastSprite[1] && this.currX === this.lastSprite[0]){
      if(this.alive){
        this.reset();
      }
      else {
        this.currY = -1;
        this.currX = -1;
      }
     }

    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
    this.vel[1] += this.gravity;
    this.pos[1] += this.vel[1];

    this.checkBoundaries();

  }

  checkBoundaries(){
    if (this.pos[1] > this.rockBottom){
      this.pos[1] = this.rockBottom;
      this.vel[1] = 0;
    }
    if (this.pos[0] < 0){
      this.pos[0] = 0;
    }
    if (this.pos[0] > this.view.canvas.width ){
      this.pos[0] = this.view.canvas.width - 10 ;
    }
  }

  reset(){
    this.currX = 0;
    this.currY = 0;
    this.frames = 0;
  }

  resetSpriteVariables(){
    if (this.currX > this.colCount || this.currY > this.rowCount){
      this.reset();
    }
  }

  changeSpriteDirection(){
    if(this.alive){
      this.colCount = 8;
      this.rowCount = 2;
      this.lastSprite = [7,1];
      this.resetSpriteVariables();
      this.img.src = this.running === 'right' ?
      "./sprites/gumDropRight.png" : "./sprites/gumDropLeft.png";
    } else {
      this.colCount = 9;
      this.rowCount = 5;
      this.lastSprite = [8, 4];
      this.resetSpriteVariables();
      this.img.src = "./sprites/gumDropDead.png";
    }
  }

  addGame(game){
    this.game = game;
  }

  isTouching(){ }

  takeDamage(damageDealt){
    this.health -= damageDealt;
    // console.log(`CAREFUL you only have ${this.health} Health Left!`);
  }

  setStats(){
    // Random attack between 20 and 30
    // Random health between 200 and 300

    this.health = Math.floor(Math.random() * (300 - 200)) + 200;
  }
}
module.exports = Player;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(1);
const Enemy = __webpack_require__(5);
const Axe = __webpack_require__(0);
const Hud = __webpack_require__(6);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


const Player = __webpack_require__(1);
const Game = __webpack_require__(2);

class GameView {
  constructor(view) {
    this.view = view;
    this.player = new Player(view);
    this.game = new Game(this.player, view);
    this.player.addGame(this.game);
    this.keysDown = {};
    this.validKeys = {65: true, 37: true, 68: true, 39: true, 32: true};



    const page = document.getElementsByTagName("body")[0];
    const canvas = document.getElementById("canvas");

    page.addEventListener("keydown", (e)=>{
        let keyCode = e.keyCode;
        console.log(keyCode);
        // prevents user from holding the shoot button and spamming axes.
        if (keyCode !== 16) {
          this.keysDown[keyCode] = true;
          if (keyCode in this.validKeys){
            e.preventDefault();
          }
        }
    });

    page.addEventListener("keyup", (e)=>{
      let keyCode = e.keyCode;

      // if (keyCode === 16){
      //     this.player.throwAxe();
      // }
      if (keyCode in this.validKeys && this.player.alive){
        this.player.setSpriteAsIdle();
      }
      delete this.keysDown[keyCode];
        e.preventDefault();

    });

    canvas.addEventListener("click", (e)=>{
      let rect = e.currentTarget.getBoundingClientRect();
      let pos = e.clientX - rect.left;
      let dir = pos > this.player.pos[0] ? 'right' : 'left';
      this.player.throwAxe(dir);
    });

  }

    update(delta){
      let modifier = Math.floor(delta / (1000/60));
      // if(87 in this.keysDown || 38 in this.keysDown){
      //   // if (this.player.pos[0] + this.player.width)
      //   this.player.moveUp(modifier);
      // }
      // if(83 in this.keysDown || 40 in this.keysDown){
      //   this.player.moveDown(modifier);
      // }
      // console.log(this.keysDown);


      if (32 in this.keysDown){
        this.player.jump();
      }
      if(65 in this.keysDown || 37 in this.keysDown){
          this.player.moveLeft(modifier);
      }
      if(68 in this.keysDown || 39 in this.keysDown){
          this.player.moveRight(modifier);
      }
      // this.game.draw(this.view);
    }

    start(){
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }

    animate(time){
      const delta = time - this.lastTime;

      let fps = Math.floor(1000/delta);

      this.update(delta);
      this.game.draw(this.view);
      this.game.detectCollisions();
      this.lastTime = time;
      let frames = 120;
      setTimeout(()=>{
        requestAnimationFrame(this.animate.bind(this));
      }, 1000/frames);
    }
}
module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const GameView = __webpack_require__(3);

window.addEventListener("load", function(e){
  const canvas = document.getElementById("canvas");
  canvas.width = 1200;
  canvas.height = 500;

  const view = canvas.getContext("2d");
  new GameView(view).start();
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(1);
const Axe = __webpack_require__(0);
class Enemy {
  constructor(view, game) {
    let x = Math.floor(Math.random() * 900 + 100);
    this.pos = [x, 215];
    this.vel = [Math.floor(Math.random() *  2)];
    this.view = view;

    this.width = 251;
    this.height = 186;
    this.img = new Image();
    this.img.onload = this.setSprite();

    this.setSprite();
    this.setStats();

    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
    this.game = game;
  }

  setSprite(){
    if (this.vel[0] === 0){
      this.rowCount = 9;
      this.colCount = 15;
      this.lastSprite = [14,8];
      this.img.src = "./sprites/aligator.png";
    } else {
      this.img.src = "./sprites/aligatorWalk.png";
      this.rowCount = 6;
      this.colCount = 3;
      this.lastSprite = [ 0, 5];
    }
  }


  move() {
  //  let fps = 1000/60;
  //  const velocity = timeDelta / fps,
      //  offsetX = this.vel * velocity,
      //  offsetY = this.vel * velocity;
  //  this.pos[1] += offsetY;
  this.pos[0] -= this.vel[0];
  this.checkBoundaries();
}

  draw(){
    if (Math.random() * 10 > 6.5){
      this.updateSprite();
    }
    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);

      // this.view.strokeRect(this.pos[0]-25, this.pos[1]+40, this.width, this.height);
      // this.view.strokeStyle = 'red';
  }

  updateSprite(){

    this.currX = ++this.currX % this.colCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.colCount);

    if (this.currX === this.lastSprite[0] && this.currY === this.lastSprite[1]){
      this.reset();
    }

    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
  }

  reset(){
    this.currX = 0;
    this.currY = 0;
    this.frames = 0;
  }

  checkBoundaries(){
    if (this.pos[0] < 0){
      this.pos[0] = 0;
      this.vel[0] *= -1;
      this.img.src = "./sprites/aligatorWalkRight.png";
    }
    if (this.pos[0] > this.view.canvas.width - this.width/2){
      this.vel[0] *= -1;
      this.pos[0] = this.view.canvas.width - this.width/2;
      this.img.src = "./sprites/aligatorWalk.png";
    }
  }

  isTouching(otherObject){
    if (this.pos[0] < otherObject.pos[0] + (otherObject.width - 25)/2  &&
      this.pos[0] + (this.width - 25)/2 > otherObject.pos[0] &&
      (this.pos[1] + 80) < otherObject.pos[1] + otherObject.height &&
      this.height + (this.pos[1] + 0) > otherObject.pos[1])
      {
        this.collidedWith(otherObject);
      }
    }

  collidedWith(otherObject){
    if(otherObject instanceof Player){
      otherObject.takeDamage(Math.floor(Math.random() * 2));
    } else if(otherObject instanceof Axe && otherObject.live){
      this.takeDamage();
      console.log(this.health);
      if(this.health <= 0){
        this.game.remove(this);
      }
      this.game.remove(otherObject);
    }
  }

  takeDamage(){
    let damage = Math.floor(Math.random() * (30 - 25)) + 25;
    this.health -= damage;

    // Displaying damage taken
    this.drawDamage(damage);
    this.view.font = "40px Bangers";

    let gradient = this.view.createLinearGradient(0, 0, 0, 40);
    gradient.addColorStop(1, 'yellow');
    gradient.addColorStop(.5, 'orange');
    gradient.addColorStop(.06, 'red');
    this.view.fillStyle = gradient;


    this.view.strokeStyle = 'black';
    this.view.lineWidth = 8;
    this.view.strokeText(`${damage}`, this.pos[0], this.pos[1]);
    this.view.fillText(`${damage}`, this.pos[0], this.pos[1]);
    // END
  }

  drawDamage(damage){

  }

  setStats(){
    // Random health between 150 - 200
    // Random attack between 15 - 20
    this.health = Math.floor(Math.random() * (150 - 100) + 100);
  }
}
module.exports = Enemy;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Hud {
  constructor(view, player){
    this.view = view;
    this.player = player;

    this.healthbar = this.player.health;
    this.barSize = 350;
  }

  draw(){
    this.view.lineWidth = 1;
    this.drawMax();
    if (this.player.health > 0){
      this.drawCurrentHealth();
    }
    this.drawLabels();
  }

  drawLabels(){
    let currentHealth = this.player.health > 0 ? this.player.health : 0;
    this.view.font = "24px Bangers";
    this.view.fillStyle="#000";
    this.view.fillText(`${currentHealth}/${this.healthbar}`, 250, 43);
  }
  drawMax(){
    this.view.fillStyle="#FFF";
    this.view.fillRect(10, 20, this.barSize, 30);
    this.view.strokeStyle="#000";
    this.view.strokeRect(10, 20, this.barSize, 30);
  }

  drawCurrentHealth(){
    let currentHealthPercent = this.player.health / this.healthbar;
    let healthPercentInPx = currentHealthPercent * this.barSize;
    this.view.fillStyle="#FF0000";
    this.view.fillRect(10, 20, healthPercentInPx, 30);
    this.view.strokeStyle="#000";
    this.view.strokeRect(10, 20, this.barSize, 30);
  }

}
module.exports = Hud;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map