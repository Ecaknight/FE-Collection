/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 * @return {number[]}
 */
// var postorderTraversal = function (root) {
//     var res = []
//     return postorderTraversalNode(root, res)
// };
// // 递归
// var postorderTraversalNode = function (node, res) {
//     if (node) {
//         postorderTraversalNode(node.left, res)
//         postorderTraversalNode(node.right, res)
//         res.push(node.val)
//     }
//     return res
// }

// 迭代
// var postorderTraversal = function (root) {
//     const res = []
//     if (!root) return res
//     const stack = [root]
//     while (stack.length) {
//         root = stack.pop()
//         res.unshift(root.val)
//         if (root.left) stack.push(root.left)
//         if (root.right) stack.push(root.right)
//     }
//     return res
// }

var postorderTraversal1 = function (root, arr = []) {
  if (root) {
    postorderTraversal(root.left, arr);
    postorderTraversal(root.right, arr);
    arr.push(root.val);
  }
  return arr;
};

var postorderTraversal2 = function (root) {
  if (!root) return [];
  const ret = [];
  const stack = [root];
  while (stack.length) {
    root = stack.pop();
    ret.unshift(root.val);
    if (root.left) stack.push(root.left);
    if (root.right) stack.push(root.right);
  }
  return ret;
};

var postorderTraversal = function (root) {
  if (!root) return [];
  const stack = [root];
  const ret = [];
  while (stack.length) {
    root = stack.pop();
    ret.unshift(root.val);
    if (root.left) stack.push(root.left);
    if (root.right) stack.push(root.right);
  }
  return ret;
};
// @lc code=end
