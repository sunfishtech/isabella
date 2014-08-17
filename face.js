var _ = require("underscore"),
    Pixel = require("./pixel"),
    Random = require("./random"),
    Color = require("./color"),
    Eye = require("./eye"),
    Mouth = require("./mouth");

var Face = function(){
  this.sprites = [];  
}

module.exports = Face;

Face.prototype.start = function(matrix){
  var self = this;
  this.eyes = [
    this.addSprite(new Eye({x:8,y:10})),
    this.addSprite(new Eye({x:matrix.width-8,y:10}))
  ];
  this.mouth = 
    this.addSprite(new Mouth({x:matrix.width/2,y:matrix.height-8}));
}

Face.prototype.addSprite = function(sprite){
  this.sprites.push(sprite);
  return sprite;
}

Face.prototype.update = function(elapsed,matrix){
  var self = this;
  var xdir = Random.integer(1,3) > 1 ? 1 : -1;
  var xamt = Random.integer(0,2);
  var ydir = Random.integer(1,3) > 1 ? 1 : -1;
  var yamt = Random.integer(0,2);
  _.each(this.eyes,function(eye){
      eye.lookCenter();
      eye.xOffset = xdir * xamt;
      eye.yOffset = ydir * yamt;
  });
  rdm = Random.integer(0,21);
  if (rdm > 18)
    this.mouth.expression = "frown";
  else if (rdm > 15)
    this.mouth.expression = "open";
  else
    this.mouth.expression = "smile";
   
  _.each(self.sprites,function(s){s.update(elapsed,matrix)});
}



