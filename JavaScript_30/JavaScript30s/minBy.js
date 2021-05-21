const minBy = (arr, fn) => {
    const cb = typeof fn === 'function' ? fn : val => val[fn]
    return Math.min(...arr.map(cb))
}

console.log(minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n))
console.log(minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'))

// fn支持函数或对象中对应的key
const maxBy = (arr, fn) => Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn]))
console.log(maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n))
console.log(maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'))

const reduceWhich = (arr, comparator = (a, b) => a - b) =>
    arr.reduce((a, b) => comparator(a, b) >= 0 ? b : a)

console.log(reduceWhich([1, 4, 3]))
console.log(reduceWhich([1, 3, 2], (a, b) => b - a)); // 3
console.log(reduceWhich(
    [
        { name: 'Tom', age: 12 },
        { name: 'Jack', age: 18 },
        { name: 'Lucy', age: 9 }
    ],
    (a, b) => a.age - b.age
))
