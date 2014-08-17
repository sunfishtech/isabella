//Ripped from https://raw.githubusercontent.com/timetocode/node-game-loop/master/gameLoop.js

var Loop = function(framesPerSecond,update){
  var self = this;
  this.fps = framesPerSecond;
  this.tickLengthMs = 1000 / this.fps;
  this.previousTick = Date.now();
  this.actualTicks = 0;
  this.update = update || function(delta){console.log(delta)};
}

module.exports = Loop;

Loop.prototype.start = function(){
  this.tick();
}

Loop.prototype.tick = function(){
  var now = Date.now();
  var self = this;
  this.actualTicks++;
  if(this.previousTick + this.tickLengthMs <= now){
    var delta = (now - this.previousTick) / 1000;
    this.previousTick = now;
    
    if (this.update) this.update(delta);

    actualTicks = 0;
  }
  if (Date.now() - this.previousTick < this.tickLengthMs - 16){
    setTimeout(function(){self.tick()});
  } else {
    setImmediate(function(){self.tick()});
  }
}

