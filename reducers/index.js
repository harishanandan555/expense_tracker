// reducers/index.js
import { combineReducers  } from 'redux';
import authReducer from './authReducer'; // Import your specific reducer

const rootReducer = combineReducers({
  auth:authReducer, // Add your reducer to the root reducer
});

export default rootReducer;
