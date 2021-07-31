function equals(a, b) {
  return a === b
}

class Node {
  constructor (element) {
    this.element = element
    this.next = undefined
  }
}

class LinkedList {
  constructor(equalsFn = equals) {
    this.count = 0
    this.head = undefined
    this.equalsFn = equalsFn
  }

  push(element) {
    const node = new Node(element)
    let cur
    if (!this.head) { // 为空时
      this.head = node
    } else {
      cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.count++
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        const cur = this.head
        node.next = cur
        this.head = node
      } else {
        let prev = this.getElementAt(index - 1)
        node.next = prev.next
        prev.next = node
      }
      this.count++
      return true
    }
    return false
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {// 这里有点疑问??????????
      let node = this.head
      for (let i = 0; i < index && !!node ; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  removeAt(index) {
    // 先检查越界
    if (index >= 0 && index < this.count) { // index 是0开始的
      let cur = this.head
      if (index === 0) {
        this.head = cur.next
      } else {
        let prev = this.getElementAt(index - 1)
        cur = prev.next
        prev.next = cur.next
        cur.next = undefined
      }
      this.count--
      return cur.element
    }
    return undefined
  }

  indexOf(element) {
    let cur = this.head
    for (let i = 0; i < this.count && !cur; i++) {
      if (this.equalsFn(element, cur.element)) {
        return i
      }
      cur = cur.next
    }
    return -1
  }

  getHead () {
    return this.head
  }

  isEmpty(){
    return !this.head
  }

  size(){
    return this.count
  }

  toString(){
    let cur = this.head
    const res = []
    while (cur) {
      res.push(cur.element)
      cur = cur.next
    }
    return res.join(' --> ')
  }
}

const linkList = new LinkedList()
linkList.push('hello')
linkList.push('linked')
linkList.push('list')
linkList.push('this')
linkList.push('is')
linkList.push('data')
linkList.push('sturct')
console.log(linkList.toString());
linkList.removeAt(0)
linkList.removeAt(3)
linkList.removeAt(10)
linkList.insert('new', 3)
linkList.insert('my', 4)
linkList.insert('person', 5)
console.log(linkList.toString());
linkList.removeAt(8)
console.log(linkList.toString(), linkList.size());