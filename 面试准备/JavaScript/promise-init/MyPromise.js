const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;
  // 存储成功回调函数
  onFulfilledCb = [];
  // 存储失败回调函数
  onRejectedCb = [];

  // 绑定this
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // / 判断成功回调是否存在，如果存在就调用
      while (this.onFulfilledCb.length) {
        this.onFulfilledCb.shift()(value);
      }
    }
  };

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCb.length) {
        this.onRejectedCb.shift()(reason);
      }
    }
  };

  // then的实现
  then(onFulfilled, onRejected) {
    const realOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 支持链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        // 创建微任务等待promise2初始化
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        this.onFulfilledCb.push(fulfilledMicrotask);
        this.onRejectedCb.push(rejectedMicrotask);
      }
    });

    return promise2;
  }

  static resolve(param) {
    if (param instanceof MyPromise) {
      return param;
    }

    return new MyPromise((resolve) => {
      resolve(param);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  catch(onRejected) {
    this.then(undefined, onRejected);
  }

  finally(fn) {
    return this.then(
      (value) => {
        return MyPromise.resolve(fn()).then(() => value);
      },
      (error) => {
        return MyPromise.resolve(fn()).then(() => {
          throw error;
        });
      }
    );
  }

  static all(promiseList) {
    return new Promise((resolve, reject) => {
      const result = [];
      const length = promiseList.length;

      let count = 0;

      if (length === 0) {
        return resolve(result);
      }

      promiseList.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            count++;
            result[index] = value;
            if (count === length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static allSettled(promiseList) {
    return new MyPromise((resolve) => {
      const length = promiseList.length;
      const result = [];
      let count = 0;

      if (length === 0) {
        return resolve(result);
      } else {
        for (let i = 0; i < length; i++) {
          const currentPromise = MyPromise.resolve(promiseList[i]);
          currentPromise.then(
            (value) => {
              count++;
              result[i] = {
                status: FULFILLED,
                value,
              };
              if (count === length) {
                return resolve(result);
              }
            },
            (reason) => {
              count++;
              result[i] = {
                status: REJECTED,
                reason,
              };
              if (count === length) {
                return resolve(result);
              }
            }
          );
        }
      }
    });
  }

  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      const length = promiseList.length;
      if (length === 0) {
        return resolve();
      } else {
        for (let i = 0; i < length; i++) {
          MyPromise.resolve(promiseList[i]).then(
            (value) => resolve(value),
            (reason) => reject(reason)
          );
        }
      }
    });
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 循环引用报错
  if (promise === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  if (typeof x === "object" || typeof x === "function") {
    if (x === null) {
      return resolve(x);
    }

    let then;

    try {
      then = x.then;
    } catch (error) {
      return reject(error);
    }

    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        if (called) return;
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise;
