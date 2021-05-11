/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  //  递推
  const obj = {};
  return toFib(n, obj);
};
function toFib(n, obj = {}) {
  if (n === 0 || n === 1) {
    return n;
  }
  if (n in obj) {
    return obj[n];
  } else {
    const ret = toFib(n - 1, obj) + toFib(n - 2, obj);
    return (obj[n] = ret);
  }
}

// @lc code=end
