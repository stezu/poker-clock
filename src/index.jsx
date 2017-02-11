import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import { App, Settings } from './containers';
import reducer from './reducers';

const store = createStore(reducer);

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <Route path="settings" component={ Settings } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
