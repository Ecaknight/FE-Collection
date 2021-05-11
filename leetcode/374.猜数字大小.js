/*
 * @lc app=leetcode.cn id=374 lang=javascript
 *
 * [374] 猜数字大小
 */

// @lc code=start
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let low = 1;
  let high = n;
  while (low <= high) {
    const mid = low + ((high - low) >> 1);
    const ret = guess(mid);
    if (ret === 0) {
      return mid;
    } else if (ret < 0) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};
// @lc code=end
