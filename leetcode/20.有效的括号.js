/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const obj = { "(": ")", "{": "}", "[": "]" };
  for (let i = 0; i < s.length; i++) {
    const val = s[i];
    if (val in obj) {
      stack.push(val);
    } else {
      if (val !== obj[stack.pop()]) {
        return false;
      }
    }
  }
  return !stack.length;
};
// @lc code=end
