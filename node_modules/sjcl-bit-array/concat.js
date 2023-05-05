/**
 * Concatenate two bit arrays.
 * @param {bitArray} a1 The first array.
 * @param {bitArray} a2 The second array.
 * @return {bitArray} The concatenation of a1 and a2.
 */

var getPartial = require('./get-partial');
var shiftRight = require('./shift-right');

module.exports = function (a1, a2) {
  if (a1.length === 0 || a2.length === 0) {
    return a1.concat(a2);
  }
  
  var last = a1[a1.length-1], shift = getPartial(last);
  if (shift === 32) {
    return a1.concat(a2);
  } else {
    return shiftRight(a2, shift, last|0, a1.slice(0,a1.length-1));
  }
};
