import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'

function ReduxHook1() {
  const count = useSelector((state) => {
    console.log(state)
    return state
  })
  const dispatch = useDispatch()

  const add = React.useCallback(() => {
    dispatch({ type: 'ADD'})
  }, [])
  const minus = React.useCallback(() => {
    dispatch({ type: 'MINUS' })
  }, [])

  return (
    <div>
      <p>{count}</p>
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
    </div>
  )
}

export default connect()(ReduxHook1)