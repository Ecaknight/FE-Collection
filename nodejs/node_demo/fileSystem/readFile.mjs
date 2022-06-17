import { readFile } from 'fs/promises'

readFile('text.txt', { encoding: 'utf-8' }).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err);
})