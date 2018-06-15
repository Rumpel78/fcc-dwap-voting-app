import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Main from './scenes/Main';
import registerServiceWorker from './registerServiceWorker';
import config from './config';

console.log('public url: ', process.env.PUBLIC_URL)

ReactDOM.render(
  <BrowserRouter basename={config.basePath}>
    <Main />
  </BrowserRouter>
  , document.getElementById('root'),
);
//registerServiceWorker();
