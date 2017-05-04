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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(3);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


const Player = __webpack_require__(3);
const Game = __webpack_require__(1);

class GameView {
  constructor(view) {
    this.view = view;
    this.player = new Player(view);
    this.game = new Game(this.player);

    const page = document.getElementsByTagName("body")[0];

    page.addEventListener("keydown", (e)=>{
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          this.player.moveUp();
          break;
        case 's':
        case 'ArrowDown':
          this.player.moveDown();
          break;
        case 'a':
        case 'ArrowLeft':
          this.player.moveLeft();
          break;
        case 'd':
        case 'ArrowRight':
        this.player.moveRight();
          break;
      }
      e.preventDefault();
    }, false);

    page.addEventListener("keyup", (e)=>{
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          this.player.vel[1]=0;
          break;
        case 's':
        case 'ArrowDown':
          this.player.vel[1]=0;
          break;
        case 'a':
        case 'ArrowLeft':
        this.player.vel[0] = 0;
          break;
        case 'd':
        case 'ArrowRight':
        this.player.vel[0] = 0;
          break;
      }
      e.preventDefault();
    }, false);

    // .addEventListener("keypress", (e)=>{
    function update(){
      // switch (e.which) {
      //   case 65:
      //   case 97:
      //     break;
      //   case 115:
      //   case 83:
      //     // move down
      //     console.log("DOWN");
      //     break;;
      //   case 100:
      //   case 68:
      //     // move right
      //     console.log("RIGHT");
      //     break;
      //   case 119:
      //   case 87:
      //     // move up
      //     console.log("UP");
      //     break;
      //   default:
      //
      // }
    }
  }

    update(delta){
      this.player.move(delta);
      this.game.draw(this.view);
      // this.player.draw(this.view);

    }

    start(){
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }

    animate(time){
      const delta = time - this.lastTime;
      // debugger
      // console.log(delta);
      this.update(delta);
      this.game.draw(this.view);
      this.lastTime = time;

      requestAnimationFrame(this.animate.bind(this));

      // this.player.move(delta);
    }
}
module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Player {
  constructor(view) {
    this.x_pos = 200;
    this.y_pos = 200;
    this.vel = [0,0];
    this.draw(view);
  }

  move(x, y){
    // console.log("Old Pos: "+ [this.x_pos, this.y_pos]);
    this.x_pos += x;
    this.y_pos += y;
  }
  moveLeft(){
    this.vel[0] = -5;
  }

  moveRight(){
    this.vel[0] = 5;
  }

  moveUp(){
    this.vel[1] = -5;
  }

  moveDown(){
    this.vel[1] = 5;
  }

  move(timeDelta) {
   let fps = 1000/60;
   const velocity = timeDelta / fps,
       offsetX = this.vel[0] * velocity,
       offsetY = this.vel[1] * velocity;

   this.x_pos += offsetX;
   this.y_pos += offsetY;

}

  draw(view){
    // let sprite = new Image ();
      view.beginPath();
      view.arc(this.x_pos, this.y_pos, 20, 0, 2 * Math.PI, false);
      view.fillStyle = 'green';
      view.fill();
      view.lineWidth = 5;
      view.strokeStyle = '#003300';
      view.stroke();
  }
}
module.exports = Player;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map