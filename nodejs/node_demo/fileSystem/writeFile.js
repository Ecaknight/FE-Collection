const fs = require('fs')

// fs.writeFile('text.txt', 'new Data~~~', { encoding: 'utf-8', flag: 'a' }, (err) => {
//     if (err) throw new Error(err)
//     console.log("写入成功!!!")
// })

// fs.writeFileSync('text.txt', 'sync data append this', { encoding: 'utf-8', flag: 'a' })

function writeFilePromise(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, { encoding: 'utf-8', flag: 'w' }, err => {
            if (err) {
                reject(err)
            } else {
                resolve('写入成功')
            }
        })
    })
}

async function writeData() {
    await writeFilePromise('text.txt', '一条数据\n')
    await writeFilePromise('text.txt', '2条数据\n')
    await writeFilePromise('text.txt', '3条数据\n')
}
writeData()

module.exports = {
    writeFilePromise
}