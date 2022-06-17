import { defaultEquals } from './utils'
import { Node } from './linked-models'

/**
 * 单链表类
 * push(element)：向链表尾部添加一个新元素
 * insert(element, position)：向链表的特定位置插入一个新元素
 * getElementAt(index)：返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined
 * remove(element)：从链表中移除一个元素
 * indexOf(element)：返回元素在链表中的索引。如果链表中没有该元素则返回-1
 * removeAt(position)：从链表的特定位置移除一个元素
 * isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false
 * size()：返回链表包含的元素个数，与数组的length属性类似
 * toString()：返回表示整个链表的字符串。由于列表项使用了Node类，
 * 就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值
 */

export default class LinkedList {
  constructor (equalsFn = defaultEquals) {
    this.count = 0
    this.head = undefined // 保存第一个元素的引用
    this.equalsFn = equalsFn
  }

  push (element) {
    const node = new Node(element)
    let current
    if (this.head === undefined) {
      this.head = node
    } else {
      current = this.head
      while (current.next !== undefined) {
        current = current.next
      }
      current.next = node
    }

    this.count++
  }

  removeAt (index) {
    if (index >= 0 && index < this.count) {
      // 防止越界
      let current = this.head

      if (index === 0) {
        this.head.next = current.next
      } else {
        // let prev;
        // for (let i = 0; i < index; i++) {
        //   // 这里的设计是为了获取到当前的引用：
        //   // index在第0个的时候是一定会减少一个的，index为了保持当前引用，必须<index
        //   prev = current;
        //   current = current.next;
        // }
        // prev.next = current.next;
        // --- 重构后 ---
        const prev = this.getElementAt(index - 1)
        current = prev.next
        prev.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }

  getElementAt (index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  insert (element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        const current = previous.next
        node.next = current
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }

  indexOf (element) {
    let current = this.head
    for (let i = 0; i < this.count && current !== undefined; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  remove (element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  size () {
    return this.count
  }

  isEmpty () {
    return this.size() === 0
  }

  getHead () {
    return this.head
  }

  toString () {
    if (this.head === undefined) return ''
    let str = `${this.head.element}`

    let cur = this.head.next
    for (let i = 1; i < this.size() && cur !== undefined; i++) {
      str = `${str}, ${cur.element}`
      cur = cur.next
    }
    return str
  }
}

// const linkedlist = new LinkedList()
// linkedlist.push(2)
// linkedlist.push(3)
// linkedlist.push(4)
// linkedlist.push(5)

// console.log(linkedlist.toString(), (typeof (linkedlist.toString())))
