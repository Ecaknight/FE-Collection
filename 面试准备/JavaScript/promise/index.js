const PENDING = "pending";
const RESOLVE = "resolve";
const REJECT = "reject";

function CutePromise(executor) {
  this.value = null;
  this.reason = null;
  this.status = PENDING;
  this.resolveQueue = [];
  this.rejectQueue = [];

  var self = this;

  function resolve(v) {
    if (self.status !== PENDING) return;

    self.value = v;
    self.status = RESOLVE;

    self.resolveQueue.forEach((onResolve) => onResolve(v));
  }

  function reject(e) {
    if (self.status !== PENDING) return;

    self.reason = e;
    self.status = REJECT;
    self.rejectQueue.forEach((onReject) => onReject(e));
  }
  executor(resolve, reject);
}

CutePromise.prototype.then = function (onResolved, onRejected) {
  var self = this;
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

  let x;

  function resolveMicrotask(resolve, reject) {
    queueMicrotask(() => {
      try {
        x = onResolved(self.value);
        resolutionProcedure(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  function rejectMicrotask(resolve, reject) {
    queueMicrotask(() => {
      try {
        x = onRejected(self.reason);
        resolutionProcedure(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  const promise2 = new CutePromise(function (resolve, reject) {
    if (self.status === RESOLVE) {
      resolveMicrotask(resolve, reject);
    } else if (self.status === REJECT) {
      rejectMicrotask(resolve, reject);
    } else if (self.status === PENDING) {
      self.resolveQueue.push(function () {
        resolveMicrotask(resolve, reject);
      });

      self.rejectQueue.push(function () {
        rejectMicrotask(resolve, reject);
      });
    }
  });

  return promise2;
};

function resolutionProcedure(promise, x, resolve, reject) {
  let hasCall;
  if (promise === x) {
    return reject(new TypeError("循环引用报错"));
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (hasCall) return;
            hasCall = true;
            resolutionProcedure(promise, y, resolve, reject);
          },
          (e) => {
            if (hasCall) return;
            hasCall = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      if (hasCall) return;
      hasCall = true;
      reject(err);
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