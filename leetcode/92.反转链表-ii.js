/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
    if (!head) return head
    const hair = new ListNode(-1, head) // 哨兵结点方便操作
    let pre = hair, cnt = right - left + 1
    while (--left) { // 拿到反转结点的前驱结点
        pre = pre.next
    }
    // 链接反转后的链表结点
    pre.next = reverseList(pre.next, cnt)
    return hair.next
};

function reverseList(head, n) {
    let pre = null, cur = head
    while (n--) {
        [cur.next, pre, cur] = [pre, cur, cur.next]
    }
    // 将反转后的最后一个结点，链接到反转后的后驱结点
    head.next = cur
    return pre
}

// @lc code=end

