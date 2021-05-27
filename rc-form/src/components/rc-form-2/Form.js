import React from 'react'
import Context from './FormContext'
import useForm from './useForm'

export default function Form({ form, onFinish, onFinishFailed, children}) {
  const [formInstance] = useForm()

  return (
    <form
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <Context.Provider value={formInstance}>
      {children}
      </Context.Provider>
    </form>
  )
}
