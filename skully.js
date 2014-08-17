var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random"),
    Image = require("./image"),
    Eye = require("./eye"),
    Animation = require("./animation"),
    Drippy = require("./drippy"),
    Sparkly = require("./sparkly");

var Skully = Animation.extend({
  props:{
    eyes:'object',
    jaw:'object',
    skull:'object',
    eyeCounter:'number',
    isScary:'boolean',
    isBloody:'boolean',
    isBurning:'boolean'
  }
});

module.exports = Skully;

Skully.prototype.initialize = function(args){
  this.backBlood = this.addSprite(new Drippy({y:0,hidden:true}));
  this.fire = this.addSprite(new Sparkly({hidden:true}));
  this.eyes = [
    this.addSprite(new Eye({x:12,y:13,radius:3})),
    this.addSprite(new Eye({x:21,y:13,radius:3}))
  ];
  this.jaw = this.addSprite(new Image({x:11,y:22,fileName:"skulljaw"}));
  this.skull = this.addSprite(new Image({fileName:"skull"}));
  this.frontBlood = this.addSprite(new Drippy({y:0,dripCount:10,darken:false,hidden:true}));
  this.eyeCounter = 0;
}

Skully.prototype.next = function(elapsed,matrix){
  var self = this;
  this.eyeCounter += elapsed;

  var xdir = Random.integer(1,3) > 1 ? 1 : -1;
  var xamt = Random.integer(0,2);
  var ydir = Random.integer(1,3) > 1 ? 1 : -1;
  var yamt = Random.integer(0,2);
  var scary = Random.integer(0,101) > 80;

  if (this.eyeCounter > 1){
    this.eyeCounter = 0;
    _.each(this.sprites,function(s){
      if (s.lookCenter){
        s.lookCenter();
        s.xOffset = xdir * xamt;
        s.yOffset = ydir * yamt;
        s.colorMode = "normal";
        if (scary){
          self.isScary = true;
          if (!self.isBurning) self.toggleBurning();
          s.xOffset = 0;
          s.yOffset = 0;
          s.colorMode = "evil";
        } else {
          self.isScary = false;
          if (self.isBurning) self.toggleBurning();
        } 
      } 
    });
  }

  if (this.isScary){
    this.jaw.yOffset = 2;
  } else {
    this.jaw.yOffset = ydir * yamt;
  }
}

Skully.prototype.toggleBurning = function(){
  this.isBurning = !this.isBurning;
  this.fire.hidden = !this.isBurning;
}

Skully.prototype.toggleBloody = function(){
  this.isBloody = !this.isBloody;
  this.backBlood.hidden = !this.isBloody;
  this.frontBlood.hidden = !this.isBloody;
}