import compose from "./compose";

function createStore(reducer, enhancer) {
  if (enhancer) {
    //   这种模式内部要返回一个函数，类似c => r => ()
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

  function subscribe(entity) {
    listeners.push(entity);
    return () => {
      const idx = listeners.indexOf(entity);
      if (idx > -1) {
        listeners.splice(idx, 1);
      }
    };
  }

  // 初始化值
  dispatch({ type: "init/xxx-zzz" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}

function applyMiddleware(...middlewares) {
  // 函数式编程设计 -- 通过两个函数透传动作api能够生产store
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    const middlewareChain = middlewares.map((mid) => mid(midApi));
    console.log("m", middlewareChain);

    dispatch = compose(...middlewareChain)(store.dispatch);

    return { ...store, dispatch };
  };
}

// 这里的参数来源于第一次的入参 --- 
// 返回结果是聚合后的state，思考欠缺了，这里是一个将所有reducer的默认值转为所有的state的工具函数
// 果然还是要全局思考，可以先看入参和出参知道目的
function combineReducers(reducers) {
  // 返回函数是因为reducer就是一个函数，这是遵循原来返回的模式，
  // 至于state参数会将所有state的初始值聚合成大的state，需要考虑
  return function combination(state = {}, action) {
    console.log("state", state);
    const nextState = {};
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
export { createStore, applyMiddleware, combineReducers };
