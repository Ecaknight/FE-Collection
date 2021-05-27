import React from "react";

class FormStore {
  constructor() {
    this.store = {};
    this.entities = [];
    this.cbs = {};
  }

  setCallback = (newCb) => {
    this.cbs = {
      ...this.cbs,
      ...newCb,
    };
  };

  registerEntyties = (field) => {
    this.entities.push(field);
    return () => {
      this.entities = this.entities.filter((item) => item !== field);
      delete this.store[field.props.name];
    };
  };

  getFieldsValue = () => ({ ...this.store });

  getFieldValue = (name) => this.store[name];

  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };

    // 更新组件
    this.entities.forEach((item) => {
      const { name } = item.props;
      Object.keys(newStore).forEach((key) => {
        if (key === name) {
          item.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    const err = [];
    this.entities.forEach((entity) => {
      const { name, rules } = entity.props;
      const value = this.getFieldValue(name);
      const rule = rules && rules[0];
      if (rule && rule.required && !value) {
        err.push({
          [name]: rule.message,
          value,
        });
      }
    });
    return err;
  };

  submit = () => {
    const { onFinish, onFinishFailed } = this.cbs;
    const err = this.validate();
    if (err.length === 0) {
      onFinish(this.getFieldsValue());
    } else {
      onFinishFailed(err);
    }
  };

  getForm = () => ({
    getFieldsValue: this.getFieldsValue,
    getFieldValue: this.getFieldValue,
    setFieldsValue: this.setFieldsValue,
    registerEntyties: this.registerEntyties,
    setCallback: this.setCallback,
    submit: this.submit,
  });
}

export default function useForm(form) {
  const formRef = React.useRef();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formstore = new FormStore();
      formRef.current = formstore.getForm();
    }
  }

  return [formRef.current];
}
