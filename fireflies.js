var _ = require("underscore"),
    Pixel = require("./pixel"),
    Random = require("./random"),
    Color = require("./color");


var Fireflies = function(){
  var self = this;
  this.sprites = [];
}

module.exports = Fireflies;

Fireflies.prototype.start = function(matrix){
  var color = Color.random();
  for(var i=0;i<10;i++){
    this.sprites.push(new Pixel({color:color,x:Random.integer(10,16),y:Random.integer(10,16),xSpeed:Random.integer(10,20),ySpeed:Random.integer(10,20)}));
  }
}

Fireflies.prototype.update = function(elapsed,matrix){
  var self = this;
  matrix.clear();
  _.each(self.sprites,function(s){s.update(elapsed,matrix)});
}

