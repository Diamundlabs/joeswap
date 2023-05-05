/**
 * Make a partial word for a bit array.
 * @param {Number} len The number of bits in the word.
 * @param {Number} x The bits.
 * @param {Number} [0] _end Pass 1 if x has already been shifted to the high side.
 * @return {Number} The partial word.
 */

module.exports = function (len, x, _end) {
  if (len === 32) { return x; }
  return (_end ? x|0 : x << (32-len)) + len * 0x10000000000;
};
