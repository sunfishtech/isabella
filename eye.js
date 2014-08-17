var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random");

var Eye = function(args) {
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.color = args.color || new Color(0,255,200,255);//new Color(0,200,255,200);
  this.baseColor = args.baseColor || new Color(200,200,200,200);
  this.radius = args.radius || 4;
  this.xOffset = 0;
  this.yOffset = 0;
  this.irisRadius = args.irisRadius || (this.radius/1.5);
  this.pupilRadius = args.pupilRadius || (this.radius/3);
  this.colorMode = "normal";
  this.checkVisible();
}

module.exports = Eye;

Eye.prototype.update = function(elapsed,matrix){
  this.next(elapsed,matrix);
  this.checkVisible();
}

Eye.prototype.next = function(elapsed,matrix){
  this.draw(matrix);
}

Eye.prototype.lookLeft = function(byAmount){
  byAmount = byAmount || 1;
  this.xOffset -= byAmount;
}

Eye.prototype.lookRight = function(byAmount){
  byAmount = byAmount || 1;
  this.xOffset += myAmount;
}

Eye.prototype.lookUp = function(byAmount){
  byAmount = byAmount || 1;
  this.yOffset -= byAmount;
}

Eye.prototype.lookDown = function(byAmount){
  byAmount = byAmount || 1;
  this.yOffset += byAmount;
}

Eye.prototype.lookCenter = function(){
  this.xOffset = 0;
  this.yOffset = 0;
}

Eye.prototype.draw = function(matrix){
  this.drawBall(matrix);
  this.drawIris(matrix);
  this.drawPupil(matrix);
  //this.drawTopLid(matrix);
}

Eye.prototype.drawBall = function(matrix){
  var border = this.baseColor.dup();
  //if (this.radius > 3)
    border.darken(100);
  matrix.drawCircle(this.x,this.y,this.radius,border,this.baseColor);
}

Eye.prototype.drawIris = function(matrix){
  var c = this.color;
  switch(this.colorMode){
    case "scary": c = new Color(255,50,50,200);break;
    case "rainbow": c = Color.random(); break;
    case "evil":c = Color.random();break;
  }
  var border = c.dup().darken(200);
  matrix.drawCircle(this.x+this.xOffset,this.y+this.yOffset,this.irisRadius,border,c);
}

Eye.prototype.drawPupil = function(matrix){
  var c = new Color(0,0,0,255);
  switch(this.colorMode){
    case "evil":c = new Color(255,200,100,255); break;
  }
  matrix.drawCircle(this.x+this.xOffset,this.y+this.yOffset,this.pupilRadius,c,c);
}

Eye.prototype.drawTopLid = function(matrix){
  ctx = matrix.context;
  ctx.strokeStyle = "rgba(225,197,144,200)"
  ctx.fillStyle = "rgba(255,0,0,255)"
  ctx.beginPath();
  ctx.arc(Math.floor(this.x),Math.floor(this.y),Math.floor(this.radius)+1,Math.PI,2*Math.PI,false);
  ctx.arc(Math.floor(this.x),Math.floor(this.y),Math.floor(this.radius)+1,0,Math.PI,false);
  ctx.lineWidth = 2;
  ctx.stroke();
  //ctx.fill();
  ctx.closePath(0);
}

Eye.prototype.checkVisible = function(){
  this.visible = this.color.visible();
}

Eye.prototype.dead = function(){
  return !this.visible;
}




