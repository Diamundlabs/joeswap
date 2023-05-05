var test = require('tape')
var from = require('./from-bits')
var to = require('./to-bits')

test('it works', function (assert) {
  var hex = '00ccdd'
  var bits = to(hex)
  assert.same(bits, [26388292492544])
  assert.equal(from(bits), hex)
  assert.end()
})
