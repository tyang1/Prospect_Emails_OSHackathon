import React, { useState } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { useForm, Controller } from 'react-hook-form';
import { palette } from '@material-ui/system';

export default function MyForm(props) {
  const { handleImageOutput } = props;
  const { control, handleSubmit } = useForm();
  const onSubmitForm = (formData) => {
    handleImageOutput(formData);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <legend>Template Fields</legend>
      <Controller
        as={Input}
        name='companyName'
        control={control}
        defaultValue=''
        label='Company'
        required={true}
      />
      <Controller
        as={Input}
        name='siteUrl'
        control={control}
        defaultValue=''
        label='Required Site URL'
        floatingLabel={true}
        required={true}
      />
      <Controller
        as={Input}
        name='backgroundColor'
        control={control}
        defaultValue=''
        label='Background Color'
        floatingLabel={true}
        required={true}
      />
      <Controller
        as={Input}
        name='Icon'
        control={control}
        defaultValue=''
        label='Icon'
        floatingLabel={true}
        required={true}
      />
      <Controller
        as={Input}
        name='websiteImage'
        control={control}
        defaultValue=''
        label='Website Image'
        floatingLabel={true}
        required={true}
      />
      <Controller
        as={Textarea}
        name='notificationText'
        control={control}
        defaultValue=''
        label='Notification Text'
        floatingLabel={true}
        required={true}
      />
      <Button variant='raised'>Download Image!</Button>
    </Form>
  );
}
