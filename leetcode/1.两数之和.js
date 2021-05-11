/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = i + 1; j < nums.length; j++) {
  //     if (nums[i] + nums[j] === target) {
  //       return [i, j];
  //     }
  //   }
  // }
  // 空间换时间 借助对象存储
  const res = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num in res) {
      return [res[num], i];
    } else {
      res[target - num] = i;
    }
  }
};
// @lc code=end
