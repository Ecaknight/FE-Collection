/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
var isValidBST1 = function (root) {
  // 递归解法
  return recursion(root, -Infinity, Infinity);
};
function recursion(root, lower, upper) {
  if (root === null) return true;
  if (root.val <= lower || root.val >= upper) return false;
  return (
    recursion(root.left, lower, root.val) &&
    recursion(root.right, root.val, upper)
  );
}

// 中序遍历
var isValidBST2 = function (root) {
  const stack = [];
  let inorder = -Infinity;
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (root.val <= inorder) {
      return false;
    }
    inorder = root.val;
    root = root.right;
  }
  return true;
};

var isValidBST = function (root) {
  const stack = [];
  const inorder = -Infinity;
  while (stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (root.val <= inorder) {
      return false;
    }
    inorder = root.val;
    root = root.right;
  }
  return true;
};

// @lc code=end
