/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  //   if (p.val === q.val) return true;
  if (p.val !== q.val) return false;
  // 不用等于来判断而是用不等于来判断，原因是
  // 如果没有遇到不同的值就继续对比左右子树，
  // 直到遇到不等于的返回false，如果没有遇到就返回true
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
// @lc code=end
