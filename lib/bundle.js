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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(1);
const Enemy = __webpack_require__(4);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Player {
  constructor(view) {
    this.pos = [0, 268];
    this.rockBottom = this.pos[1];

    this.vel = [7, 0];
    this.view = view;
    this.width = 101;
    this.height = 114;

    this.img = new Image();
    this.setSpriteAsIdle();

    this.srcX = 0;
    this.srcY = 0;
    this.gravity = 0.3;
  }

  moveLeft(modifier){
    this.pos[0] -= this.vel[0];
    this.running = "left";
  }

  moveRight(modifier){
    this.pos[0] += this.vel[0];
    this.running = "right";
  }

  moveUp(modifier){
    this.pos[1] -= this.vel * modifier;
  }

  moveDown(modifier){
    this.pos[1] += this.vel * modifier;
  }

  jump(){
    if (this.onGround()){
      console.log("I'm on the ground!");
      this.vel[1] = -9;
    }
  }

  setSpriteAsIdle(){
    this.reset();
    this.img.src = "./sprites/gumDrop.png";
    this.colCount = 37;
    this.rowCount = 10;
    this.lastSprite = [31,9];
    this.running = "";
  }

  onGround(){
    return this.pos[1] === this.rockBottom;
  }

  draw(){
    this.updateSprite();
    // console.log("Col: "+ this.currY + " Row: " + this.currX);

    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);
  }

  updateSprite(){
    if (this.running){ this.changeSpriteDirection(); }

    this.currX = ++this.currX % this.colCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.colCount);
    // if (this.currY > this.rowCount) {
    //   this.currY = 0;
    // }

    if (this.currY === this.lastSprite[1] && this.currX === this.lastSprite[0]){
       this.reset();
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
      this.pos[0] = this.view.canvas.width ;
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
    this.colCount = 8;
    this.rowCount = 2;
    this.lastSprite = [7,1];
    this.resetSpriteVariables();
    this.img.src = this.running === 'right' ?
      "./sprites/gumDropRight.png" : "./sprites/gumDropLeft.png";
  }
}
module.exports = Player;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


const Player = __webpack_require__(1);
const Game = __webpack_require__(0);

class GameView {
  constructor(view) {
    this.view = view;
    this.player = new Player(view);
    this.game = new Game(this.player, view);
    this.keysDown = {};
    this.validKeys = [65, 37, 68, 39];


    const page = document.getElementsByTagName("body")[0];

    page.addEventListener("keydown", (e)=>{
        this.keysDown[e.keyCode] = true;
      e.preventDefault();
    });

    page.addEventListener("keyup", (e)=>{
      if (this.validKeys.includes(e.keyCode)){
        this.player.setSpriteAsIdle();
      }
      delete this.keysDown[e.keyCode];
      e.preventDefault();
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
      this.game.draw(this.view);
    }

    start(){
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }

    animate(time){
      const delta = time - this.lastTime;
      this.update(delta);
      this.game.draw(this.view);
      this.lastTime = time;
      let frames = 60;
      setTimeout(()=>{
        requestAnimationFrame(this.animate.bind(this));
      }, 1000/frames);


    }
}
module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = 1200;
  canvas.height = 500;

  const view = canvas.getContext("2d");
  new GameView(view).start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {


class Enemy {
  constructor(view) {
    let x = Math.floor(Math.random() * 1000 + 200);
    this.pos = [x, 215];
    this.vel = [Math.floor(Math.random() *  2)];
    console.log(`My Vel is ${this.vel}`);
    this.view = view;

    this.width = 251;
    this.height = 186;
    this.img = new Image();
    this.img.src = "./sprites/aligatorWalk.png";
    this.rowCount = 6;
    this.colCount = 3;
    this.lastSprite = [ 0, 5];

    this.setSprite();

    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
  }

  setSprite(){
    if (this.vel[0] === 0){
      this.rowCount = 9;
      this.colCount = 15;
      this.lastSprite = [14,8];
      this.img.src = "./sprites/aligator.png";
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
    if (this.pos[0] > this.view.canvas.width - 100){
      this.vel[0] *= -1;
      this.pos[0] = this.view.canvas.width - 100;
      this.img.src = "./sprites/aligatorWalk.png";
    }
  }
}
module.exports = Enemy;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map