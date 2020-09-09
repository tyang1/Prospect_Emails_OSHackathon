import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import MyForm from './components/MyForm.jsx';
import MainPanel from './components/MainPanel.jsx';
import { getImages } from "./actions/API.js";

export default function App() {
      const [images, setImages] = useState({});
      const handleImageOutput = (formData) => {
    // formData payload includes:
    //  2 COLOR=green
    //  3 HEADER_TEXT="Notifications for Bandolier"
    //  4 PUSH_NOTIF_HEADER="We re saving this for you!"
    //  5 PUSH_NOTIF_MSG="You are one step away.  Don t forget to checkout!"
    //  6 PUSH_NOTIF_HOST="bandolierstyle.com"
    //  7 URL_TEXT="bandolierstyle.com"
    //  8 DASHBOARD_IMAGE=dash.jpg
    //  9 SCREENSHOT_IMAGE=shot.jpg
    // 10 PUSH_NOTIF_IMAGE=logo.jpg
        const images = getImages({
            COLOR :"green",
            HEADER_TEXT : "Notifications for Bandolier",
            PUSH_NOTIF_HEADER : "We re saving this for you!",
            PUSH_NOTIF_MSG : "You are one step away.  Don t forget to checkout!",
            PUSH_NOTIF_HOST : "bandolierstyle.com",
            URL_TEXT : "bandolierstyle.com"
        });
        setImages(images);
      }
        return(
            <div>
                <div>
                <MainPanel images={images}/>
                </div>
                <div class="mui--divider-right"></div>
                <div>
                    <MyForm handleImageOutput={handleImageOutput}/>
                </div>
            </div>
        )
    }

function renderApp() {
        ReactDOM.render(
            <App />, document.getElementById('app')
        );
      }

renderApp();