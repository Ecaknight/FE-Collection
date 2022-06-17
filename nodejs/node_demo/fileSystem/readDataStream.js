const fs = require('fs')

const rs = fs.createReadStream('english.mp4')
const ws = fs.createWriteStream('a.mp4')

rs.pipe(ws)