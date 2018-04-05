import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming';

import { globalStyles, theme } from './styles';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { App, Timer, Settings } from './views';

const store = createStore(reducer);

const basename = process.env.PUBLIC_URL; // eslint-disable-line no-process-env

// Inject global styles
globalStyles();

render(
  <Provider store={ store }>
    <ThemeProvider theme={ theme }>
      <BrowserRouter basename={ basename }>
        <App>
          <Route exact path="/" component={ Timer } />
          <Route path="/settings" component={ Settings } />
        </App>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
