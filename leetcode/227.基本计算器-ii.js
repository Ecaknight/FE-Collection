/*
 * @lc app=leetcode.cn id=227 lang=javascript
 *
 * [227] 基本计算器 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    s = s.trim()
    const stack = []
    let num = 0
    let pre = '+'
    const len = s.length
    for (let i = 0; i < len; i++) {
        // 是字符且不等于空字符串的时候，统计xx两位以上的值
        if (!isNaN(s[i]) && s[i] !== ' ') {
            num = num * 10 + Number(s[i])
        }
        if (isNaN(s[i]) || i == len - 1) {
            switch (pre) {
                case '+':
                    stack.push(num)
                    break
                case '-':
                    stack.push(-num)
                    break
                case '*':
                    stack.push(stack.pop() * num)
                    break
                default:
                    stack.push(stack.pop() / num | 0) // 取整
                    break
            }
            pre = s[i]
            num = 0
        }
    }
    return stack.reduce((a, b) => a + b)
};
// @lc code=end

