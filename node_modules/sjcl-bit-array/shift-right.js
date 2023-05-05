/** Shift an array right.
 * @param {bitArray} a The array to shift.
 * @param {Number} shift The number of bits to shift.
 * @param {Number} [carry=0] A byte to carry in
 * @param {bitArray} [out=[]] An array to prepend to the output.
 * @private
 */

var getPartial = require('./get-partial')
var partial = require('./partial')

module.exports = function (a, shift, carry, out) {
  var i, last2=0, shift2;
  if (out === undefined) { out = []; }
  
  for (; shift >= 32; shift -= 32) {
    out.push(carry);
    carry = 0;
  }
  if (shift === 0) {
    return out.concat(a);
  }
  
  for (i=0; i<a.length; i++) {
    out.push(carry | a[i]>>>shift);
    carry = a[i] << (32-shift);
  }
  last2 = a.length ? a[a.length-1] : 0;
  shift2 = getPartial(last2);
  out.push(partial(shift+shift2 & 31, (shift + shift2 > 32) ? carry : out.pop(),1));
  return out;
};
