import React, { useState, useCallback } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { useForm, Controller } from 'react-hook-form';
import { palette } from '@material-ui/system';
import PaletteSelect from './PaletteSelect.jsx';
import ImageUpload from './ImageUploader.jsx';

export default function MyForm(props) {
  const { handleImageOutput } = props;
  const { control, handleSubmit } = useForm();
  const [fileName, addFileName] = useState({});

  const handleFileUpload = (file) => {
    const { name, content } = file;
    fileName[name] = content;
    addFileName(fileName);
  };

  //TODO: making the onSubmitForm more reusable with delegate pattern
  const onSubmitForm = (formData) => {
    const {
      notificationText,
      siteUrl,
      companyName,
      backgroundColor,
    } = formData;
    const data = new FormData();
    data.append('website', fileName['website']);
    data.append('icon', fileName['icon']);
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
          as={Textarea}
          name='notificationText'
          control={control}
          defaultValue=''
          label='Notification Text'
          floatingLabel={true}
          required={true}
        />
        <label>Website Image Upload</label>
        <ImageUpload
          id='contained-button-file1'
          fileName='website'
          onFileSelect={handleFileUpload}
        />
        <label>Push Notification Icon Upload</label>
        <ImageUpload
          id='contained-button-file2'
          fileName='icon'
          onFileSelect={handleFileUpload}
        />

        <Button variant='raised'>See Preview Image!</Button>
        <Button variant='raised'>Download Image!</Button>
      </form>
    </>
  );
}
