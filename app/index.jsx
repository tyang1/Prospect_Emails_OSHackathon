import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MyForm from './components/MyForm.jsx';
import FormContent from './components/FormContent.jsx';
import MainPanel from './components/MainPanel.jsx';
import { getImages, downloadImage } from './actions/API';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export default function App() {
  const [images, setImage] = useState(null);
  const handleImageOutput = async (data, submitMode) => {
    // data payload could include:
    //  2 COLOR=green
    //  3 HEADER_TEXT="Notifications for Bandolier"
    //  4 PUSH_NOTIF_HEADER="We re saving this for you!"
    //  5 PUSH_NOTIF_MSG="You are one step away.  Don t forget to checkout!"
    //  6 PUSH_NOTIF_HOST="bandolierstyle.com"
    //  7 URL_TEXT="bandolierstyle.com"
    //  8 DASHBOARD_IMAGE=dash.jpg
    //  9 SCREENSHOT_IMAGE=shot.jpg
    // 10 PUSH_NOTIF_IMAGE=logo.jpg
    if (submitMode == 'preview') {
      await getImages(data, setImage);
    } else {
      await downloadImage(data);
    }
    return true;
  };

  const onSubmitForm = ({
    handleImagePreview,
    handleFormValidation,
    customFormValid,
    fileName,
    submitMode,
  }) => (formData) => {
    const {
      notificationText,
      siteUrl,
      companyName,
      backgroundColor,
      PaletteInput,
    } = formData;
    const data = new FormData();
    //if there's an unfilled values then do not submit form
    if (
      !customFormValid['website'] ||
      !customFormValid['icon'] ||
      !customFormValid['PaletteInput']
    ) {
      return false;
    }
    data.append('website', fileName['website']);
    data.append('icon', fileName['icon']);
    data.append('notificationText', notificationText);
    data.append('siteUrl', siteUrl);
    data.append('companyName', companyName);
    data.append('backgroundColor', PaletteInput);
    handleImagePreview(data, submitMode).then((imagePreviewed) => {
      if (imagePreviewed) {
        handleFormValidation(true);
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MainPanel images={images} />
      <div style={{ paddingRight: '50px' }}>
        <MyForm icon={<ChevronLeftIcon style={{ fontSize: 100 }} />}>
          <FormContent
            onSubmitForm={onSubmitForm}
            handleImagePreview={handleImageOutput}
          />
        </MyForm>
      </div>
    </div>
  );
}

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('app'));
}

renderApp();

//NOTE: module.hot.accept(param1: module to be hot reloaded, param2: what needs to happen)

// if (module.hot) {
//   module.hot.accept('./components/MyForm.jsx', function () {
//     console.log('Accepting the updated printMe module!');
//     renderApp();
//   });
// }
