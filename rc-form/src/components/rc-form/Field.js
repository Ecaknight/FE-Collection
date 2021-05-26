import React, { Component } from "react";
import FieldContext from "./FieldContext";

// 一个受控组件, 值和方法都来源于外部

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unRegister = this.context.registerEntities(this);
  }

  componentWillUnmount() {
    if (this.unRegister) {
      this.unRegister();
    }
  }

  onStoreChange = () => this.forceUpdate();

  // 实现内部组件值的变化
  getController = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        console.log(e.target.value);
        setFieldsValue({ [name]: e.target.value });
      },
    };
  };
  render() {
    const { children } = this.props;
    return React.cloneElement(children, this.getController());
  }
}
