const { Buffer } = require('buffer')

const buf = Buffer.alloc(10)

console.log(buf);
const unbuf = Buffer.allocUnsafe(1)
console.log(unbuf);

const buf1 = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
console.log(buf1);

const buf2 = Buffer.from('a')
console.log(buf2, buf2.toString());