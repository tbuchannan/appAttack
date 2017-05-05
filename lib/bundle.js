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

  draw(view){
    view.clearRect(0, 0, 5000, 500);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Player {
  constructor(view) {
    // this.x_pos = 200;
    // this.y_pos = 200;
    this.pos = [200, 268];
    this.rockBottom = this.pos[1];
    this.vel = [5, 0];
    this.view = view;
    this.width = 101;
    this.height = 114;
    // width: 101
    //  height: 114
    this.img = new Image();
    this.img.src = "./sprites/gumDrop.png";
    this.rowCount = 37;
    this.colCount = 10;
    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
    this.gravity = 0.3;

  }

  moveLeft(modifier){
    console.log(modifier);
    this.pos[0] -= this.vel[0];
  }

  moveRight(modifier){
    this.pos[0] += this.vel[0];
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
      this.vel[1] = -10;
    }

  }

  onGround(){
    return this.pos[1] === this.rockBottom;
  }

//   move(timeDelta) {
//    let fps = 1000/60;
//    console.log(timeDelta/fps);
//    const velocity = timeDelta / fps,
//        offsetX = this.vel[0] * velocity,
//        offsetY = (this.vel[1] + this.gravity) * velocity;
//

//
//     this.pos[0] += offsetX;
//     this.pos[1] += offsetY;
//
// }

  draw(){
    // let sprite = new Image ();
    this.updateSprite();
    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);

  }

  updateSprite(){
    this.currX = ++this.currX % this.rowCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.rowCount);
    if (this.currY > 10) {
      this.currY = 0;
    }
    if (this.currY === 9 && this.currX === 31){
      this.currX = 0;
      this.currY = 0;
      this.frames = 0;
    }
    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
    this.vel[1] += this.gravity;
    this.pos[1] += this.vel[1];
       if (this.pos[1] > this.rockBottom){
        this.pos[1] = this.rockBottom;
        this.vel[1] = 0;
        }
    // console.log('This is X: ' + this.currX, 'This is Y: ' + this.currY);

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


    const page = document.getElementsByTagName("body")[0];

    page.addEventListener("keydown", (e)=>{
        this.keysDown[e.keyCode] = true;
      e.preventDefault();
    });

    page.addEventListener("keyup", (e)=>{
      delete this.keysDown[e.keyCode];
      e.preventDefault();
    });

  }

  inBounds(pos){
    // TODO: this will need to change once you have a viewport sort of thing;
    if ((pos[0] > 0 && pos[0] < this.view.canvas.width) &&
    (pos[1] > 0 && pos[1] < this.view.canvas.height)){
      return true;
    }
    return false;
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
      let frames = 120;
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
  canvas.width = 5000;
  canvas.height = 500;

  const view = canvas.getContext("2d");
  // const game = new Game();
  new GameView(view).start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {


class Enemy {
  constructor(view) {
    // this.x_pos = 200;
    // this.y_pos = 200;
    let x = Math.floor(Math.random() * 1000 + 200);
    this.pos = [x, 215];
    this.vel = 0;
    this.view = view;
    this.width = 251;
    this.height = 186;
    this.img = new Image();
    this.img.src = "./sprites/aligator.png";
    this.rowCount = 15;
    this.colCount = 9;
    this.currX = 0;
    this.currY = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.frames = 0;
  }


  move(timeDelta) {
   let fps = 1000/60;
   const velocity = timeDelta / fps,
       offsetX = this.vel * velocity,
       offsetY = this.vel * velocity;

   this.pos[0] += offsetX;
   this.pos[1] += offsetY;

}

  draw(){
    // let sprite = new Image ();
    if (Math.random() * 10 > 6){
      this.updateSprite();
    }

    this.view.drawImage(
      this.img, this.srcX, this.srcY, this.width, this.height, this.pos[0],
      this.pos[1], this.width, this.height);

  }

  updateSprite(){
    this.currX = ++this.currX % this.rowCount;
    this.frames += 1;
    this.currY = Math.floor(this.frames / this.rowCount);
    if (this.currY > 9) {
      this.currY = 0;
    }
    if (this.currY === 8 && this.currX === 14){
      this.currX = 0;
      this.currY = 0;
      this.frames = 0;
    }
    this.srcX = this.currX * this.width;
    this.srcY = this.currY * this.height;
    // console.log('This is X: ' + this.currX, 'This is Y: ' + this.currY);

  }
}
module.exports = Enemy;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map