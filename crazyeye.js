var _ = require("underscore"),
    Random = require("./random"),
    Color = require("./color"),
    Ripple = require("./ripple"),
    Animation = require("./animation");


var CrazyEye = Animation.extend({})

module.exports = CrazyEye;


CrazyEye.prototype.next = function(elapsed,matrix){
  var self = this;
  //matrix.darken(5);
  if (this.sprites.length < 10){
    var color = Color.random();
    this.addSprite(new Ripple({color:color,x:16,y:16,fadeSpeed:5}));
  }
}

