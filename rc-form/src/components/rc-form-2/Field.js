import React from 'react'
import FormContext from './FormContext';

export default function Field({ children, name }) {
  const ctx = React.useContext(FormContext)
  
  const [, forceupdate] = React.useState({})

  React.useEffect(() => {
    const unRegister = ctx.registerEntyties(Field)

    return () => {
      unRegister()
    }
  }, [])

  const onStoreChange = React.useCallback(() => {
    forceupdate({})
  }, [])

  const getController = React.useCallback(() => {
    const { getFieldValue, setFieldValue } = ctx
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        console.log(e.target.value)
        const val = e.target.value
        setFieldValue({ [name]: val })
      }
    }
  }, [])
  return (
    React.cloneElement(children, getController)
  )
}
