/**
 * FileSaver.js源码拆解
 *
 */

//  --------判断全局环境-------------
var _global =
  typeof window === "object" && window.window === window
    ? window
    : typeof self === "object" && self.self === self
    ? self
    : typeof global === "object" && global.global === global
    ? global
    : this;

// --------判断全局环境-------------

// 保存方法

// 支持commonJS
if (typeof module !== "undefined") {
  module.exports = saveAs;
}

var test = "111";
