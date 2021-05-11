/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    if (!head) return null
    let big = new ListNode(), small = new ListNode()
    let bigNode = big, smallNode = small
    for (let cur = head, next; cur; cur = next) {
        next = cur.next
        cur.next = null // 这句是必须的，不然会死循环， 因为后面要移动cur
        if (cur.val < x) {
            smallNode.next = cur
            smallNode = cur
        } else {
            bigNode.next = cur
            bigNode = cur
        }
    }
    smallNode.next = big.next
    return small.next
};

/**
 * 创建两个链表，一个链表来构建比它大的值，一个链表连接比它小的值
 * 然后将小的和大的连接在一起
 */
// @lc code=end

