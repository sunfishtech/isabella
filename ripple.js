var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random");

var Ripple = function(args) {
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.color = args.color || Color.random();
  this.radius = Random.integer(1,10);
  this.maxRadius = Random.integer(5,20);
  this.fadeSpeed = args.fadeSpeed || 5;
  this.checkVisible();
}

module.exports = Ripple;

Ripple.prototype.update = function(elapsed,matrix){
  this.next(elapsed,matrix);
  this.checkVisible();
  this.checkBounds(matrix);
}

Ripple.prototype.next = function(elapsed,matrix){
  this.draw(matrix);
  this.radius += 1/Random.integer(1,3);
  if (this.radius > this.maxRadius)
    this.fade(255);
  this.fade(this.fadeSpeed).darken(this.fadeSpeed);
}

Ripple.prototype.draw = function(matrix){
  var fillColor = Color.random();
  matrix.drawCircle(this.x,this.y,this.radius,this.color,fillColor);
}

Ripple.prototype.darken = function(byAmount){
  this.color.darken(byAmount);
  return this;
}

Ripple.prototype.fade = function(byAmount){
  this.color.fade(byAmount);
  return this;
}

Ripple.prototype.checkVisible = function(){
  this.visible = this.color.visible();
}

Ripple.prototype.checkBounds = function(matrix){
  if (this.x < 0 || this.x >= matrix.width){
    this.xSpeed *= -1;
  }
  if (this.y < 0 || this.y >= matrix.width) {
    this.ySpeed *= -1;
  }
}

Ripple.prototype.dead = function(){
  return !this.visible;
}




