/**
 * Compare two arrays for equality in a predictable amount of time.
 * @param {bitArray} a The first array.
 * @param {bitArray} b The second array.
 * @return {boolean} true if a == b; false otherwise.
 */

var bitLength = require('./bit-length');

module.exports = function (a, b) {
  if (bitLength(a) !== bitLength(b)) {
    return false;
  }
  var x = 0, i, l = a.length;
  for (i=0; i<l; i++) {
    x |= a[i]^b[i];
  }
  return (x === 0);
};
