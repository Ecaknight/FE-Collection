import React from 'react'
// import { connect, useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from './mreactredux'

function HooksPage(props) {
  console.log(props)
  const num = useSelector(({ num }) => num)
  const dispatch = useDispatch()

  const add = React.useCallback(() => dispatch({ type: 'ADD' }), [dispatch])
  const minus = React.useCallback(() => dispatch({ type: 'MINUS' }), [dispatch])

  return (
    <div>
      <p>HOOK Page</p>
      <p>{num}</p>
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
    </div>
  )
}

export default HooksPage