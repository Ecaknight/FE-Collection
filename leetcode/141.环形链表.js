/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
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
 * @return {boolean}
 */
var hasCycle1 = function (head) {
  //   const cache = new Set();
  //   let cur = head; // cur 是引用类型，所以不会出现重复的情况，因为对比的是地址
  //   while (cur) {
  //     if (cache.has(cur)) {
  //       return true;
  //     } else {
  //       cache.add(cur);
  //     }
  //     cur = cur.next;
  //   }
  //   return false;
  // 快慢指针解法，快走两步，慢走一步，两指针会在环中相遇
  // if (!head) return false
  // let slow = head, fast = head
  // while (fast && fast.next) {
  //     slow = slow.next
  //     fast = fast.next.next
  //     if (slow === fast) {
  //         return true
  //     }
  // }
  // return false
  // 递归解法
  // function run(node) {
  //     if (!node) return false
  //     if (node.seen) return true
  //     node.seen = true
  //     return run(node.next)
  // }
  // return run(head)
  // if (!head) return false
  // if (head.seen) return true
  // head.seen = true
  // return hasCycle(head.next)
};
var hasCycle = function (head) {
  if (!head) return false;

  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
};
// @lc code=end
