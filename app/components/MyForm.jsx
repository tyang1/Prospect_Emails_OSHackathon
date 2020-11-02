import React, { useState, useCallback } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { useForm, Controller } from 'react-hook-form';
import { palette } from '@material-ui/system';
import PaletteSelect from './PaletteSelect.jsx';

function ImageUpload(props) {
  const { onFileSelect } = props;
  // const measureRef = useCallback((node) => {
  //   if (node !== null) {
  //     handleFileUpload(node.files[0]);
  //   }
  // });
  const handleFileInput = (e) => {
    // handle validations
    onFileSelect(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.stopPropagation();
  };
  return (
    <>
      {/* <form
        action='/upload'
        onSubmit={handleSubmit}
        method='post'
        enctype='multipart/form-data'
      > */}
      <input
        onChange={handleFileInput}
        type='file'
        accept='image/*'
        name='photo'
      />
      {/* <input type='submit' name='btn_upload_profile_pic' value='Upload' />
      </form> */}
    </>
  );
}

export default function MyForm(props) {
  const { handleImageOutput } = props;
  const { control, handleSubmit } = useForm();
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (file) => {
    setFileName(file);
  };

  const onSubmitForm = (formData) => {
    const {
      notificationText,
      siteUrl,
      companyName,
      backgroundColor,
    } = formData;
    console.log('formData', formData);
    const data = new FormData();
    // formDataTest.append('fieldname', 'photo');
    data.append('photo', fileName);
    data.append('notificationText', notificationText);
    data.append('siteUrl', siteUrl);
    data.append('companyName', companyName);
    data.append('backgroundColor', backgroundColor);
    handleImageOutput(data);
  };
  return (
    <>
      <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmitForm)}>
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
          as={PaletteSelect}
          name='backgroundColor'
          control={control}
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
        {/* <Controller
          as={ImageUpload}
          name='websiteImage'
          control={control}
          defaultValue=''
          label='Website Image'
          floatingLabel={true}
          // required={true}
        /> */}
        <Controller
          as={Textarea}
          name='notificationText'
          control={control}
          defaultValue=''
          label='Notification Text'
          floatingLabel={true}
          required={true}
        />
        <ImageUpload onFileSelect={handleFileUpload} />
        <Button variant='raised'>Load Image!</Button>
      </form>
    </>
  );
}
