/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
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
// 链表头结点可能改变可以使用头结点
var deleteDuplicates = function (head) {
    const hair = new ListNode(-1, head)
    let p = hair, q = null
    while (p.next) {
        if (p.next.next && p.next.val === p.next.next.val) {
            // 将p的后两个结点村给q
            q = p.next.next
            // 从q开始遍历找到q和q.next不一样的值后跳出将结点删除
            while (q.next && q.val === q.next.val) {
                q = q.next
            }
            p.next = q.next
        } else {
            p = p.next
        }
    }

    return hair.next
};
// @lc code=end

