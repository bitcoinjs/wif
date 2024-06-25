# WIF
[![TRAVIS](https://secure.travis-ci.org/bitcoinjs/wif.png)](http://travis-ci.org/bitcoinjs/wif)
[![NPM](http://img.shields.io/npm/v/wif.svg)](https://www.npmjs.org/package/wif)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Bitcoin Wallet Import Format encoding/decoding module.


## Example

``` javascript
import * as wif from "wif"
var privateKey = Buffer.from('0000000000000000000000000000000000000000000000000000000000000001', 'hex')
var key = wif.encode({version: 128, privateKey, compressed: true}) // for the testnet use: wif.encode(239, ...
// => KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn

var obj = wif.decode(key)
// => {
//	version: 128,
//	privateKey: Uint8Array(32) [
//     0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 1
//   ],
//	compressed: true
//}

wif.decode(key, 0x09)
// => Error: Invalid network version

// alternative syntax
wif.encode(obj)
// => KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn
```

## LICENSE [MIT](LICENSE)
