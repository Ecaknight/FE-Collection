const fs = require('fs')

const rs = fs.createReadStream('text.txt')
const ws = fs.createWriteStream('a.txt')

rs.on('open', () => {
    console.log('文件打开');
})
rs.on('data', (chunk) => {
    console.log(chunk);
    ws.write(chunk)
})
rs.on('close', () => {
    console.log('文件关闭');
})
rs.on('end', () => {
    console.log('文件结束');
})