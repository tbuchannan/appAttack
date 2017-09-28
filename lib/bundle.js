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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Axe = __webpack_require__(1);
class Player {
  constructor(view, sprites, items) {
    this.pos = [0, 268];
    this.rockBottom = this.pos[1];

    this.setStats();

    this.vel = [7, 0];
    this.width = 101;
    this.height = 114;

    this.sprites = sprites;
    this.activeSprite = this.sprites[0];

    this.srcX = 0;
    this.srcY = 0;
    this.gravity = 1.5;
    this.alive = true;

    this.score = 0;

    this.items = items;
    this.view = view;
    this.lastDirection = 'right';
    this.setSpriteAsIdle();
  }

  onLoadFunc() {
    this.setSpriteAsIdle();
  }

  moveLeft(){
    if(this.alive){
      this.pos[0] -= this.vel[0];
      this.running = "left";
      this.lastDirection = 'left';
    }
  }

  moveRight(){
    if(this.alive){
      this.pos[0] += this.vel[0];
      this.running = "right";
      this.lastDirection = 'right';
    }
  }

  jump(){
    if (this.onGround()){
      this.vel[1] = -20;
    }
  }

  die(){
    this.alive = false;
    this.running = "";
    this.changeSpriteDirection();
    // this.view.stop();
    this.game.gameOver();
  }


  setSpriteAsIdle(){
    this.reset();
    this.activeSprite = this.sprites[0];
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
      let axe = new Axe([this.pos[0], this.pos[1]], this.view, throwDir, this.game, this.items[0]);
      this.game.addAxe(axe);
    }
  }

  onGround(){
    return this.pos[1] === this.rockBottom;
  }

  draw(){
    this.updateSprite();

    this.view.drawImage(
      this.activeSprite, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height
    );
    // this.view.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
    // this.view.strokeStyle = 'red';
  }

  updateSprite(){
    if (this.currentHealth < 0 && this.alive){
      this.die();
    } else if (this.running){
       this.changeSpriteDirection();
     }

    this.currX = ++this.currX % this.colCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.colCount);

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
      this.activeSprite = this.running === 'right' ?
      this.sprites[3] : this.sprites[2];
    } else {
      this.colCount = 9;
      this.rowCount = 5;
      this.lastSprite = [8, 4];
      this.resetSpriteVariables();
      this.activeSprite = this.sprites[1];
    }
  }

  addGame(game){
    this.game = game;
  }

  isTouching(){ }

  takeDamage(damageDealt){
    this.currentHealth -= damageDealt;
  }

  resurrect(){
    this.pos = [0, 268];
    this.lastDirection = 'right';
    this.setSpriteAsIdle();
    this.setStats();
    this.alive = true;
  }

  setStats(){
    // Random attack between 20 and 30
    // Random health between 200 and 300

    this.maxHealth = Math.floor(Math.random() * (300 - 200)) + 200;
    this.currentHealth = this.maxHealth;
  }
}
module.exports = Player;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Axe{
  constructor(pos, view, throwDir, game, sprite) {
    this.vel = [25 * throwDir, -5 ];
    this.srcX = 0;
    this.srcY = 0;
    this.pos = pos;
    this.rockBottom = 325;
    this.view = view;
    this.gravity = 1.5;
    this.width = 48;
    this.height = 44;
    this.sprite = sprite;
    this.live = true;
    this.game = game;
  }

  draw(view){
    this.updateSprite();

    this.view.drawImage(
      this.sprite, this.srcX, this.srcY, this.width, this.height, this.pos[0],
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(0);
const Enemy = __webpack_require__(3);
const Axe = __webpack_require__(1);
const Hud = __webpack_require__(6);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(0);
const Axe = __webpack_require__(1);
class Enemy {
  constructor(view, game, sprites) {
    let x = Math.floor(Math.random() * 900 + 100);
    this.pos = [x, 215];
    this.vel = [Math.floor(Math.random() *  2)];
    this.view = view;
    this.width = 251;
    this.height = 186;

    this.sprites = sprites;

    this.setSprite();

    this.setStats();

    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
    this.game = game;
    this.alive = true;
    this.injured = false;
  }

  setSprite(){
    if (this.vel[0] === 0){
      this.rowCount = 9;
      this.colCount = 15;
      this.lastSprite = [14,8];
      this.activeSprite = this.sprites[0];
    } else {
      this.activeSprite = this.sprites[1];
      this.rowCount = 6;
      this.colCount = 3;
      this.lastSprite = [ 0, 5];
    }
  }


  move() {
  this.pos[0] -= this.vel[0];
  this.checkBoundaries();
}

  draw(){
    if (Math.random() * 10 > 6.5){
      this.updateSprite();
    }
    this.view.drawImage(
      this.activeSprite, this.srcX, this.srcY, this.width, this.height, this.pos[0],
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
      this.activeSprite = this.sprites[2];
    }
    if (this.pos[0] > this.view.canvas.width - this.width/2){
      this.vel[0] *= -1;
      this.pos[0] = this.view.canvas.width - this.width/2;
      this.activeSprite = this.sprites[1];
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
      if(this.currentHealth <= 0){
        this.game.remove(this);
      }
      this.game.remove(otherObject);
    }
  }

  takeDamage(){
    let damage = Math.floor(Math.random() * (30 - 25)) + 25;
    this.currentHealth -= damage;
    this.injured = true;

  }

  drawDamage(damage){

  }

  setStats(){
    // Random health between 150 - 200
    // Random attack between 15 - 20
    this.maxHealth = Math.floor(Math.random() * (300 - 200)) + 200;
    this.currentHealth = this.maxHealth;
  }
}
module.exports = Enemy;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


const Player = __webpack_require__(0);
const Game = __webpack_require__(2);

class GameView {
  constructor(view) {
    this.view = view;
    this.keysDown = {};
    this.validKeys = {65: true, 37: true, 68: true, 39: true, 32: true};

    this.requestId = undefined;

    const page = document.getElementsByTagName("body")[0];
    const canvas = document.getElementsByClassName("canvas")[0];
    const start = document.getElementsByClassName("start-btn")[0];
    const continueBtn = document.getElementsByClassName("continue_btn")[0];

    page.addEventListener("keydown", (e)=>{
        let keyCode = e.keyCode;
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

    start.addEventListener("click", (e)=>{
      // $(".modal").addClass("hidden");
      document.getElementsByClassName("modal")[0].className += " hidden";
      document.getElementsByClassName("start_window")[0].className += " hidden";
      this.start();
    });

    continueBtn.addEventListener("click", (e)=>{
      document.getElementsByClassName("modal")[0].className = "modal hidden";
      document.getElementsByClassName("game_over_window")[0].className = "game_over_window hidden";
      this.restart();
    });
  }

    animate(time){
      const delta = time - this.lastTime;
      // let fps = Math.floor(1000/delta);

      this.update();
      this.game.draw(this.view);
      this.game.detectCollisions();
      this.lastTime = time;

      let frames = 120;
      this.timeOut = setTimeout(()=>{
        this.requestId = requestAnimationFrame(this.animate.bind(this));
      }, 1000/frames);
    }

    load(){
      this.enemySprites = [];
      this.playerSprites = [];
      this.items = [];

      let enemyFileNames = [
        "./sprites/aligator.png",
        "./sprites/aligatorWalk.png",
        "./sprites/aligatorWalkRight.png"
      ];

      let playerFileNames = [
        "./sprites/gumDrop-min.png",
        "./sprites/gumDropDead.png",
        "./sprites/gumDropLeft.png",
        "./sprites/gumDropRight.png"
      ];

      let itemNames = [
        "./sprites/axeOfDoom.png"
      ];

      for (let i = 0; i < enemyFileNames.length; i++){
        let img = new Image();
        img.src = enemyFileNames[i];
        this.enemySprites.push(img);
      }

      for (let j = 0; j < playerFileNames.length; j++){
        let tempImg = new Image();
        tempImg.src = playerFileNames[j];
        this.playerSprites.push(tempImg);
      }

      for (let k = 0; k < itemNames.length; k++){
        let itemImg = new Image();
        itemImg.src = itemNames[k];
        this.items.push(itemImg);
      }

      this.player = new Player(this.view, this.playerSprites, this.items);
      this.game = new Game(this.player, this.view, this.enemySprites, this.items);
      this.player.addGame(this.game);
    }

    start(){
      if(!this.requestId){
        this.lastTime = 0;
        this.requestId = requestAnimationFrame(this.animate.bind(this));
      }
    }

    stop(){
      // debugger
      if(this.requestId){
        cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
        clearTimeout(this.timeOut);
      }
    }

    update(){
      if(this.player.alive){
        if (32 in this.keysDown){
          this.player.jump();
        }
        if(65 in this.keysDown || 37 in this.keysDown){
          this.player.moveLeft();
        }
        if(68 in this.keysDown || 39 in this.keysDown){
          this.player.moveRight();
        }
      }
    }

    restart(){
      this.stop();
      this.game.repopulate();
      this.start();
    }

}
module.exports = GameView;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const GameView = __webpack_require__(4);

window.addEventListener("load", function(e){
  const canvas = document.getElementsByClassName("canvas")[0];
  canvas.width = 1200;
  canvas.height = 500;

  const view = canvas.getContext("2d");
  const game = new GameView(view);
  game.load();
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(0);
const Enemy = __webpack_require__(3);
class Hud {
  constructor(view, player){
    this.view = view;
    this.player = player;
    this.enemy = this.isEnemy(player);

    this.healthBar = this.player.maxHealth;
    this.barSize = 350;
    this.hudX = 10;
    this.hudY = 20;
    this.hudWidth = 30;

    this.populateVariables();
  }

  draw(){
    this.view.lineWidth = 1;
    if (!this.enemy || this.player.injured){
      this.drawMax();
      this.drawCurrentHealth();
    }
    this.drawLabels();
  }

  drawLabels(){
    if (!this.enemy) {
      let currentHealth = this.player.currentHealth > 0 ? this.player.currentHealth : 0;
      this.view.font = "24px Bangers";
      this.view.fillStyle="#000";
      this.view.fillText(`${currentHealth}/${this.healthBar}`, 250, 43);
      this.view.font = "40px Bangers";
      this.view.fillStyle="#FFF";

      this.view.fillText(`${this.player.score}`, 450, 50);
      this.view.lineWidth = 2;
      this.view.strokeText(`${this.player.score}`, 450, 50);



    }

  }
  drawMax(){
      this.populateVariables();
      this.view.fillStyle="#F00";
      this.view.fillRect(this.hudX, this.hudY, this.barSize, this.hudWidth);
      this.view.strokeStyle="#000";
      this.view.strokeRect(this.hudX, this.hudY, this.barSize, this.hudWidth);
  }

  drawCurrentHealth(){
      let currentHealthPercent = this.player.currentHealth / this.healthBar;
      let healthPercentInPx = currentHealthPercent * this.barSize;
      if (this.player.alive) {
        this.view.fillStyle="#008e10";
        this.view.fillRect(this.hudX, this.hudY, healthPercentInPx, this.hudWidth);
        this.view.strokeStyle="#000";
        this.view.strokeRect(this.hudX, this.hudY, this.barSize, this.hudWidth);
      }

  }

  isEnemy(player){
    return (player instanceof Enemy);
  }

  populateVariables(){
    if (this.enemy) {
        this.hudX = this.player.pos[0] + 30;
        this.hudY = this.player.pos[1] + this.player.height - 15;
        this.barSize = Math.floor(this.player.width * .30);
        this.hudWidth = 5;
    } else{
      this.healthBar = this.player.maxHealth;
    }
  }

}
module.exports = Hud;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map