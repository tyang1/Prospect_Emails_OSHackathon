import React, { useState } from 'react';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { useForm, Controller } from 'react-hook-form';
import PaletteSelect from './PaletteSelect.jsx';
import ImageUpload from './ImageUploader.jsx';

export default function FormContent(props) {
  const { handleImagePreview, onSubmitForm } = props;
  const { register, control, handleSubmit, getValues, setValue } = useForm();
  const [isFormValid, handleFormValidation] = useState(false);
  const [fileName, addFileName] = useState({});
  const [customFormValid, setCustomFormValid] = useState({});

  const updateFormValid = (name) => {
    return (event) => {
      setValue(name, event);
      const values = getValues();
      setCustomFormValid(Object.assign({ ...customFormValid }, { ...values }));
    };
  };

  const handleFileUpload = (file) => {
    const { name, content } = file;
    fileName[name] = content;
    addFileName(fileName);
    updateFormValid(name)(true);
  };

  const handlePaletteSelect = (e) => {
    updateFormValid('PaletteInput')(e.target.value);
  };

  React.useEffect(() => {
    register('PaletteInput', { required: true, min: 1 });
    register('website', { required: true, min: 1 });
    register('icon', { required: true, min: 1 });
  }, [register]);

  const download = (e) => {
    fetch(`${process.env.API_URL}/images`, { method: 'GET' })
      .then((response) => {
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

  return (
    <>
      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit(
          onSubmitForm({
            handleImagePreview,
            handleFormValidation,
            customFormValid,
            fileName,
          })
        )}
      >
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
          control={control}
          name='PaletteInput'
          defaultValue=''
          required={true}
          render={() => <PaletteSelect onChange={handlePaletteSelect} />}
        />
        {!isFormValid && !customFormValid['PaletteInput'] ? (
          <p style={{ color: 'red' }}>Need to pick a background color</p>
        ) : null}
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
        <Controller
          required={true}
          control={control}
          name='website'
          render={() => (
            <ImageUpload
              name='website'
              id='contained-button-file1'
              fileName='website'
              onFileSelect={handleFileUpload}
            />
          )}
        />
        {!isFormValid && !customFormValid['website'] ? (
          <p style={{ color: 'red' }}>Need to pick a website image!</p>
        ) : null}

        <label>Push Notification Icon Upload</label>
        <Controller
          required={true}
          control={control}
          name='icon'
          render={() => (
            <ImageUpload
              name='icon'
              id='contained-button-file2'
              fileName='icon'
              onFileSelect={handleFileUpload}
            />
          )}
        />
        {!isFormValid && !customFormValid['icon'] ? (
          <p style={{ color: 'red' }}>Need to pick a push icon!</p>
        ) : null}

        <Button variant='raised'>See Preview Image!</Button>
      </form>
      <Button disabled={false} onClick={(e) => download(e)}>
        Download Image!
      </Button>
    </>
  );
}
