import React, {useState} from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { useForm } from "react-hook-form";
import { palette } from '@material-ui/system';

function onSubmitForm(formData) {
    //where to call the API to invoke image creation
    //const images = await API.getOutputImages(payload);
  
}

export default function MyForm(props) {
      const { handleImageOutput } = props;
      const { register, handleSubmit } = useForm();
      return (
        <Form onSubmit = {handleSubmit(handleImageOutput)}>
          <legend>Template Fields</legend>
          <Input name="email" ref={register} label="Email Address" type="email" required={true} />
          <Textarea name="fullName" ref={register} label="Required User Name" floatingLabel={true} required={true} />
          <Input name="siteUrl" ref={register} label="Required Site URL" floatingLabel={true} required={true} />
          <Input name="backgroundColor" ref={register} label="Background Color" floatingLabel={true} required={true} />
          <Input name="Icon" ref={register} label="Icon" floatingLabel={true} required={true} />
          <Input name="websiteImage" ref={register} label="Website Image" floatingLabel={true} required={true} />
          <Button variant="raised">Go Create Image!</Button>
        </Form>
      );
    
  }