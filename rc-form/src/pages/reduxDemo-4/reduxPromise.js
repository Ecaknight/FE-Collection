export default function promise({ dispatch }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}

function isPromise(params) {
  //   return typeof params === "function" && typeof params.then === "function";
  return (
    !!params &&
    (typeof params === "object" || typeof params === "function") &&
    typeof params.then === "function"
  );
}
