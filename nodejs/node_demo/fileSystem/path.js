const path = require('path')

const link = 'https://nodejs.org/dist/latest-v16.x/docs/api/path.html'

const ext = path.extname(link)
console.log('ext ', ext);

const base = path.basename(link, '.html')
console.log('base ', base);

const dir = path.dirname(link)
console.log('dir ', dir);

const forObj = path.format({ dir: __dirname, base: 'a.txt' })
console.log('obj ', forObj);

const joinPath = path.join('user', 'text', 'a.txt')
console.log('join ', joinPath);

const resolvePath = path.resolve('user', 'home', 'a.txt')
console.log('resolve ', resolvePath);

const obj = path.parse(link)
console.log('parse ', obj);

const normal = path.normalize('\\\\user\\home\d.txt')
console.log('n ', normal);