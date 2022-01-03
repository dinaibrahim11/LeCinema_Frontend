import React from 'react'; 
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';


const App = () => {
 
  return (
    <BrowserRouter>
      <div className="App">
      <Header />
      <Main />

    </div>
    </BrowserRouter>
    

  );
}

export default App;
