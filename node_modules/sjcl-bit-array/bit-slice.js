/**
 * Array slices in units of bits.
 * @param {bitArray} a The array to slice.
 * @param {Number} bstart The offset to the start of the slice, in bits.
 * @param {Number} bend The offset to the end of the slice, in bits.  If this is undefined,
 * slice until the end of the array.
 * @return {bitArray} The requested slice.
 */

var shiftRight = require('./shift-right');
var clamp = require('./clamp');

module.exports = function (a, bstart, bend) {
  a = shiftRight(a.slice(bstart/32), 32 - (bstart & 31)).slice(1);
  return (bend === undefined) ? a : clamp(a, bend-bstart);
};
