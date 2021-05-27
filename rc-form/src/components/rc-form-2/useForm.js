import React from 'react'

class FormStore {
  constructor() {
    this.store = {}
    this.entities = []
  }

  registerEntyties = (field) => {
    this.entities.push(field)
    return () => {
      this.entities = this.entities.filter(item => item !== field)
      delete this.store[field.props.name]
    }
  }

  getFieldsValue = () => ({ ...this.store })

  getFieldValue = (name) => this.store[name]

  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore }

    // 更新组件
    this.entities.forEach(item => {
      const { name } = item.props
      Object.keys(this.store).forEach(key => {
        if (key === name) {
          item.onStoreChange()
        }
      })
    })
  }

  getForm = () => ({
    getFieldsValue: this.getFieldsValue,
    getFieldValue: this.getFieldValue,
    setFieldsValue: this.setFieldsValue,
    registerEntyties: this.registerEntyties,
  })
}

export default function useForm() {
  const formRef = React.useRef()

  if (!formRef.current) {
    const formstore = new FormStore()
    formRef.current = formstore.getForm()
  }

  return [formRef.current]
}
