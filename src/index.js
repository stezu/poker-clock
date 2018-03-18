import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'

import { App, Timer, Settings } from './views';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

const basename = process.env.PUBLIC_URL; // eslint-disable-line no-process-env

render(
  <Provider store={ store }>
    <BrowserRouter basename={ basename }>
      <App>
        <Route exact path="/" component={ Timer } />
        <Route path="/settings" component={ Settings } />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
