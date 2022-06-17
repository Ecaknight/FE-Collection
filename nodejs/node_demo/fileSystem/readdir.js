// 读取目录
const fs = require('fs')

fs.readdir('../rpc_demo', (err, data) => {
    if (err) {
        throw err
    }
    console.log(data);
})