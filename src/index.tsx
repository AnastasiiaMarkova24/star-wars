import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Home from './components/home';
import { Provider } from 'react-redux';
import { store } from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store={store}>
      <Home />
  </Provider>,
  document.getElementById('root')
);
