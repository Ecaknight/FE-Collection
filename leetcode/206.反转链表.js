/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 练习建议这个
var reverseList = function (head) {
  if (!head) return head;
  let pre = null,
    cur = head,
    next = head;
  while (cur) {
    [cur.next, pre, cur] = [pre, cur, cur.next];
  }
  return pre;
};
// recursive
// var reverseList = function (head) {
//     if (!head || !head.next) {
//         return head
//     }
//     const newhead = reverseList(head.next)
//     head.next.next = head
//     head.next = null
//     return newhead
// };

// @lc code=end
