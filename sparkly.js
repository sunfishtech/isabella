var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random"),
    Animation = require("./animation"),
    Sparkler = require("./sparkler");

var Sparkly = Animation.extend({
  sparkCount:'number',
  darken:'boolean'
});

module.exports = Sparkly;

Sparkly.prototype.initialize = function(args){
  args = args || {};
  Animation.prototype.initialize.call(this,args);
  this.sparkCount = args.sparkCount || 100;
  this.darken = ('darken' in args) ? args.darken : true;
}

Sparkly.prototype.next = function(elapsed,matrix){
  var self = this;
  if (this.sprites.length < this.sparkCount){
    var c = Random.integer(0,20);
    this.sprites.push(new Sparkler({
      x:Random.integer(0,matrix.width),
      y:matrix.height-1,
      darken:this.darken
    }));
  }
}

