// 删除
const fs = require('fs')
// fs.unlink('a.mp4', (err) => {
//     if (err) throw err
//     console.log('删除成功');
// })

async function unlinkPromise(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve('删除成功')
            }
        })
    })
}
unlinkPromise('english.mp4')