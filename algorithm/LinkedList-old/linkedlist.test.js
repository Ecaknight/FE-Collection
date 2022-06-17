import { expect, test } from '@jest/globals'
import LinkedList from './linkedlist'

test('push method', () => {
  const linked = new LinkedList()
  linked.push(2)
  linked.push(3)
  expect(linked.toString()).toEqual('2, 3')
})

test('removeAt method', () => {
  const linked = new LinkedList()
  linked.push(1)
  linked.push(2)
  linked.push(3)
  linked.push(4)
  linked.removeAt(1)
  expect(linked.toString()).toEqual('1, 3, 4')
})

test('insert method', () => {
  const linked = new LinkedList()
  linked.push(0)
  linked.push(1)
  linked.push(2)
  linked.push(3)
  linked.push(4)
  linked.insert(6, 3)
  expect(linked.toString()).toEqual('0, 1, 2, 6, 3, 4')
})

test('indexOf method', () => {
  const linked = new LinkedList()
  linked.push(0)
  linked.push(1)
  linked.push(2)
  linked.push(3)
  linked.push(4)
  expect(linked.indexOf(6)).toEqual(-1)
})

test('remove method', () => {
  const linked = new LinkedList()
  linked.push(0)
  linked.push(1)
  linked.push(2)
  linked.push(3)
  linked.push(4)
  linked.remove(3)
  expect(linked.toString()).toEqual('0, 1, 2, 4')
})
