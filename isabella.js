var Matrix = require("./matrix"),
    SerialPort = require("serialport").SerialPort,
    Sleep = require("sleep"),
    _ = require("underscore"),
    Loop = require("./loop"),
    Random = require("./random"),
    Color = require("./color");

var animations = {
  skully: require("./skully"),
  face: require("./face"),
  fireflies: require("./fireflies"),
  fireworks: require("./fireworks"),
  drippy: require("./drippy"),
  crazyeye: require("./crazyeye"),
  sparkly: require("./sparkly")
};


var Server = function(){
  var self = this;
  var framerate = process.argv[3] || 30;
  this.matrix = new Matrix(32,32);
  this.loop = new Loop(framerate,function(delta){
    self.update(delta);
  });
  this.sprites = [];
  this.drawing = 0;

}

module.exports = Server;

Server.prototype.start = function(){
  var self = this;
  this.serialPort = new SerialPort("/dev/tty.usbmodem431941",{baudRate:230400});
  this.matrix.clear();

  var animation = animations[process.argv[2]] || animations.skully;
  this.sprites.push(new animation());
  
  this.serialPort.on("open",function(){
    self.loop.start();
    _.each(self.sprites,function(sprite){
      if (sprite.start) sprite.start(self.matrix);
    });
  });
}

Server.prototype.update = function(delta){
  var self = this;
  var matrix = self.matrix;
  matrix.clear();
  var p = this.prune();
  _.each(self.sprites,function(s){s.update(delta,matrix)});
  self.draw();
}

Server.prototype.prune = function(){
  var c = this.sprites.length;
  this.sprites = _.reject(this.sprites,function(s){return s.dead ? s.dead() : false});
  return c - this.sprites.length;
}

Server.prototype.draw = function(callback){
  var self = this;
  self.serialPort.write(self.matrix.getBuffer(),function(){
    self.serialPort.drain(function(){
        if(callback) callback();
    });
  });
}

new Server().start();

