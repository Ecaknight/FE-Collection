/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  // 递归
  if (n === 0) return 1;

  let pow = Math.abs(n);
  const ret = !(pow & 1)
    ? myPow(x * x, pow / 2)
    : myPow(x * x, (pow - 1) / 2) * x;

  return n < 0 ? 1 / ret : ret;
};
// 迭代待完成

// @lc code=end
