import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  LOGIN_MOBILE_SUCCESS,
  LOGIN_OTP_SUCCESS,    
  EMAIL_OTP_SUCCESS,
  PAYMENT_INITIATE_SUCCESS,
  LOGIN_OTP_FAIL

} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  token: AsyncStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  OTP_received : null,
  user: null,
  login_result: null,
  login_otp_result: null,
  email_otp_result: null,
  payment_initiate_result: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        login_result: payload,
        isAuthenticated: true,
        loading: false
      };
      case LOGIN_MOBILE_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          OTP_received:true,
          loading: false
        };
      case LOGIN_OTP_SUCCESS:
        return {
          ...state,
          login_otp_result: payload,
          isAuthenticated: true,
          loading: false
        };
    case EMAIL_OTP_SUCCESS:
      return {
        ...state,
        email_otp_result: payload,
        isAuthenticated: true,
        loading: false
      };
    case PAYMENT_INITIATE_SUCCESS:
      return {
        ...state,
        payment_initiate_result: payload,
        isAuthenticated: true,
        loading: false
      };
      
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
     
  }
 
}

export default authReducer;
