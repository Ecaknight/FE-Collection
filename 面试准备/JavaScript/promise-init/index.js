// 新建 test.js

// 引入我们的 MyPromise.js
const MyPromise = require("./MyPromise");
// const promise = new MyPromise((resolve, reject) => {
//   resolve("success");
//   reject("err");
// });

// promise.then(
//   (value) => {
//     console.log("resolve", value);
//   },
//   (reason) => {
//     console.log("reject", reason);
//   }
// );

// 执行结果：resolve success

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000);
});

promise.then((value) => {
  console.log(1);
  console.log("resolve", value);
});

promise.then((value) => {
  console.log(2);
  console.log("resolve", value);
});

promise.then((value) => {
  console.log(3);
  console.log("resolve", value);
});
