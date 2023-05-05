var test = require('tape')
var vector = require('./vectors')
var bitArray = require('../index')

function word2hex(w) {
  return "0x" + ((w|0)+0xF00000000000).toString(16).substr(4);
}

var b0 = bitArray.partial(1, 0);
var b1 = bitArray.partial(1, 1);

function concatbits(s) {
  var j, b, a = [];
  for (j = 0; j < s.length; ++j) {
    b = (s[j] == '1' ? b1 : b0);
    a = bitArray.concat(a, [b]);
  }
  return a;
}

test("bitArray single bits", function (assert) {
  assert.ok((b0|0) === (0x00000000|0), "bitstring '0': " + word2hex(b0));
  assert.ok((b1|0) === (0x80000000|0), "bitstring '1': " + word2hex(b1));
  assert.end();
});

test("bitArray concat small bitstrings", function (assert) {
  var i, kat = vector.bits, tv, a, b, bitlen, t;
  for (i=0; i<kat.length; i++) {
    tv = kat[i];
    a = concatbits(tv[0]);
    bitlen = bitArray.bitLength(a);
    t = "bitstring '" + tv[0] + "': ";
    assert.ok(1 === a.length, t + "array length is 1: " + a.length);
    assert.ok(bitlen === tv[0].length, t + "length " + bitlen + " matches input length " + tv[0].length);
    b = bitArray.partial(tv[0].length, tv[1]);
    assert.ok(a[0] === b, t + "array matches shifted number: " + word2hex(a[0]) + " == " + word2hex(b));
    b = 0 | (a[0] >>> (32 - tv[0].length)); // unsigned shift, convert to signed word
    assert.ok(b === (tv[1]|0), t + "array entry shifted is number: " + word2hex(b) + " == " + word2hex(tv[1]));
  }
  assert.end();
});

test("bitArray concat, slicing, shifting and clamping", function (assert) {
  var i, j, kat = vector.slices, tv, a, a1, b, bitlen, t;
  for (i=0; i<kat.length; i++) {
    tv = kat[i];
    a = [];
    b = [];

    bitlen = 0;
    for (j=0; j<tv[0].length; j++) {
      b[j] = concatbits(tv[0][j]);
      a = bitArray.concat(a, b[j]);
      bitlen += tv[0][j].length;
    }

    // shift last array entry and set partial length on it
    a1 = tv[1]; a1 = a1.slice(0, a1.length);
    bitlen &= 31;
    if (0 !== bitlen) a1[a1.length-1] = bitArray.partial(bitlen, a1[a1.length-1]);

    assert.ok(bitArray.equal(a, a1), "concat: [" + a + "] == [" + a1 + "]");

    t = 0;
    for (j=0; j<tv[0].length; j++) {
      bitlen = bitArray.bitLength(b[j]);
      assert.ok(bitlen === tv[0][j].length, "bitstring length");
      a1 = bitArray.bitSlice(a, t, t + bitlen);
      assert.ok(bitArray.equal(b[j], a1), "slice after concat: [" + b[j] + "] == [" + a1 + "]");
      t += bitlen;
    }
  }
  assert.end();
});

test("bitArray byteswap", function (assert) {
  var i, kat = vector.byteswap, tv, a;
  for (i=0; i<kat.length; i++) {
    tv = kat[i];

    a = tv[1];
    assert.ok(bitArray.equal(tv[0], bitArray.byteswapM(a.slice(0, a.length))));
  }
  assert.end();
});
