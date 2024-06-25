"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = exports.encodeRaw = exports.decodeRaw = void 0;
var bs58check_1 = __importDefault(require("bs58check"));
function decodeRaw(buffer, version) {
    // check version only if defined
    if (version !== undefined && buffer[0] !== version)
        throw new Error('Invalid network version');
    // uncompressed
    if (buffer.length === 33) {
        return {
            version: buffer[0],
            privateKey: buffer.slice(1, 33),
            compressed: false
        };
    }
    // invalid length
    if (buffer.length !== 34)
        throw new Error('Invalid WIF length');
    // invalid compression flag
    if (buffer[33] !== 0x01)
        throw new Error('Invalid compression flag');
    return {
        version: buffer[0],
        privateKey: buffer.slice(1, 33),
        compressed: true
    };
}
exports.decodeRaw = decodeRaw;
function encodeRaw(version, privateKey, compressed) {
    if (privateKey.length !== 32)
        throw new TypeError('Invalid privateKey length');
    var result = new Uint8Array(compressed ? 34 : 33);
    var view = new DataView(result.buffer);
    view.setUint8(0, version);
    result.set(privateKey, 1);
    if (compressed) {
        result[33] = 0x01;
    }
    return result;
}
exports.encodeRaw = encodeRaw;
function decode(str, version) {
    return decodeRaw(bs58check_1.default.decode(str), version);
}
exports.decode = decode;
function encode(wif) {
    return bs58check_1.default.encode(encodeRaw(wif.version, wif.privateKey, wif.compressed));
}
exports.encode = encode;
