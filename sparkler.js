var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random"),
    Pixel = require("./pixel"),
    Animation = require("./animation");

var Sparkler = Animation.extend({
  props:{
    color:'object',
    tailFadeSpeed:'number',
    fadeSpeed:'number',
    speed:'number',
    pixels:'array',
    darken:'boolean',
    counter:'number',
    sparkles:'array'
  }
});

Sparkler.prototype.initialize = function(args) {
  args = args || {};
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.color = args.color || new Color(255,Random.integer(100,200),Random.integer(0,100));
  this.tailFadeSpeed = args.tailFadeSpeed || 10;
  this.fadeSpeed = args.fadeSpeed || 5;
  this.speed = args.speed || Random.integer(5,15);
  this.darken = args.darken;
  this.counter = 255;
  this.sparkles = [];
  this.addPixel();
}

module.exports = Sparkler;

Sparkler.prototype.next = function(elapsed,matrix){
  this.fadePixels();
  this.y -= this.speed * elapsed;
  this.x += Random.integer(-1,2);
  this.counter -= this.fadeSpeed;
  //this.color.fade(this.fadeSpeed);
  if(this.counter > 0){
    this.addPixel();
  }
}

Sparkler.prototype.update = function(elapsed,matrix){
  Animation.prototype.update.call(this,elapsed,matrix);
  this.drawSparkle(matrix);
}


Sparkler.prototype.dead = function(){
  return !_.detect(this.sprites,function(p){
    return p.visible
  });
}

Sparkler.prototype.addPixel = function(){
  this.addSprite(new Pixel({
    x:this.x,
    y:this.y,
    color:this.color.dup()
  }))
}

Sparkler.prototype.drawSparkle = function(matrix){
  // var self = this;
  // matrix.drawPixel(this.x,this.y,new Color(255,255,255,this.counter+100 > 255 ? 255 : this.count+100));
  // if (this.counter % Random.integer(1,100) == 0)
  //   matrix.drawPixel(this.x,this.y+1,new Color(255,255,255,this.counter+100));
}

Sparkler.prototype.fadePixels = function(byAmount){
  var self = this;
  byAmount = byAmount || this.tailFadeSpeed;
  _.each(this.sprites,function(p){
    if(self.darken) p.darken(byAmount);
    p.fade(byAmount)
  });
}




