/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 推到过程
// https://leetcode.com/problems/linked-list-cycle-ii/discuss/495311/JavaScript-Two-Pointers-w-Extended-Notes
var detectCycle1 = function (head) {
  if (!head) return null;
  let slow = head,
    fast = head,
    temp = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    // 入环点的位置是快慢指针相遇的点和head点遍历后相遇的点
    if (slow === fast) {
      while (temp !== slow) {
        temp = temp.next;
        slow = slow.next;
      }
      return slow;
    }
  }
  return null;
};
var detectCycle2 = function (head) {
  const cache = new Set();
  while (head) {
    if (cache.has(head)) {
      return head;
    } else {
      cache.add(head);
    }
    head = head.next;
  }
  return null;
};

var detectCycle = function (head) {
  let fast = head,
    slow = head,
    start = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      while (start !== slow) {
        start = start.next;
        slow = slow.next;
      }
      return start;
    }
  }
  return null;
};
// @lc code=end
