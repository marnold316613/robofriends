import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import {createLogger } from 'redux-logger';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import 'tachyons';
import { requestRobots, searchRobots } from './reducers';

const logger = createLogger();

const rootReducer = combineReducers({searchRobots,requestRobots: requestRobots})
const store = createStore(rootReducer, applyMiddleware(thunk,logger));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <Provider  store={store}>
      <App key="root" />
      </Provider>
   </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
