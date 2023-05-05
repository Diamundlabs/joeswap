/** xor a block of 4 words together.
 * @private
 */

module.exports = function(x,y) {
  return [x[0]^y[0],x[1]^y[1],x[2]^y[2],x[3]^y[3]];
};
