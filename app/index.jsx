import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import MyForm from './components/MyForm.jsx';
import MainPanel from './components/MainPanel.jsx';

export default function App() {
      const [images, setImages] = useState({});
      const handleImageOutput = (images) => {
        // console.log("inside hamelImageOutput")
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