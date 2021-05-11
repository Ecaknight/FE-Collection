/*
 * @lc app=leetcode.cn id=138 lang=javascript
 *
 * [138] 复制带随机指针的链表
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
    if (!head) return null
    let p = head, clone = null
    // 在每个节点后面加上复制结点
    while (p) {
        clone = new ListNode(p.val)
        clone.next = p.next
        clone.random = p.random
        p.next = clone
        p = clone.next
    }
    // 拿到复制结点
    p = head.next
    while (p) {
        (p.random && (p.random = p.random.next));
        (p = p.next) && (p = p.next)
    }

    p = clone = head.next
    while (clone.next) {
        head.next = head.next.next
        clone.next = clone.next.next
        head = head.next
        clone = clone.next
    }
    head.next = null
    return p
};
// @lc code=end

