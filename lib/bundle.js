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

const Game = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./game\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const GameView = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./game_view\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = 5000;
  canvas.height = 500;

  const context = canvas.getContex("2d");
  const game = new Game();
  new GameView(game, context).start();
});


class Game {
  constructor() {
    this.player = [];
    this.enemies = [];

    this.addEnemies();
  }



  addEnemies(){
    for (let i = 0; i < GAME.TEMP_ENEMIES; i++) {
      array[i]
    }
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const canvas = document.getElementById("canvas");
//   const stage = new createjs.Stage("canvas");
//
//   createjs.Ticker.on("tick", tick);
//   createjs.Ticker.setFPS(60)
//
//   function tick(){
//
//   }
//
//   window.addEventListener("keydown", (e) =>{
//     debugger
//     switch (e.keyCode) {
//       case 37:
//
//         break;
//       case 38:
//
//         break;
//       case 39:
//
//         break;
//       case 40:
//
//         break;
//       default:
//
//     }
//
//       break;
//   });
//
//   function drawCircle(){
//   var circle = new createjs.Shape();
//   circle.graphics.beginFill("red").drawCircle(0,0,100);
//   circle.x = 100;
//   circle.y = 100;
//   stage.addChild(circle);
//   }
//
//   function drawStuff(){
//     drawCircle();
//     stage.update();
//   }
//
//   drawStuff();
// });


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map