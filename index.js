var bs58check = require('bs58check')

function decodeRaw (buffer, version) {
  // check version only if defined
  if (version !== undefined && buffer[0] !== version) {
    throw new Error('Invalid network version')
  }

  if (buffer.length === 33 || (buffer.length === 34 && buffer[33] === 0x01)) {
    return {
      version: buffer[0],
      buffer: buffer.slice(1, 33),
      compressed: buffer.length === 34
    }
  }

  // invalid compression flag
  if (buffer.length === 34) {
    throw new Error('Invalid compression flag')
  }

  // invalid length
  throw new Error('Invalid WIF length')
}

function decode (string, version) {
  return decodeRaw(bs58check.decode(string), version)
}

function encodeRaw (version, buffer, compressed) {
  var result = new Buffer(compressed ? 34 : 33)

  result.writeUInt8(version, 0)
  buffer.copy(result, 1)

  if (compressed) {
    result[33] = 0x01
  }

  return result
}

function encode (version, buffer, compressed) {
  if (typeof version !== 'number') {
    compressed = version.compressed
    buffer = version.buffer
    version = version.version
  }

  return bs58check.encode(encodeRaw(version, buffer, compressed))
}

module.exports = {
  decode: decode,
  decodeRaw: decodeRaw,
  encode: encode,
  encodeRaw: encodeRaw
}
