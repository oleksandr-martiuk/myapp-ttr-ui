import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {HashRouter as Router} from "react-router-dom";

import configureStore from "./redux_setup/configureStore";
import App from "./components/App";

import './shared/styles/main.css'

const initialState = {};
const store = configureStore(initialState); // TODO: REDUX store

const MOUNT_NODE = document.getElementById('root');

// TODO: with REDUX
ReactDOM.render(
   <Provider store={store}>
      <Router>
         <App/>
      </Router>
   </Provider>,
   MOUNT_NODE
);

// ReactDOM.render(
//    <App/>,
//    MOUNT_NODE
// );
