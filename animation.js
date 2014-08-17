var _ = require("underscore"),
    State = require("ampersand-state");

var Animation = State.extend({
  props:{
    x:{type:'number',default:0},
    y:{type:'number',default:0},
    sprites: 'array',
    hidden:'boolean'
  }
});

module.exports = Animation;

Animation.prototype.initialize = function(args){
  this.sprites = [];
}

Animation.prototype.update = function(elapsed,matrix){
  this.prune();
  this.next(elapsed,matrix);
  if (!this.hidden){
    _.each(this.sprites,function(sprite){
      sprite.update(elapsed,matrix);
    });
  }
}

Animation.prototype.next = function(elapsed,matrix){
  console.log("tick tock");
}

Animation.prototype.addSprite = function(sprite){
  this.sprites = this.sprites || [];
  this.sprites.push(sprite);
  return sprite;
}

Animation.prototype.prune = function(){
  var c = this.sprites.length;
  this.sprites = _.reject(this.sprites,function(p){return p.dead ? p.dead() : false});
  return c - this.sprites.length;
}

