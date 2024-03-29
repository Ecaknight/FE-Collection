export default function compose(...funcs) {
  if (funcs.length === 0) {
    return (args) => args;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }
  //   注意编程时的细节
  return funcs.reduce((a, b) => (...args) => a(b(...args))); // <--------
}
