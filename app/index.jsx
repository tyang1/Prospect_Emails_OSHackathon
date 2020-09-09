import React from 'react';
import ReactDOM from 'react-dom';
import MyForm from './components/MyForm.jsx';
// import './index.css';

class App extends React.Component{
    render(){
        return(
           <MyForm/>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))