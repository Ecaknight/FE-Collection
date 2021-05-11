/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 如果左子树没有p或q，那就右边
  // 如果右子树没有p或q，那就左边
  // 两边都有就是root
  if (root === null || root == p || root == q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  //   if (!left) {
  //     return right;
  //   }
  //   if (!right) {
  //     return left;
  //   }
  //   return root;
  return !left ? right : !right ? left : root;
};
// @lc code=end
