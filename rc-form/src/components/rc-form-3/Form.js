import React from "react";
import FormContext from "./FormContext";
import useForm from "./useForm";

export default function Form(
  { children, form, onFinish, onFinishFailed },
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
      <FormContext.Provider value={formInstance}>
        {children}
      </FormContext.Provider>
    </form>
  );
}
