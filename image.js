var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random"),
    Canvas = require("canvas"),
    fs = require("fs");

var Image = function(args) {
  var self = this;
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.xOffset = 0;
  this.yOffset = 0;
  this.filePath = __dirname + "/images/" + args.fileName + ".png";
  fs.readFile(this.filePath,function(err,img){
    self.image = new Canvas.Image;
    self.image.src = img;
  });
}

module.exports = Image;

Image.prototype.update = function(elapsed,matrix){
  this.next(elapsed,matrix);
}

Image.prototype.next = function(elapsed,matrix){
  this.draw(matrix);
}

Image.prototype.draw = function(matrix){
  if (this.image){
    var x = Math.floor(this.x+this.xOffset);
    var y = Math.floor(this.y+this.yOffset);
    matrix.drawImage(this.image,x,y);
  }
}

Image.prototype.dead = function(){
  return false;
}




