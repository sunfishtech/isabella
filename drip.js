var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random"),
    Pixel = require("./pixel"),
    Animation = require("./animation");

var Drip = Animation.extend({
  props:{
    color:'object',
    tailFadeSpeed:'number',
    fadeSpeed:'number',
    speed:'number',
    pixels:'array',
    darken:'boolean'
  }
});

Drip.prototype.initialize = function(args) {
  args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.color = args.color || Color.random();
  this.tailFadeSpeed = args.tailFadeSpeed || 8;
  this.fadeSpeed = args.fadeSpeed || 3;
  this.speed = args.speed || Random.integer(5,15);
  this.darken = args.darken;
  this.addPixel();
}

module.exports = Drip;

Drip.prototype.next = function(elapsed,matrix){
  this.fadePixels();
  this.y += this.speed * elapsed;
  this.color.fade(this.fadeSpeed);
  if(this.color.visible()){
    this.addPixel();
  }
}


Drip.prototype.dead = function(){
  return !_.detect(this.sprites,function(p){
    return p.visible
  });
}

Drip.prototype.addPixel = function(){
  this.addSprite(new Pixel({
    x:this.x,
    y:this.y,
    color:this.color.dup()
  }))
}

Drip.prototype.fadePixels = function(byAmount){
  var self = this;
  byAmount = byAmount || this.tailFadeSpeed;
  _.each(this.sprites,function(p){
    if(self.darken) p.darken(byAmount);
    p.fade(byAmount)
  });
}




