import React from "react";

const Ctx = React.createContext();

export function connect(
  mapStateToProps = (state) => state,
  mapDispatchToProps
) {
  return (WrapperComponent) => (props) => {
    let stateProps = {};
    let dispatchProps = {};
    const { getState, dispatch, subscribe } = useStore();

    stateProps = mapStateToProps(getState());

    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
    } else if (typeof mapDispatchToProps === "object") {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }

    // const [, fourceUpdate] = React.useReducer((x) => x + 1, 0);
    // React.useLayoutEffect(() => {
    //   const unSubscribe = subscribe(() => {
    //     fourceUpdate();
    //   });
    //   return () => {
    //     if (unSubscribe) {
    //       unSubscribe();
    //     }
    //   };
    // }, []);
    useUpdate(subscribe);

    return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />;
  };
}

export function Provider({ store, children }) {
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return Object.assign({}, obj);
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

function useStore() {
  return React.useContext(Ctx);
}

function useUpdate(subscribe) {
  const [, fourceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useLayoutEffect(() => {
    const un = subscribe(() => {
      fourceUpdate();
    });

    return () => {
      if (un) {
        un();
      }
    };
  }, []);
  return fourceUpdate;
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
