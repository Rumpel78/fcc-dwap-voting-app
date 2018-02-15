import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import fetch from 'whatwg-fetch';

import Main from './scenes/Main';
import registerServiceWorker from './registerServiceWorker';

// fetch('/api/food?q=aa')
//   .then(response => response.json())
//   .then(json => console.log('parsed json', json))
//   .catch(ex => console.log('parsing failed', ex));

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
  , document.getElementById('root'),
);
registerServiceWorker();
