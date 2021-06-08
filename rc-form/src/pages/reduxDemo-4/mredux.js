import compose from "./compose";

// 创建一个能够集合store和方法的api
function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let curState;
  const listeners = [];

  function getState() {
    return curState;
  }

  function dispatch(action) {
    curState = reducer(curState, action);
    listeners.forEach((i) => i());
    return action;
  }

  function subscribe(entity) {
    listeners.push(entity);
    return () => {
      const idx = listeners.indexOf(entity);
      if (idx > -1) {
        listeners.splice(idx, 1);
      }
    };
  }

  dispatch({ type: "init/xxx-sss" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// 中间件增强模式api
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    const middlewaresChain = middlewares.map((mid) => mid(midApi));

    dispatch = compose(...middlewaresChain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

function combineReducer(reducers) {
  return function combination(state = {}, action) {
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
