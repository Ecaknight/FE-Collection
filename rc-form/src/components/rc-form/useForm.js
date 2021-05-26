import React from "react";

// 看成一个Form的数据和方法仓库
// 提供设置和获取值的方法

class FormStore {
  constructor() {
    this.store = {}; // 数据仓库
    this.entities = []; // 通过发布-订阅模式 - 拿到组件更新
    this.cbs = {}; // 接收form传过来的方法
  }

  setCallback = (newcb) => {
    this.cbs = {
      ...this.cbs,
      ...newcb,
    };
  };

  registerEntities = (entity) => {
    this.entities.push(entity);

    // 返回一个取消注册
    return () => {
      this.entities = this.entities.filter((field) => field !== entity);
      delete this.store[entity.props.name];
    };
  };

  setFieldsValue = (newStore) => {
    //   更新数据
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 更新组件 -- 将上面被注册的组件找到对应的组件 执行更新方法
    this.entities.forEach((field) => {
      const { name } = field.props;
      Object.keys(newStore).forEach((key) => {
        if (key === name) {
          field.onStoreChange();
        }
      });
    });
  };

  getFieldsValue = () => ({ ...this.store });

  getFieldValue = (key) => this.store[key];

  validate = () => {
    return [];
  };

  // 提交及校验 -- 数据在这边，所以在这里提交
  submit = () => {
    const err = this.validate();
    const { onFinish, onFinishFailed } = this.cbs;
    if (err.length === 0) {
      onFinish(this.getFieldsValue());
    } else {
      onFinishFailed(err, this.getFieldsValue());
    }
  };

  //  将方法统一返回
  getForm = () => ({
    setFieldsValue: this.setFieldsValue,
    getFieldsValue: this.getFieldsValue,
    getFieldValue: this.getFieldValue,
    registerEntities: this.registerEntities,
    submit: this.submit,
    setCallback: this.setCallback,
  });
}

export default function useForm(form) {
  const formRef = React.useRef(); // 判断form表单是否已经有store数据了
  if (!formRef.current) {
    if (form) {
      // 初始化的时候 保留form的引用
      formRef.current = form;
    } else {
      const formstore = new FormStore();
      formRef.current = formstore.getForm();
    }
  }

  return [formRef.current];
}

// Form 表单
// * form 子组件的state存在哪儿？
// antd3 form state 是有缺点的，setSTate会导致整个组件更新，对于大表单性能不利
// antd4 利用hook，把数据仓库存到FormStore当中，只更新相关联的组件
// 数据仓库访问的话，注意get以及set
