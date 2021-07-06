let a = [1,2,3]
let b = Buffer.from(a)
console.log('b', b)

let a2 = new Uint8Array([1,2,3])
let b2 = Buffer.from(a2)
console.log('b2', b2)

let b3 = Buffer.alloc(10)
console.log('b3', b3)

let b4 = Buffer.allocUnsafe(10)
console.log('b4', b4)

let buf = Buffer.from('This is my pretty example')
let json = JSON.stringify(buf)
console.log('json', json)

let buf2 = Buffer.from(JSON.parse(json).data)
console.log('buf2', buf2.toString())
console.log('ascii', buf2.toString('ascii'))
console.log('xxx', buf2.toString('utf8', 11, 17))

// buffer.equals() 判断二进制是否相等

let StringDecoder = require('string_decoder').StringDecoder
let decoder = new StringDecoder('utf-8')
let euro = Buffer.from([0xE2, 0x82])
console.log('euro',decoder.write(euro))
console.log(euro.toString())

/**
 * 字节序指的是数据被存储的格式：如果最高位被存储在最低的内存地址上，我们称之为大端格式；
 * 如果最低位被存储在最低的内存地址上，我们称之为小端格式。
 */

let buf1 = Buffer.from('this is the way we build our buffer')
let len = buf1.length
let bu2 = buf1.slice(19, len)

console.log('bu2', bu2.toString())

bu2.fill('*', 0, 5)

console.log('buf1', buf1.toString());

if (buf1.equals(bu2)) console.log('they are equals')

let buf4 = Buffer.alloc(10)
buf1.copy(buf4)
console.log('buf4', buf4.toString());

// compare