import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './containers/app';
import reducers from './reducers';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightBlue700, gray300} from 'material-ui/styles/colors';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const muiTheme = getMuiTheme({
  palette: {
    canvasColor: gray300,
    primary1Color: lightBlue700,
  },
  appBar: {
    height: 50,
  },
});

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));
