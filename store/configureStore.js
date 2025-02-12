import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index'; // Create this file

let composeEnhancers = compose

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


export default store;