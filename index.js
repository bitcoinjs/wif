var bs58check = require('bs58check')

function decodeRaw (version, buffer) {
  if (buffer[0] !== version) throw new Error('Invalid network version')

  // compression flag?
  if (buffer.length === 34) {
    if (buffer[33] !== 0x01) throw new Error('Invalid compression flag')

    // truncate the version byte/compression flag
    return {
      version: buffer[0],
      d: buffer.slice(1, -1),
      compressed: true
    }
  }

  // no compression flag
  if (buffer.length !== 33) throw new Error('Invalid WIF length')

  return {
    version: buffer[0],
    d: buffer.slice(1),
    compressed: false
  }
}

function decode (version, string) {
  return decodeRaw(version, bs58check.decode(string))
}

function encodeRaw (version, d, compressed) {
  var buffer = new Buffer(compressed ? 34 : 33)

  buffer.writeUInt8(version, 0)
  d.copy(buffer, 1)

  if (compressed) {
    buffer[33] = 0x01
  }

  return buffer
}

function encode (version, d, compressed) {
  return bs58check.encode(encodeRaw(version, d, compressed))
}

module.exports = {
  decode: decode,
  decodeRaw: decodeRaw,
  encode: encode,
  encodeRaw: encodeRaw
}
