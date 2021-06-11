import React from 'react'

const Context = React.createContext()

export function connect (mapStateToProps, mapDispatchToProps) {
  return WrapperComponent => props => {
    const store = React.useContext(Context)
    const { getState, dispatch, subscribe } = store
    const stateProps = mapStateToProps(getState())
    let dispatchProps = { dispatch }

    if (typeof mapDispatchToProps === 'function') {
      dispatchProps = mapDispatchToProps(dispatch)
    } else if (typeof mapDispatchToProps === 'object') {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    const [, fourceUpdate] = React.useReducer(x => x + 1, 0)
    // 订阅更新 使用同步更新避免异步更新的延迟
    React.useLayoutEffect(() => {
      const unSubscribe = subscribe(() => fourceUpdate())
      return () => {
        if (unSubscribe) {
          unSubscribe()
        }
      }
    }, [])
    
    return <WrapperComponent {...stateProps} {...dispatchProps} {...props} />
  }
}

export function Provider ({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}


function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators (creators = {}, dispatch) {
  const obj = {}
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
  return obj
}


// ------- 支持hooks api-----

export function useStore () {
  const store = React.useContext(Context)
  return store
}

export function useSelector (selector) {
  const { getState, subscribe } = useStore()
  const selectStore = selector(getState())

  // 订阅更新
  const [, fourceUpdate] = React.useReducer(x => x + 1, 0)
  React.useLayoutEffect(() => {
    const unSubscribe = subscribe(() => {
      fourceUpdate()
    })
    return () => {
      if(unSubscribe) {
        unSubscribe()
      }
    }
  })
  return selectStore
}

export function useDispatch () {
  const { dispatch } = useStore()
  return dispatch
}