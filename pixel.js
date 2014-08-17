var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random");

var Pixel = function(args) {
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.color = args.color || Color.random();
  this.fadeSpeed = args.fadeSpeed || 0;
  this.xSpeed = args.xSpeed || 0;
  this.ySpeed = args.ySpeed || 0;
  this.checkVisible();
}

module.exports = Pixel;

Pixel.prototype.update = function(elapsed,matrix){
  this.next(elapsed,matrix);
  this.checkVisible();
  this.checkBounds(matrix);
}

Pixel.prototype.next = function(elapsed,matrix){
  this.draw(matrix);
  if (this.xSpeed != 0)
    this.x += this.xSpeed * elapsed;
  if (this.ySpeed != 0)
    this.y += this.ySpeed * elapsed;
  if (this.fadeSpeed > 0)
    this.fade(this.fadeSpeed).darken(this.fadeSpeed);
}

Pixel.prototype.draw = function(matrix){
  matrix.drawPixel(this.x,this.y,this.color);
}

Pixel.prototype.darken = function(byAmount){
  this.color.darken(byAmount);
  return this;
}

Pixel.prototype.fade = function(byAmount){
  this.color.fade(byAmount);
  return this;
}

Pixel.prototype.checkVisible = function(){
  this.visible = this.color.visible();
}

Pixel.prototype.checkBounds = function(matrix){
  if (this.x < 0 || this.x >= matrix.width){
    this.xSpeed *= -1;
  }
  if (this.y < 0 || this.y >= matrix.width) {
    this.ySpeed *= -1;
  }
}

Pixel.prototype.dead = function(){
  return !this.visible;
}




