import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import MyForm from './components/MyForm.jsx'
import MainPanel from './components/MainPanel.jsx'
import { getImages } from './actions/API.js'

export default function App() {
  const [images, setImage] = useState(null)
  const handleImageOutput = async (data) => {
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
    await getImages(data, setImage)
    return true
  }

  const onSubmitForm = ({
    handleImagePreview,
    handleFormValidation,
    customFormValid,
    fileName,
  }) => (formData) => {
    //if there's an unfilled values then do not submit form
    if (
      !customFormValid['website'] ||
      !customFormValid['icon'] ||
      !customFormValid['PaletteInput']
    ) {
      return
    }
    const {
      notificationText,
      siteUrl,
      companyName,
      backgroundColor,
      PaletteInput,
    } = formData
    const data = new FormData()
    data.append('website', fileName['website'])
    data.append('icon', fileName['icon'])
    data.append('notificationText', notificationText)
    data.append('siteUrl', siteUrl)
    data.append('companyName', companyName)
    data.append('backgroundColor', PaletteInput)
    handleImagePreview(data).then((imagePreviewed) => {
      if (imagePreviewed) {
        handleFormValidation(true)
      }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MainPanel images={images} />
      <div style={{ paddingRight: '50px' }}>
        <MyForm
          onSubmitForm={onSubmitForm}
          handleImagePreview={handleImageOutput}
        />
      </div>
    </div>
  )
}

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('app'))
}

renderApp()

//NOTE: module.hot.accept(param1: module to be hot reloaded, param2: what needs to happen)

// if (module.hot) {
//   module.hot.accept('./components/MyForm.jsx', function () {
//     console.log('Accepting the updated printMe module!');
//     renderApp();
//   });
// }
