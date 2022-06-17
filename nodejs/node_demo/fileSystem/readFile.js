const fs = require('fs')

// fs.readFile('text.txt', { encoding: 'utf-8' }, function(err, res){
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(res);
//     }
// })

// 同步读取
// const res = fs.readFileSync('text.txt', { encoding: 'utf-8' })
// console.log(res);

function readFilePromise(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, { encoding: 'utf-8' }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

async function readText() {
    const r1 = await readFilePromise('text.txt')
    const r2 = await readFilePromise('text.txt')
    const r3 = await readFilePromise('text.txt')
    console.log(r1 + r2 + r3);
}
readText()

module.exports = {
    readFilePromise
}