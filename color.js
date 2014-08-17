var Random = require("./random"),
    _ = require("underscore");

var Color = function(r,g,b,a){
  a = a || 255;
  this.color = [r,g,b,a];
}

module.exports = Color;

Color.prototype.fade = function(byAmount){
  byAmount = byAmount || 1;
  this.color[3] = this.color[3] > byAmount ? this.color[3] - byAmount : 0;
  return this;
}

Color.prototype.darken = function(byAmount){
  var self = this;
  byAmount = byAmount || 1;
  alpha = this.color[3];
  _.each(this.color,function(val,idx){
    self.color[idx] = val > byAmount ? val - byAmount : 0;
  });
  this.color[3] = alpha;
  return this;
}

Color.prototype.r = function(){return this.color[0]}
Color.prototype.g = function(){return this.color[1]}
Color.prototype.b = function(){return this.color[2]}
Color.prototype.a = function(){return this.color[3]}

Color.prototype.visible = function(){
  return this.color[3] > 0;
}

Color.prototype.dup = function(){
  return new Color(this.color[0],this.color[1],this.color[2],this.color[3]);
}

Color.prototype.toString = function(){
  r = Math.floor(this.color[0]);
  g = Math.floor(this.color[1]);
  b = Math.floor(this.color[2]);
  a = Math.floor(this.color[3]);
  return "rgba(" + r + "," + g + "," + b + "," + a/255 + ")"
}

Color.random = function(){
  return new Color(Random.integer(0,256),Random.integer(0,256),Random.integer(0,256));
}



