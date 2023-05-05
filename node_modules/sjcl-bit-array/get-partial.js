/**
 * Get the number of bits used by a partial word.
 * @param {Number} x The partial word.
 * @return {Number} The number of bits used by the partial word.
 */

module.exports = function (x) {
  return Math.round(x/0x10000000000) || 32;
};
