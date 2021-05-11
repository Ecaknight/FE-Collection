/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
 * @param {number} k
 * @return {ListNode}
 */

// 理解版
// var reverseKGroup = function (head, k) {
//     if (!head) return head
//     const hair = new ListNode(-1, head)
//     let pre = hair
//     do {
//         pre.next = reserve(pre.next, k)
//         for (let i = 0; i < k && pre; i++) {
//             pre = pre.next
//         }
//         if (!pre) break
//     } while (1)

//     return hair.next
// };

// function reserve(head, n) {
//     let pre = head, cur = head, cnt = n, next = null
//     while (--n && pre) {
//         pre = pre.next
//     }
//     if (!pre) return head

//     pre = null
//     while (cnt--) {
//         next = cur.next
//         cur.next = pre
//         pre = cur
//         cur = next
//     }
//     head.next = cur
//     return pre
// }

// 升级版
var reverseKGroup = function (head, k) {
    const hair = new ListNode(-1, head)
    let count = 0
    let start = hair, end = hair.next
    while (end) {
        count++
        if (count % k === 0) {
            // start, end 是反转的头尾前后结点
            start = reverse(start, end.next)
            end = start.next
        } else {
            end = end.next
        }
    }

    return hair.next
}

function reverse(start, end) {
    let pre = start, cur = start.next, next = null
    let first = cur
    while (cur !== end) {
        next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }

    first.next = cur
    start.next = pre
    return first
}
// @lc code=end

