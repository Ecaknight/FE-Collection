/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    const hair = new ListNode(-1, head)
    let p = hair, q = head
    while (n--) {
        q = q.next
    }
    while (q) {
        p = p.next
        q = q.next
    }
    p.next = p.next.next
    return hair.next
};
// @lc code=end

