/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth1 = function (root) {
  if (!root) return 0;
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};

var maxDepth2 = function (root) {
  // 终止条件
  if (!root) return 0;
  // 使用递推
  // 当前的最大深度 = 左节点 + 右节点 之间的最大深度 + 1
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// 迭代
var maxDepth = function (root) {};
// @lc code=end
