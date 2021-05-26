// 使用函数组件
import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

// 1.先用form包裹
export default function Form(
  { children, onFinish, onFinishFailed, form },
  ref
) {
  const [formInstance] = useForm(form);
  formInstance.setCallback({ onFinish, onFinishFailed });
  React.useImperativeHandle(ref, () => formInstance); // 兼容class情况下的ref
  return (
    <form
      onClick={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
