import { encode, decode } from '../src/esm/index.js'
import fixtures from './fixtures.json' assert { type: 'json' }
import tape from 'tape'
import { fromHex, toHex } from 'uint8array-tools'

const { invalid, valid } = fixtures

valid.forEach(function (f) {
  tape('encode/encodeRaw returns ' + f.WIF + ' for ' + f.privateKeyHex.slice(0, 20) + '... (' + f.version + ')', function (t) {
    t.plan(1)

    const privateKey = fromHex(f.privateKeyHex)
    const actual = encode({version: f.version, privateKey, compressed: f.compressed})
    t.equal(actual, f.WIF)
  })
})

valid.forEach(function (f) {
  tape('decode/decodeRaw returns ' + f.privateKeyHex.slice(0, 20) + '... (' + f.version + ')' + ' for ' + f.WIF, function (t) {
    t.plan(3)

    const actual = decode(f.WIF, f.version)
    t.equal(actual.version, f.version)
    t.equal(toHex(actual.privateKey), f.privateKeyHex)
    t.equal(actual.compressed, f.compressed)
  })
})

invalid.encode.forEach(function (f) {
  tape('throws ' + f.exception + ' for ' + f.privateKeyHex, function (t) {
    t.plan(1)
    t.throws(function () {
      encode({version: f.version, privateKey: fromHex(f.privateKeyHex)})
    }, new RegExp(f.exception))
  })
})

invalid.decode.forEach(function (f) {
  tape('throws ' + f.exception + ' for ' + f.WIF, function (t) {
    t.plan(1)
    t.throws(function () {
      decode(f.WIF, f.version)
    }, new RegExp(f.exception))
  })
})

valid.forEach(function (f) {
  tape('decode/encode for ' + f.WIF, function (t) {
    t.plan(1)

    const actual = encode(decode(f.WIF, f.version))
    t.equal(actual, f.WIF)
  })
})
