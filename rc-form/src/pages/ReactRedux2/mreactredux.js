import React from "react";

const Context = React.createContext();

// 更新方法
export function useUpdate(subscribe) {
  const [, fourceUpdate] = React.useReducer((x) => x + 1, 0);
  React.useLayoutEffect(() => {
    const unSubscribe = subscribe(() => {
      fourceUpdate();
    });
    return () => {
      if (unSubscribe) {
        unSubscribe();
      }
    };
  }, []);
  return fourceUpdate;
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return (WrapperComponent) => (props) => {
    const store = React.useContext(Context);
    const { getState, dispatch, subscribe } = store;

    let stateProps = {};
    let dispatchProps = { dispatch };

    stateProps = mapStateToProps(getState());

    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
    } else {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }

    //  update
    const [, fourceUpdate] = React.useReducer((x) => x + 1, 0);
    React.useLayoutEffect(() => {
      const unSubscribe = subscribe(() => {
        fourceUpdate();
      });
      return () => {
        if (unSubscribe) {
          unSubscribe();
        }
      };
    }, []);

    return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />;
  };
}

export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

function useStore() {
  return React.useContext(Context);
}

export function useSelector(selector) {
  const { getState, subscribe } = useStore();
  const selectState = selector(getState());

  useUpdate(subscribe);

  return selectState;
}

export function useDispatch() {
  const { dispatch } = useStore();
  return dispatch;
}
