var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random");

var Mouth = function(args) {
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.color = args.color || new Color(255,100,100,200);
  this.radius = args.radius || 5;
  this.expression = args.expression || "smile";
  this.checkVisible();
}

module.exports = Mouth;

Mouth.prototype.update = function(elapsed,matrix){
  this.next(elapsed,matrix);
  this.checkVisible();
}

Mouth.prototype.next = function(elapsed,matrix){
  this.draw(matrix);
}

Mouth.prototype.draw = function(matrix){
  //this.drawOpen(matrix);
  //this.drawNose(matrix);
  switch(this.expression){
    case "frown":
      this.drawFrown(matrix);
      break;
    case "open":
      this.drawOpen(matrix);
      break;
    default:
      this.drawSmile(matrix);
  }
}

Mouth.prototype.drawSmile = function(matrix){
  ctx = matrix.context;
  x = Math.floor(this.x);
  y = Math.floor(this.y-3);
  radius = Math.floor(this.radius);
  ctx.save();
  ctx.beginPath();
  ctx.translate(matrix.width/2*-1,0);
  ctx.scale(2,1);
  ctx.arc(x,y,radius,0,Math.PI,false);
  ctx.strokeStyle = this.color.toString();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

Mouth.prototype.drawFrown = function(matrix){
  ctx = matrix.context;
  x = Math.floor(this.x);
  y = Math.floor(this.y-3);
  radius = Math.floor(this.radius);
  ctx.save();
  ctx.beginPath();
  ctx.translate(matrix.width/2*-1,0);
  ctx.scale(2,1);
  ctx.arc(x,y+radius+2,radius,Math.PI,2*Math.PI,false);
  ctx.strokeStyle = this.color.toString();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

Mouth.prototype.drawOpen = function(matrix){
  ctx = matrix.context;
  x = Math.floor(this.x);
  y = Math.floor(this.y);
  radius = Math.floor(this.radius);
  ctx.save();
  ctx.beginPath();
  ctx.translate(matrix.width/2*-1,0);
  ctx.scale(2,1);
  ctx.arc(x,y,radius,0,Math.PI,false);
  ctx.arc(x,y-2,radius,0,Math.PI,false);
  ctx.strokeStyle = this.color.toString();
  ctx.fillStyle = this.color.toString();
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  //ctx.moveTo(x-radius+1,y);
  ctx.fillStyle = "rgba(255,255,255,255)";
  ctx.fillRect(x-radius+1,y-1,radius*2-2,2);
  
  ctx.fillStyle = "black";
  ctx.fillRect(x-radius+1,y+1,radius*2-2,2);

  ctx.fillStyle = "red";
  ctx.fillRect(x-radius+2,y+3,radius*2-4,1);

  //ctx.lineTo(x+radius-1,y);
  //ctx.stroke();

  ctx.restore();

 
}

Mouth.prototype.drawNose = function(matrix){
  ctx = matrix.context;
  ctx.beginPath();
  ctx.strokeStyle = "rgba(244,207,168,255)";
  ctx.arc(matrix.width/2,matrix.height/2,2,0,Math.PI,false);
  ctx.stroke();
}



Mouth.prototype.checkVisible = function(){
  this.visible = this.color.visible();
}

Mouth.prototype.dead = function(){
  return !this.visible;
}




