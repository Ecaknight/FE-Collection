import compose from "./compose";

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    // 给中间件的参数
    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    // 将所有的中间件放在一个数据里面
    const middlewareChain = middlewares.map((item) => item(midApi));

    // 将中间将转为a(b(xx))并执行
    dispatch = compose(...middlewareChain)(store.dispatch);

    return { ...store, dispatch };
  };
}
