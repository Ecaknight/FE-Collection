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

  registerEntities = (field) => {
    this.entities.push(field);
    return () => {
      this.entities = this.entities.filter((i) => i !== field);
      delete this.store[field.props.name];
    };
  };

  getFieldValue = (name) => this.store[name];

  getFieldsValue = () => ({ ...this.store });

  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };

    this.entities.forEach((entity) => {
      const { name } = entity.props;
      Object.keys(newStore).forEach((key) => {
        if (name === key) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    const err = [];
    this.entities.forEach((entity) => {
      const { name, rules } = entity.props;
      const rule = rules && rules[0];
      const val = this.store[name];
      if (rule && rule.required && !val) {
        err.push({ message: rule.message, value: val });
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

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerEntities: this.registerEntities,
      setCallback: this.setCallback,
      submit: this.submit,
    };
  };
}

export default function useForm(form) {
  const formRef = React.useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formstroe = new FormStore();
      formRef.current = formstroe.getForm();
    }
  }
  return [formRef.current];
}
