import React from "react";
import Context from "./FormContext";
import useForm from "./useForm";

export default function Form(
  { form, onFinish, onFinishFailed, children },
  ref
) {
  const [formInstance] = useForm(form);

  formInstance.setCallback({ onFinish, onFinishFailed });

  React.useImperativeHandle(ref, () => formInstance);

  return (
    <form
      form={form}
      onClick={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <Context.Provider value={formInstance}>{children}</Context.Provider>
    </form>
  );
}
