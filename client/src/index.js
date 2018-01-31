import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import fetch from 'whatwg-fetch';

import App from './app';
import registerServiceWorker from './registerServiceWorker';

// fetch('/api/food?q=aa')
//   .then(response => response.json())
//   .then(json => console.log('parsed json', json))
//   .catch(ex => console.log('parsing failed', ex));

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'),
);
registerServiceWorker();
