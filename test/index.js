/* global describe, it */

var assert = require('assert')
var wif = require('../')
var fixtures = require('./fixtures')

describe('WIF', function () {
  describe('encode/encodeRaw', function () {
    fixtures.valid.forEach(function (f) {
      it('returns ' + f.WIF + ' for ' + f.d.slice(0, 20) + '... (' + f.version + ')', function () {
        var actual = wif.encode(f.version, new Buffer(f.d, 'hex'), f.compressed)

        assert.strictEqual(actual, f.WIF)
      })
    })
  })

  describe('decode/decodeRaw', function () {
    fixtures.valid.forEach(function (f) {
      it('returns ' + f.d.slice(0, 20) + '... (' + f.version + ')' + ' for ' + f.WIF, function () {
        var actual = wif.decode(f.version, f.WIF)

        assert.strictEqual(actual.version, f.version)
        assert.strictEqual(actual.d.toString('hex'), f.d)
        assert.strictEqual(actual.compressed, f.compressed)
      })
    })

    fixtures.invalid.decode.forEach(function (f) {
      it('throws ' + f.exception + ' for ' + f.WIF, function () {
        assert.throws(function () {
          wif.decode(f.version, f.WIF)
        }, new RegExp(f.exception))
      })
    })
  })
})
