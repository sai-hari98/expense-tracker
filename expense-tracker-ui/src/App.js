import React from 'react';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './store/reducers/auth';
import appReducer from './store/reducers/app';
import Layout from './containers/Layout/Layout';
import './App.css';

function App() {
  const reducer = combineReducers({
    auth:authReducer,
    app:appReducer
  })
  const store = createStore(reducer);
  return (
    <Provider store={store}>
        <Layout />
    </Provider>
  );
}

export default App;
