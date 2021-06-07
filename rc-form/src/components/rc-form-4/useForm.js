import React from "react";

class FormStore {
  constructor() {
    this.store = {};
    this.entities = [];
    this.cbs = {};
  }

  registerEntities = (entity) => {
    this.entities.push(entity);
    return () => {
      this.entities = this.entities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  setCallback = (newCb) => {
    this.cbs = { ...this.cbs, ...newCb };
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  getFieldsValue = () => ({ ...this.store });

  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    };

    this.entities.forEach((entity) => {
      const { name } = entity.props;
      Object.keys(newStore).forEach((key) => {
        if (key === name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    const err = [];
    this.entities.forEach((item) => {
      const { name, rules } = item.props;
      const rule = rules && rules[0];
      const val = this.store[name];
      if (rule && rule.required && !val) {
        err.push({ message: rule.message });
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
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    registerEntities: this.registerEntities,
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
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
