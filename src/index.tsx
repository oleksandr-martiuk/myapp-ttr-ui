import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {HashRouter as Router} from "react-router-dom";

import configureStore from "./redux_setup/configureStore";
import App from "./components/App";

import './shared/styles/main.css'

const initialState = {};
const store = configureStore(initialState);

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
   <Provider store={store}>
      <Router>
         <App/>
      </Router>
   </Provider>,
   MOUNT_NODE
);
