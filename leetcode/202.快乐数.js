/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
// var isHappy = function (n) {
//     let slow = n
//     let fast = getNext(n)
//     while (fast !== slow && fast !== 1) {
//         slow = getNext(slow)
//         fast = getNext(getNext(fast))
//     }
//     return fast === 1
// };

// function getNext(n) {
//     // 编译器不一样，结果不一样， 所以标准应该要初始化一下
//     let s = 0
//     while (n) {
//         s += (n % 10) * (n % 10)
//         n = Math.floor(n / 10)
//     }
//     return s
// }

// 解2
var isHappy = function (n) {
    var seen = {}
    while (n !== 1 && !seen[n]) {
        seen[n] = true
        n = getNext(n)
    }
    return n === 1
}
function getNext(n) {
    return n.toString().split('').reduce((sum, num) => {
        return sum + Math.pow(num, 2)
    }, 0)
}
// let sum = 0
// for (let index = 1; index <= 100000; index++) {
//     if (!isHappy(index)) {
//         continue
//     }
//     sum += index
// }
// console.log(sum)
// @lc code=end

