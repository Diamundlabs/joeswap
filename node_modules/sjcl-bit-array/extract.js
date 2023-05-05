/**
 * Extract a number packed into a bit array.
 * @param {bitArray} a The array to slice.
 * @param {Number} bstart The offset to the start of the slice, in bits.
 * @param {Number} length The length of the number to extract.
 * @return {Number} The requested slice.
 */

module.exports = function(a, bstart, blength) {
  // FIXME: this ~~ is not necessary at all, but for some reason
  // seems to suppress a bug in the Chromium JIT.
  var x, sh = ~~((-bstart-blength) & 31);
  if ((bstart + blength - 1 ^ bstart) & -32) {
    // it crosses a boundary
    x = (a[bstart/32|0] << (32 - sh)) ^ (a[bstart/32+1|0] >>> sh);
  } else {
    // within a single word
    x = a[bstart/32|0] >>> sh;
  }
  return x & ((1<<blength) - 1);
};
