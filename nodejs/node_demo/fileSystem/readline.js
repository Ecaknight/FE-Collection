const readline = require('readline')
const { writeFilePromise } = require('./writeFile')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// rl.question('你会node吗？', (answer) => {
//     console.log(answer);
//     rl.close()
// })

function sendQuestion(ques) {
    return new Promise((resolve) => {
        rl.question(ques, (answer) => {
            resolve(answer)
        })
    })
}

async function getPackage() {
    const name = await sendQuestion('name: ')
    const version = await sendQuestion('version: ')
    const desc = await sendQuestion('description: ')
    const author = await sendQuestion('author: ')

    const json = `
    {
        "name": "${name}",
        "version": "${version}",
        "description": "${desc}",
        "main": "app.js",
        "author": "${author}",
        "license": "ISC"
      }
      
    `

    await writeFilePromise('package.json', json)
    rl.close()
}
getPackage()
