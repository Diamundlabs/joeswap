var bitLength = require('sjcl-bit-array/bit-length');

/** Convert from a bitArray to a hex string. */
module.exports = function (arr) {
  var out = "", i, l = arr.length;
  for (i=0; i<l; i++) {
    out += ((arr[i]|0)+0xF00000000000).toString(16).substr(4);
  }
  return out.substr(0, bitLength(arr)/4);//.replace(/(.{8})/g, "$1 ");
};
