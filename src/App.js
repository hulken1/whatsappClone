import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';

export default class App extends Component {
  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyC-PpQVNtIUQVzkDFL_XmNX7eBMMsDOWI4',
      authDomain: 'chatzap-b3273.firebaseapp.com',
      databaseURL: 'https://chatzap-b3273.firebaseio.com',
      projectId: 'chatzap-b3273',
      storageBucket: '',
      messagingSenderId: '188207781171',
      appId: '1:188207781171:web:e8b35095087775f69c1a46'
      };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
  <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
    <Routes />
  </Provider>
    );
  }
}

