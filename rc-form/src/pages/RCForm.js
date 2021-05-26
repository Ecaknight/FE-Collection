import Form, { Field } from "rc-field-form";
import Input from "../components/Input";

function RCForm(props) {
  return (
    <Form
      onFinish={(values) => {
        console.log("Finish:", values);
      }}
    >
      <Field name="username">
        <Input placeholder="Username" />
      </Field>
      <Field name="password">
        <Input placeholder="Password" />
      </Field>

      <button>Submit</button>
    </Form>
  );
}

export default RCForm;
