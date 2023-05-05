/**
 * Truncate an array.
 * @param {bitArray} a The array.
 * @param {Number} len The length to truncate to, in bits.
 * @return {bitArray} A new array, truncated to len bits.
 */

var partial = require('./partial');

module.exports = function (a, len) {
  if (a.length * 32 < len) { return a; }
  a = a.slice(0, Math.ceil(len / 32));
  var l = a.length;
  len = len & 31;
  if (l > 0 && len) {
    a[l-1] = partial(len, a[l-1] & 0x80000000 >> (len-1), 1);
  }
  return a;
};
