var _ = require("underscore"),
    Random = require("./random"),
    Color = require("./color"),
    Ripple = require("./ripple");


var Fireworks = function(){
  var self = this;
  this.sprites = [];
}

module.exports = Fireworks;

Fireworks.prototype.start = function(matrix){
}

Fireworks.prototype.update = function(elapsed,matrix){
  var self = this;
  this.prune();
  _.each(self.sprites,function(s){s.update(elapsed,matrix)});
  if (this.sprites.length < 5){
    var color = Color.random();//new Color(200,200,Random.integer(100,256),Random.integer(100,256));
    this.sprites.push(new Ripple({color:color,x:Random.integer(0,32),y:Random.integer(0,32),fadeSpeed:20}));
  }
}

Fireworks.prototype.prune = function(){
  var c = this.sprites.length;
  this.sprites = _.reject(this.sprites,function(s){return s.dead()});
  return c - this.sprites.length;
}

