const createStore = (reducer, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let curState;
  let listeners = [];

  const getState = () => {
    return curState;
  };

  // 1. 更新state 2. 更新视图
  const dispatch = (action) => {
    curState = reducer(curState, action);
    listeners.forEach((i) => i());
    return action;
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  dispatch({ type: "suijzi-1123" });

  return {
    getState,
    dispatch,
    subscribe,
  };
};

export { createStore };
