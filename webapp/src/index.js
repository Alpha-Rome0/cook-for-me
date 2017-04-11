import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import Home from './containers/home';
import Login from './components/login';
import reducers from './reducers';

import { IndexRoute, Router, Route, browserHistory } from 'react-router';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Login} />
        <Route path="home" component={Home} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));

/*ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));*/
