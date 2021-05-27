import React, { Component } from "react";
import FormContext from "./FormContext";

export default class Field extends Component {
  static contextType = FormContext;

  componentDidMount() {
    this.unRegister = this.context.registerEntities(this);
  }

  componentWillUnmount() {
    if (this.unRegister) {
      this.unRegister();
    }
  }

  onStoreChange = () => this.forceUpdate();

  getController = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const val = e.target.value;
        setFieldsValue({ [name]: val });
      },
    };
  };
  render() {
    const { children } = this.props;
    return React.cloneElement(children, this.getController());
  }
}
