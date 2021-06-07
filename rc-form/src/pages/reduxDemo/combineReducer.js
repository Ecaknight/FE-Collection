export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextstate = {}
    let hasChange = false
    for (const key in reducers) {
      const reducer = reducers[key]
      nextstate[key] = reducer(state[key], action)
      hasChange = hasChange || nextstate[key] !== state[key]
    } 
    // 当reducer动态改变时处理
    hasChange = hasChange || Object.keys(nextstate).length !== Object.keys(state).length

    return hasChange ? nextstate : state
  }
}
