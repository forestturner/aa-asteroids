const Util = require('./utils.js');

function MovingObject(options){
  this.pos = options['pos'];
  this.vel = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
  this.game = options['game'];
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
};

MovingObject.prototype.isWrappable = function () {
  return true;
};


MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.game.isOutofBounds(this.pos) && !this.isWrappable() ){
    this.game.remove(this);
  } else {
    this.pos = this.game.wrap(this.pos);
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  if(Util.distance(this.pos, otherObject.pos) < this.radius + otherObject.radius){
    return true;
  }

  return false;
};

MovingObject.prototype.collideWith = function (otherObject) {};

module.exports = MovingObject;
