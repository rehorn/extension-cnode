// fork form extensions-jce
const fs = require('fs');
const zlib = require('zlib');

let crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    key = process.env.CNODE_KEY || 'fD*Sf4YF2^$%';

function _encode(str) {
    let cipher = crypto.createCipher(algorithm, key)
    let crypted = cipher.update(str, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function _pack(fileString) {
    return zlib.gzipSync('CNODE_' + _encode(fileString))
}

function _packFromFile(fileSrc) {
    let fileString = fs.readFileSync(fileSrc).toString();
    return _pack(fileString);
}

function _writeToFile(fileName, content) {
    return fs.writeFileSync(fileName, content);
}

function _decode(str) {
    let decipher = crypto.createDecipher(algorithm, key)
    let dec = decipher.update(str, 'hex', 'utf8')
    return dec += decipher.final('utf8');
}

function _unpack(jse) {
    let str = zlib.gunzipSync(jse).toString().replace(/^CNODE_/, '');
    return _decode(str);

}

function _unpackFromFile(fileSrc) {
    return _unpack(fs.readFileSync(fileSrc));
}

module.exports = {
    pack: _pack,
    packFromFile: _packFromFile,
    unpack: _unpack,
    unpackFromFile: _unpackFromFile,
    writeToFile: _writeToFile
}
