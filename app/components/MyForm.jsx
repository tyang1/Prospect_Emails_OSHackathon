import React, { useState, useCallback } from 'react';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { useForm, Controller } from 'react-hook-form';
import PaletteSelect from './PaletteSelect.jsx';
import ImageUpload from './ImageUploader.jsx';
const axios = require('axios').default;

export default function MyForm(props) {
  const { handleImagePreview } = props;
  const { register, control, handleSubmit, setValue } = useForm();
  const [fileName, addFileName] = useState({});

  const handleFileUpload = (file) => {
    const { name, content } = file;
    fileName[name] = content;
    addFileName(fileName);
  };

  const handleChange = (e) => {
    setValue('PaletteInput', e.target.value);
  };

  React.useEffect(() => {
    register('PaletteInput'); // custom register Antd input
  }, [register]);

  const download = (e) => {
    fetch('http://localhost:8080/images', { method: 'GET' })
      .then((response) => {
        //The arrayBuffer() method of the Body mixin takes a Response stream and reads it to completion. It returns a promise that resolves with an ArrayBuffer.
        response.blob().then(async function (blob) {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'out.jpg'); //or any other extension
          document.body.appendChild(link);
          await link.click();
          document.body.removeChild(link);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //TODO: making the onSubmitForm more reusable with delegate pattern
  const onSubmitForm = (formData) => {
    const {
      notificationText,
      siteUrl,
      companyName,
      backgroundColor,
    } = formData;
    console.log('formdata', formData);
    const data = new FormData();
    data.append('website', fileName['website']);
    data.append('icon', fileName['icon']);
    data.append('notificationText', notificationText);
    data.append('siteUrl', siteUrl);
    data.append('companyName', companyName);
    data.append('backgroundColor', backgroundColor);
    handleImagePreview(data);
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
        <PaletteSelect onChange={handleChange} />
        {/* <Controller
          as={PaletteSelect}
          name='backgroundColor'
          control={control}
          floatingLabel={true}
          required={true}
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
      </form>
      <Button onClick={(e) => download(e)}>Test Image!</Button>
    </>
  );
}
