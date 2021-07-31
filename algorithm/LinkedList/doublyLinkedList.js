import { defaultEquals } from './utils'
import { DoublyNode } from './linked-models'
import LinkedList from './linkedlist'

/**
 * 待优化
 * 可以对insert和remove这两个方法的实现做一些改进。在结果为否的情况下，可以把元素插入双向链表的尾部。
 * 性能也可以有所改进，比如，如果position大于length/2，就最好从尾部开始迭代
 */

export default class DoublyLinkedList extends LinkedList {
  constructor (equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = undefined // 对链表最后一个元素的引用
  }

  //   在任意位置插入新元素
  insert (element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)
      let current = this.head
      if (index === 0) {
        if (this.head === undefined) {
          this.head = node
          this.tail = node
        } else {
          node.next = this.head
          current.prev = node
          this.head = node
        }
      } else if (index === this.count) {
        current = this.tail // 指向最后一个元素
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        node.next = current
        previous.next = node
        current.prev = node
        node.prev = previous
      }
      this.count++
      return true
    }
    return false
  }

  removeAt (index) {

  }
}
