const PENDING = "pending";
const RESOLVE = "resolve";
const REJECT = "reject";

function CutePromise(executor) {
  this.value = null; //记录异步任务成功的执行结果
  this.reason = null; //记录异步任务失败的原因
  this.status = PENDING; // 记录当前状态，初始化是 pending

  var self = this;

  // 任务队列
  this.onResolveQueue = [];
  this.onRejectQueue = [];

  function resolve(val) {
    if (self.status !== PENDING) return;

    self.value = val;
    self.status = RESOLVE;

    self.onResolveQueue.forEach((onResolve) => onResolve(self.value));
  }

  function reject(reason) {
    if (self.status !== PENDING) return;

    self.reason = reason;
    self.status = REJECT;

    self.onRejectQueue.forEach((onReject) => onReject(self.reason));
  }

  executor(resolve, reject);
}

CutePromise.prototype.then = function (onResolved, onRejected) {
  // onResolved 和 onRejected必须是函数；如果不是，我们此处用一个透传来兜底
  if (typeof onResolved !== "function") {
    onResolved = function (x) {
      return x;
    };
  }
  if (typeof onRejected !== "function") {
    onRejected = function (e) {
      throw e;
    };
  }

  let x; // 存放返回值

  function resolveByStatus(resolve, reject) {
    // 包装成异步任务，确保决议程序在 then 后执行
    setTimeout(function () {
      try {
        x = onResolved(self.value);
        resolutionProcedure(promise2, x, resolve, reject);
      } catch (e) {
        // 如果onResolved或者onRejected抛出异常error，则promise2必须被rejected，用error做reason
        reject(e);
      }
    });
  }

  function rejectByStatus(resolve, reject) {
    setTimeout(function () {
      try {
        x = onRejected(self.reason);
        resolutionProcedure(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  var self = this;

  // 需要 return 一个符合规范的 Promise 对象
  var promise2 = new CutePromise(function (resolve, reject) {
    // 状态修改后不可以在被改变
    if (self.status === RESOLVE) {
      resolveByStatus(resolve, reject);
    } else if (self.status === REJECT) {
      rejectByStatus(resolve, reject);
    } else if (self.status === PENDING) {
      self.onResolveQueue.push(function () {
        resolveByStatus(resolve, reject);
      });
      self.onRejectQueue.push(function () {
        rejectByStatus(resolve, reject);
      });
    }
  });

  return promise2; // 链式调用
};

//   决议程序
function resolutionProcedure(promise2, x, resolve, reject) {
  // 是为了确保 resolve、reject 不要被重复执行
  let hasCall;
  if (x === promise2) {
    // 决议程序规范：如果 resolve 结果和 promise2相同则reject，这是为了避免死循环
    return reject(new TypeError("为避免死循环，此处抛错"));
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 如果x是一个对象或者函数，则需要额外处理下
    try {
      let then = x.then;
      if (typeof then === "function") {
        // 如果 then 是一个函数，那么用x为this来调用它，第一个参数为 resolvePromise，第二个参数为rejectPromise
        then.call(
          x,
          (y) => {
            if (hasCall) return;
            hasCall = true;
            resolutionProcedure(promise2, y, resolve, reject);
          },
          (err) => {
            if (hasCall) return;
            hasCall = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (hasCall) return;
      hasCall = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

CutePromise.deferred = function () {
  var result = {};
  result.promise = new CutePromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = CutePromise;
