const events = require('events')
const fs = require('fs')

// const emitters = new events()
// emitters.on('mymes', (data) => {
//     console.log('mes: ', data);
// })

// fs.readFile('a.txt', { encoding: 'utf-8' }, (err, data) => {
//     if (err) throw err
//     emitters.emit('mymes', data)
// })

class MyEvent {
    constructor() {
        this.events = {}
    }
    on(name, fn) {
        this.events[name] ? this.events[name].push(fn) : this.events[name] = [fn]
    }
    emit(name, data) {
        (this.events[name] || []).forEach(cb => {
            cb(data)
        });
    }
}

const es = new MyEvent()

es.on('mes', (data) => {
    console.log(data);
})

fs.readFile('a.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err
    es.emit('mes', data)
})
