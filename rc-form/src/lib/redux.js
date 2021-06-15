function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let curState;
  let curListeners = [];

  function getState() {
    return curState;
  }

  function dispatch(action) {
    curState = reducer(curState, action);
    curListeners.forEach((i) => i());
    return action;
  }

  function subscribe(listener) {
    curListeners.push(listener);
    return () => {
      const idx = curListeners.indexOf(listener);
      if (idx > -1) {
        curListeners.splice(idx, 1);
      }
    };
  }

  dispatch({ type: "init/xxx-zz" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function applyMiddleware(...middleware) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    const chain = middleware.map((mid) => mid(midApi));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (args) => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function combinaReducer(reducers) {
  return function combination(state = {}, action) {
    let curState = {};
    let hasChange = false;
    for (const key in reducers) {
      const reducer = reducers[key];
      curState[key] = reducer(state[key], action);
      hasChange = hasChange || curState[key] !== state[key];
    }
    hasChange =
      hasChange || Object.keys(curState).length !== Object.keys(state).length;

    return hasChange ? curState : state;
  };
}

function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

export { createStore, applyMiddleware, combinaReducer, bindActionCreators };
