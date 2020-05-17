import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './store/reducers/auth';
import Layout from './containers/Layout/Layout';
import './App.css';

function App() {
  const store = createStore(authReducer);
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
