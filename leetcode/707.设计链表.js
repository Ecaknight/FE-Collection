/*
 * @lc app=leetcode.cn id=707 lang=javascript
 *
 * [707] 设计链表
 */

// @lc code=start

/**
 * Initialize your data structure here.
 */
function Node(val, prev, next) {
    this.val = val || null
    this.prev = prev || null
    this.next = next || null
}
var MyLinkedList = function () {
    this.length = 0
    this.head = new Node()
    this.tail = new Node()
    this.head.next = this.tail
    this.tail.prev = this.head
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (i) {
    if (i < 0 || i >= this.length) return -1
    if (i + 1 === this.length) return this.tail.prev.val
    let cur = this.head.next
    while (i--) {
        cur = cur.next
    }
    return cur.val
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    this.length++
    const next = this.head.next
    const node = new Node(val, this.head, next)
    this.head.next = node
    next.prev = node
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    this.length++
    const prevNode = this.tail.prev
    const node = new Node(val, prevNode, this.tail)
    this.tail.prev = node
    prevNode.next = node
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (i, val) {
    if (i < 0 || this.length < i) return
    if (i === this.length) {
        this.addAtTail(val)
        return
    }
    this.length++
    let cur = this.head
    while (i--) {
        cur = cur.next
    }
    const nextNode = cur.next
    const node = new Node(val, cur, nextNode)
    cur.next = node
    nextNode.prev = node
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (i) {
    // 注意边界条件
    if (i < 0 || this.length <= i) return
    this.length--
    if (i === this.length) {
        this.tail.prev = this.tail.prev.prev
        return
    }
    let cur = this.head
    while (i--) {
        cur = cur.next
    }
    cur.next = cur.next.next
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end

