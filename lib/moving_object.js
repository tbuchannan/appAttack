// // const Util = require('./util');
// class MovingObject {
//
//   constructor(options) {
//     this.pos = options.pos;
//     this.radius = options.radius;
//     this.color = options.color;
//     this.game = options.game;
//   }
//
//   collideWith(otherObject) {
//
//   }
//
//   draw(context){
//     context.fillStyle = this.color;
//
//     context.beginPath();
//     context.arc(
//       this.po[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
//       context.fill();
//   }
//
//   isCollideWith(otherObject) {
//     // TODO: may need to change this as this only works for circles
//     const centerDistance = Util.dist(this.pos, otherObject.pos);
//     return centerDistance < (this.radius + otherObject.radius);
//   }
//
//   move(timeDelta){
//     // TODO: this will need to be corrected to randomly move
//   }
//
//   remove(){
//     this.game.remove(this);
//   }
//
// }
// module.exports = MovingObject;
