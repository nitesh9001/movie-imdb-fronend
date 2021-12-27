import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routers from './Routers';
import {store, persistor}  from "./redux/store";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import Spinner from './Spinner';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
       <PersistGate loading={<Spinner />} persistor={persistor}>
        <Routers />
       </PersistGate>
    </Provider>,
  //  </React.StrictMode>,
  document.getElementById('root')
);

