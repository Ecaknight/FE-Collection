// 简单链表
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkNodeList {
  constructor() {
    this.head = null
    this.length = 0
  }

  // 追加
  append(val) {
    const node = new Node(val)
    // 链表为空和不为空
    if (!this.head) {
      this.head = node
    } else {
      let cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.length += 1
  }

  removeAt (index) {
    let cur = this.head,
      prev = null,
      i = 0
    // 只考虑index是否越界,但是不考虑链表为空
    if (index === 0) {
      this.head = cur.next
    } else {
      while (i++ < index) {
        prev = cur
        cur = cur.next
      }
      prev.next = cur.next
      cur.next = null
    }
    this.length -= 1
    return cur.val
  }

  print() {
    let cur = this.head
    const res = []
    while (cur) {
      res.push(cur.val)
      cur = cur.next
    }
    return res.join(' --> ')
  }
}

const linkList = new LinkNodeList()
linkList.append('你好')
linkList.append('我是')
linkList.append('单链表')
console.log(linkList.print())
const ret = linkList.removeAt(1)
console.log(linkList.print(), ret)
