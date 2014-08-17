var _ = require("underscore"),
    Color = require("./color"),
    Random = require("./random"),
    Animation = require("./animation"),
    Drip = require("./drip");

var Drippy = Animation.extend({
  dripCount:'number',
  darken:'boolean'
});

module.exports = Drippy;

Drippy.prototype.initialize = function(args){
  args = args || {};
  Animation.prototype.initialize.call(this,args);
  this.dripCount = args.dripCount || 100;
  this.darken = ('darken' in args) ? args.darken : true;
}

Drippy.prototype.next = function(elapsed,matrix){
  var self = this;
  if (this.sprites.length < this.dripCount){
    var c = Random.integer(0,20);
    this.sprites.push(new Drip({
      x:Random.integer(0,matrix.width),
      y:this.y,
      color:new Color(Random.integer(50,150),c,c,255),
      darken:this.darken
    }));
  }
}

