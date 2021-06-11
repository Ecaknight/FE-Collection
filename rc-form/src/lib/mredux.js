import compose from "./compose";

function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let curState;
  let listeners = [];

  function getState() {
    return curState;
  }

  function dispatch(action) {
    curState = reducer(curState, action);
    listeners.forEach((i) => i());
    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      listeners.splice(idx, 1);
    };
  }

  // 初始化
  dispatch({ type: "init/xxxx-sss" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}

function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    const chain = middlewares.map((mid) => mid(midApi));

    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

function combineReducer(reducers) {
  return function conbination(state = {}, action) {
    let nextState = {};
    let hasChange = false;
    for (const key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      hasChange = hasChange || nextState[key] !== state[key];
    }

    hasChange =
      hasChange || Object.keys(nextState).length !== Object.keys(state).length;

    return hasChange ? nextState : state;
  };
}

export { createStore, applyMiddleware, combineReducer };
