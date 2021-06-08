// 入参
export default function thunk({ getState, dispatch }) {
  // 入参dispatch，action为使用的时候传的action
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}
