function* HelloWorld() {
  yield "hello";
  yield "word";
  yield "end";
  return "he - end";
}

const v = HelloWorld(); // v代表一个指针，返回的是一个遍历器对象
console.log(v.next()); // 每次调用next 都会指向yield所代表的，可异步/暂停 等待指向的区域
console.log(v.next());
console.log(v.next());
console.log(v.next()); // 最后的next在于看return是否返回值 done： false表示遍历已结束
