import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { App, Timer, Settings } from './containers';
import reducer from './reducers';

const store = createStore(reducer);

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Timer } />
        <Route path="settings" component={ Settings } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
