var clamp = require('sjcl-bit-array/clamp');

/** Convert from a hex string to a bitArray. */
module.exports = function (str) {
  var i, l, out=[], len;
  str = str.replace(/\s|0x/g, "");
  len = str.length;
  str = str + "00000000";
  l = str.length;
  for (i=0; i<l; i+=8) {
    out.push(parseInt(str.substr(i,8),16)^0);
  }
  return clamp(out, len*4);
};
