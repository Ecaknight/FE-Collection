import React from "react";
import { bindActionCreators } from "../pages/ReactRedux3/mreactredux";

const Context = React.createContext();

export function connect(mapStateToProps, mapDispatchToProps) {
  return (WrapperComponent) => (props) => {
    const store = useStore();
    let stateProps = {};
    let dispatchProps = { dispatch: store.dispatch };

    stateProps = mapStateToProps(store.getState());

    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(store.dispatch);
    } else if (typeof mapDispatchToProps === "object") {
      dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
    }

    useUpdate(store.subscribe);

    return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />;
  };
}

function useUpdate(subscribe) {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  React.useLayoutEffect(() => {
    const un = subscribe(() => forceUpdate());
    return () => {
      if (un) {
        un();
      }
    };
  }, []);

  return forceUpdate;
}

function useStore() {
  return React.useContext(Context);
}

export function useSelector(selector) {
  const store = useStore();
  const selectState = selector(store.getState());
  useUpdate(store.subscribe);
  return selectState;
}

export function useDispatch() {
  return useStore.dispatch;
}

export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
