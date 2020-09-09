import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { useForm } from "react-hook-form";

function onSubmitForm(formData) {
  alert("Hi your phone number is: " + formData.phoneNumber);
}

export default class MyForm extends React.Component {
    render() {
      return (
        <Form>
          <legend>Title</legend>
          <Input label="Required Text Field" required={true} />
          <Input label="Required Email Address" type="email" floatingLabel={true} required={true} />
          <Textarea label="Required Textarea" floatingLabel={true} required={true} />
          <Input label="Email Address" type="email" defaultValue="Validation error" />
          <Button variant="raised">Submit</Button>
        </Form>
      );
    }
  }

// export default function MyForm() {
//   const { register, handleSubmit } = useForm();
//   return (
//     <form onSubmit={handleSubmit(onSubmitForm)}>
//       <label>
//         Phone Number:
//         <input type="text" name="phoneNumber" ref={register} />
//       </label>
//       <input type="submit" value="Submit" />
//     </form>
//   );
// }