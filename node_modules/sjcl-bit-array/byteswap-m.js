/** byteswap a word array inplace.
 * (does not handle partial words)
 * @param {bitArray} a word array
 * @return {bitArray} byteswapped array
 */

module.exports = function(a) {
  var i, l = a.length, v, m = 0xff00;
  for (i = 0; i < l; ++i) {
    v = a[i];
    a[i] = (v >>> 24) | ((v >>> 8) & m) | ((v & m) << 8) | (v << 24);
  }
  return a;
};
