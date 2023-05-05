/**
 * Find the length of an array of bits.
 * @param {bitArray} a The array.
 * @return {Number} The length of a, in bits.
 */

var getPartial = require('./get-partial');

module.exports = function (a) {
  var l = a.length, x;
  if (l === 0) { return 0; }
  x = a[l - 1];
  return (l-1) * 32 + getPartial(x);
};
