var Canvas = require("canvas"), 
    Color = require("./color"),
    fs = require("fs"),
    _ = require("underscore");

var gamma = [
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x01,0x01,0x01,0x01,0x01,0x01,
  0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,
  0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,
  0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,
  0x01,0x01,0x01,0x01,0x01,0x01,0x02,0x02,
  0x02,0x02,0x02,0x02,0x02,0x02,0x02,0x02,
  0x02,0x02,0x02,0x02,0x02,0x02,0x02,0x02,
  0x02,0x02,0x02,0x02,0x02,0x03,0x03,0x03,
  0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,
  0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x04,
  0x04,0x04,0x04,0x04,0x04,0x04,0x04,0x04,
  0x04,0x04,0x04,0x04,0x04,0x04,0x05,0x05,
  0x05,0x05,0x05,0x05,0x05,0x05,0x05,0x05,
  0x05,0x05,0x05,0x06,0x06,0x06,0x06,0x06,
  0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x07,
  0x07,0x07,0x07,0x07,0x07,0x07,0x07,0x07,
  0x07,0x07,0x08,0x08,0x08,0x08,0x08,0x08,
  0x08,0x08,0x08,0x08,0x09,0x09,0x09,0x09,
  0x09,0x09,0x09,0x09,0x09,0x0a,0x0a,0x0a,
  0x0a,0x0a,0x0a,0x0a,0x0a,0x0a,0x0b,0x0b,
  0x0b,0x0b,0x0b,0x0b,0x0b,0x0b,0x0c,0x0c,
  0x0c,0x0c,0x0c,0x0c,0x0c,0x0c,0x0d,0x0d,
  0x0d,0x0d,0x0d,0x0d,0x0d,0x0e,0x0e,0x0e,
  0x0e,0x0e,0x0e,0x0e,0x0f,0x0f,0x0f,0x0f
];


var Matrix = function(width,height,pixelMode){
  var self = this;
  this.width = width;
  this.height = height;
  this.canvas = new Canvas(width,height);
  this.context = this.canvas.getContext('2d');
  this.pixelMode = pixelMode || "normal";
}

module.exports = Matrix;

Matrix.prototype.drawImageFile = function(filePath,opts,callback){
  var self = this;
  opts = opts || {};
  
  fs.readFile(filePath,function(err,img){
    if(err) throw err;
    image = new Canvas.Image;
    image.src = img;
    var x = opts.x || 0;
    var y = opts.y || 0;
    var w = opts.width || image.width;
    var h = opts.height || image.height;
    self.drawImage(image,x,y,w,h);
    if (callback) callback();
  });
}

Matrix.prototype.drawImage = function(image,x,y,w,h){
  x = x || 0;
  y = y || 0;
  w = w || image.width;
  h = h || image.height;
  this.context.drawImage(image,x,y,w,h);
}

Matrix.prototype.getBuffer = function(){
  var matrixBuffer = new Array(this.width*this.height*3);
  var pixels = this.context.getImageData(0,0,this.width,this.height).data;

  for (var y = 0; y < this.height; y++){
    for (var x = 0; x < this.width; x++){
      for (var c = 0; c < 3; c++){
        var pixelIndex  = ((y * this.width + x) * 4) + c;
        var bufferIndex = ((y * this.width + x) * 3) + c;
        matrixBuffer[bufferIndex] = pixels[pixelIndex];
      }
    }
  }
  return matrixBuffer;
}

Matrix.prototype.darken = function(byAmount){
  var pixels = this.context.getImageData(0,0,this.width,this.height);
  for (var y = 0; y < this.height; y++){
    for (var x = 0; x < this.width; x++){
      var index = (y * this.width + x) * 4;
      var r = this.darkenChannel(pixels.data[index],byAmount);
      var g = this.darkenChannel(pixels.data[index+1],byAmount);
      var b = this.darkenChannel(pixels.data[index+2],byAmount);
      var a = 255;
      pixels.data[index] = r; pixels.data[index+1] = g; pixels.data[index+2] = b; pixels.data[index+3] = a;
    }
  }
  this.context.putImageData(pixels,0,0);
}

Matrix.prototype.darkenChannel = function(val,byAmount){
  byAmount = byAmount || 1;
  return val > byAmount ? val - byAmount : 0;
}

Matrix.prototype.clear = function(){
  this.context.save();

  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.context.restore();
}

Matrix.prototype.drawPixel = function(x,y,color){
  if (this.pixelMode != "fast"){
    this.context.save();
    this.context.fillStyle = color.toString();
    this.context.fillRect(x,y,1,1);
    this.context.restore();
  } else {
    this._pxid = this._pxid || this.context.createImageData(1,1); // only do this once per page
    this._pxd  = this._pxd || this._pxid.data;                        // only do this once per page
    this._pxd[0]   = Math.floor(color.r());
    this._pxd[1]   = Math.floor(color.g());
    this._pxd[2]   = Math.floor(color.b());
    this._pxd[3]   = Math.floor(color.a());
    this.context.putImageData( this._pxid, Math.floor(x), Math.floor(y) );  
  }
  
 
}

Matrix.prototype.drawRect = function(x,y,w,h,color,fillColor){
  this.context.save();
  if (fillColor){
    this.context.fillStyle = fillColor.toString();
    this.context.fillRect(x,y,w,h);
  }
  this.context.strokeStyle = color.toString();
  this.context.strokeRect(x,y,w,h);
  this.context.restore();
}

Matrix.prototype.drawCircle = function(x,y,r,color,fillColor){
  this.context.beginPath();
  this.context.arc(Math.floor(x),Math.floor(y),Math.floor(r),0,2 * Math.PI,false);
  if (fillColor){
    this.context.fillStyle = fillColor.toString();
    this.context.fill();
  }
  this.context.lineWidth = 0.5;
  this.context.strokeStyle = color.toString();
  this.context.stroke();
  this.context.closePath();
}

// Matrix.prototype.writeBufferPixel = function(x,y,r,g,b,buffer){
//   var bit, limit;
//   //# of bitplanes. adruino lib uses 4
//   var nPlanes = 4;
//   //matrix is multiplexed
//   var nRows = this.height / 2;

//   if((x < 0) || (x >= this.width) || (y < 0) || (y >= this.height)) return;
//   //arduino matrix lib uses 444 colors
//   rgb = _.map([r,g,b],function(c){
//     return gamma[c] & 0xF;
//   });
//   r = rgb[0]; g = rgb[1]; b = rgb[2];

//   bit = 2;
//   limit = 1 << nPlanes;

//   var baseAddr;
//   if (y < nRows) {
//     baseAddr = y*this.width*(nPlanes-1)+x;
//     buffer[baseAddr+64] &= 0xFC;
//     if (r & 1) buffer[baseAddr+64] |= 1;
//     if (g & 1) buffer[baseAddr+64] |= 2;
//     if (b & 1) buffer[baseAddr+32] |= 1;
//     else       buffer[baseAddr+32] &= 0xFE;

//     for (; bit < limit; bit <<= 1){
//       buffer[baseAddr] &= 0xE3;
//       if (r & bit) buffer[baseAddr] |= 4;
//       if (g & bit) buffer[baseAddr] |= 8;
//       if (b & bit) buffer[baseAddr] |= 16;
//       baseAddr += this.width;
//     }
//   } else {
//     baseAddr = (y-nRows)*this.width*(nPlanes-1)+x;
//     buffer[baseAddr] &= 0xFC;
//     if (r & 1) buffer[baseAddr+32] |= 2;
//     else       buffer[baseAddr+32] &= 0xFD;
//     if (g & 1) buffer[baseAddr] |= 1;
//     if (b & 1) buffer[baseAddr] |= 2;
//     for (; bit < limit; bit <<= 1){
//       buffer[baseAddr] &= 0x1F;
//       if (r & bit) buffer[baseAddr] |= 32;
//       if (g & bit) buffer[baseAddr] |= 64;
//       if (b & bit) buffer[baseAddr] |= 128;
//       baseAddr += this.width;
//     }
//   }
//
//}




