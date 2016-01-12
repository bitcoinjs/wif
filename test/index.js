/* global describe, it */

var assert = require('assert')
var wif = require('../')
var fixtures = require('./fixtures')

describe('WIF', function () {
  describe('encode/encodeRaw', function () {
    fixtures.valid.forEach(function (f) {
      it('returns ' + f.WIF + ' for ' + f.privateKeyHex.slice(0, 20) + '... (' + f.version + ')', function () {
        var privateKey = new Buffer(f.privateKeyHex, 'hex')
        var actual = wif.encode(f.version, privateKey, f.compressed)

        assert.strictEqual(actual, f.WIF)
      })
    })
  })

  describe('decode/decodeRaw', function () {
    fixtures.valid.forEach(function (f) {
      it('returns ' + f.privateKeyHex.slice(0, 20) + '... (' + f.version + ')' + ' for ' + f.WIF, function () {
        var actual = wif.decode(f.WIF, f.version)

        assert.strictEqual(actual.version, f.version)
        assert.strictEqual(actual.privateKey.toString('hex'), f.privateKeyHex)
        assert.strictEqual(actual.compressed, f.compressed)
      })
    })

    fixtures.invalid.decode.forEach(function (f) {
      it('throws ' + f.exception + ' for ' + f.WIF, function () {
        assert.throws(function () {
          wif.decode(f.WIF, f.version)
        }, new RegExp(f.exception))
      })
    })
  })

  describe('decode/encode', function () {
    fixtures.valid.forEach(function (f) {
      it(f.WIF, function () {
        var actual = wif.encode(wif.decode(f.WIF, f.version))
        assert.strictEqual(actual, f.WIF)
      })
    })
  })
})
