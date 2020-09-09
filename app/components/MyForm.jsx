import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { useForm } from "react-hook-form";
// import { RootRef } from '@material-ui/core';

function onSubmitForm(formData) {
    //where to call the API to invoke image creation
  console.log(formData)
}
function showRef(data) {
    console.log("showRef", data)
}
export default function MyForm() {
      const { register, handleSubmit } = useForm();
      return (
        <Form onSubmit = {handleSubmit(onSubmitForm)}>
          <legend>Template Fields</legend>
          <input name="email" ref={register} label="Email Address" type="email" required={true} />
          <Textarea name="fullName" ref={register} label="Required User Name" floatingLabel={true} required={true} />
          <input name="siteUrl" ref={register} label="Required Site URL" floatingLabel={true} required={true} />
          <input name="backgroundColor" ref={register} label="Background Color" floatingLabel={true} required={true} />
          <input name="brandLogo" ref={register} label="Brand Icon/Logo" floatingLabel={true} required={true} />
          <Button variant="raised">Go Create Image!</Button>
        </Form>
      );
    
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