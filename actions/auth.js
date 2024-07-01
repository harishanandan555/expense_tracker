import api from '../utils/api';
import { setAlert } from './alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_OTP_SUCCESS,
  EMAIL_OTP_SUCCESS,
  PAYMENT_INITIATE_SUCCESS,
  LOGOUT
} from './types';
import { API_END_POINTS } from '../constants/constants';
// import setAuthToken from '../utils/setAuthToken';
import setUserData from '../utils/setUserData';
// import setStateParameters from '../utils/setStateParameters';

export const loadUser = () => async dispatch => {
  try {
    const res = await api.post(API_END_POINTS.VALIDATE_OTP);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    // dispatch({
    //   type: REGISTER_FAIL
    // });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {}
    });

  }
};

export const login = (body_parameters) => {
return async (dispatch) =>  {

  try {
    const body = body_parameters;
  
    const res = await api.post(API_END_POINTS.LOGIN, body);
    console.log(222)
   console.log(res['data']);
    /*
    if(res.data.erase_token_id)
      setAuthToken(null);
    else {

      if(res.data.token_id)
        setAuthToken(res.data.token_id);

    }
    */

    let result = res['data'];
    
    // if(result['is_authenticated']) {
    //   setUserData(result, 'SAVE');
    //   setUserData(result, 'MASTER');
    // }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res ? res.data : {}
    });

    // return res.data;
    
  } catch (err) {
    
    console.log(err)
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }

    // dispatch({
    //   type: LOGIN_FAIL,
    //   payload: {}
    // });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {}
    });
  }
}
}

export const sendOtp = (body_parameters) => async dispatch => {
   
  const body = Object.assign(body_parameters, { 
    device_id: AsyncStorage.getItem(`mobile_device_id`) || new window.DeviceUUID().get() 
  });
 
  try {

    const res = await api.post(API_END_POINTS.SEND_OTP, body);
   
    /*
    if(res.data.erase_token_id)
      setAuthToken(null);
    else {

      if(res.data.token_id)
        setAuthToken(res.data.token_id);

    }
    */

    dispatch({
      type: LOGIN_OTP_SUCCESS,
      payload: res.data
    });

    // return res.data;
    
  } catch (err) {
    console.log(err)
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }

    // dispatch({
    //   type: LOGIN_FAIL,
    //   payload: {}
    // });
    dispatch({
      type: LOGIN_OTP_SUCCESS,
      payload: {}
    });
    
  }
};

export const validateOtp = (body_parameters) => async dispatch => {
   
  const body = Object.assign(body_parameters, { 
    device_id: AsyncStorage.getItem(`mobile_device_id`) || new window.DeviceUUID().get() 
  });

  try {

    const res = await api.post(API_END_POINTS.VALIDATE_OTP, body);

    if(res['data']['code'] === '000') {

      /*
      if(res.data.erase_token_id)
        setAuthToken(null);
      else {

        if(res.data.token_id)
          setAuthToken(res.data.token_id);

      }

      if(res.data.erase_state_parameters)
         setStateParameters(null);
      else {

        if(res.data.state_parameters)
           setStateParameters(res.data.state_parameters);
      }
      */

      let result = res['data'];

      if(result['is_authenticated']) {
        setUserData(result, 'SAVE');
        setUserData(result, 'MASTER');
      }

    }

    dispatch({
      type: LOGIN_OTP_SUCCESS,
      payload: res.data
    });
    
   
  //  dispatch(loadUser());
  } catch (err) {

    console.log(err)
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });

  }
};

export const send2FactorOtp = (body_parameters) => async dispatch => {
   
  const body = body_parameters;
 
  try {

    const res = await api.post(API_END_POINTS.SEND_2FACTOR_OTP, body);

    dispatch({
      type: LOGIN_OTP_SUCCESS,
      payload: res.data
    });

    // return res.data;
    
  } catch (err) {
    
    console.log(err)
    
    dispatch({
      type: LOGIN_OTP_SUCCESS,
      payload: {}
    });
    
  }
};

export const verifyEmail = (body_parameters) => async dispatch => {
   
  const body = Object.assign(body_parameters, { 
    device_id: AsyncStorage.getItem(`mobile_device_id`) || new window.DeviceUUID().get() 
  });
 
  try {

    const res = await api.post(API_END_POINTS.VERIFY_EMAIL, body);
    console.log(res);
    
    if(res['data']['code'] === '000') {
/*
      // let result = res['data'];

      // if(result['is_authenticated']) {
      //   setUserData(result, 'SAVE');
      //   setUserData(result, 'MASTER');
      // }

      /*
      if(res.data['erase_token_id'])
        setAuthToken(null);
      else {

        if(res.data.token_id)
          setAuthToken(res.data.token_id);

      }
      
      if(res.data['erase_state_parameters'])
          setStateParameters(null);
      else {
        
        if(res.data['state_parameters'])
          setStateParameters(res.data.state_parameters);

      }
      */
    }

    dispatch({
      type: EMAIL_OTP_SUCCESS,
      payload: res.data
    });

    // return res.data;
    
  } catch (err) {

    console.log(err)
    const errors = err.response['data'].errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: {}
    });

  }

};

export const verifyMpin = (body_parameters) => async dispatch => {
   
  const body = Object.assign(body_parameters, { 
    device_id: AsyncStorage.getItem(`mobile_device_id`) || new window.DeviceUUID().get() 
  });
 
  try {

    const res = await api.post(API_END_POINTS.VERIFY_MPIN, body);
    
    dispatch({
      type: EMAIL_OTP_SUCCESS,
      payload: res.data
    });
    
  } catch (err) {

    console.log(err)
    const errors = err.response['data'].errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: {}
    });

  }

};

export const resetPassword = (body_parameters) => async dispatch => {
   
  const body = Object.assign(body_parameters, { 
    device_id: AsyncStorage.getItem(`mobile_device_id`) || new window.DeviceUUID().get() 
  });
 
  try {

    const res = await api.post(API_END_POINTS.RESET_PASSWORD, body);
    console.log(res);
    
    if(res['data']['code'] === '000') {
    }

    dispatch({
      type: EMAIL_OTP_SUCCESS,
      payload: res.data
    });

    // return res.data;
    
  } catch (err) {

    console.log(err)
    const errors = err.response['data'].errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: {}
    });

  }

};

export const validateSession = (body_parameters) => async dispatch => {
   
  const body = Object.assign(body_parameters, 
    { 
      device_id: AsyncStorage.getItem(`mobile_device_id`) || new window.DeviceUUID().get() 
    });
 
  try {

    const res = await api.post(API_END_POINTS.VALIDATE_SESSION, body);
    // console.log(res);
    
    let result = res['data'];

    if(result['is_authenticated'] && result['code'] === '000') {
      setUserData(result, 'SAVE');
      setUserData(result, 'MASTER');
    }
   
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    // return res.data;
    
  } catch (err) {

    console.log(err)
    const errors = err.response['data'].errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: {}
    });

  }

};

export const initiatePayment = (body_parameters) => async dispatch => {
   
  const body = body_parameters;
 
  try {

    const res = await api.post(API_END_POINTS.INITIATE_PAYMENT, body);
    
    dispatch({
      type: PAYMENT_INITIATE_SUCCESS,
      payload: res.data
    });

    // return res.data;
    
  } catch (err) {

    console.log(err)
    const errors = err.response['data'].errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: {}
    });

  }

};

export const eNachMandate = (body_parameters) => async dispatch => {
   
  const body = body_parameters;

  try {
    
    // dispatch({
    //   type: ORDER_LIST_LOAD
    // });

    let res = await api.post(API_END_POINTS.ENACH_MANDATE, body);
    
    dispatch({
      type: PAYMENT_INITIATE_SUCCESS,
      payload: res.data
    });
    
    
  } catch (err) {

    console.log(err)
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });

  }
};

export const initiateTwoFABseStarMF = (body_parameters) => async dispatch => {
   
  const body = body_parameters;
 
  try {

    const res = await api.post(API_END_POINTS.INITIATE_2FA_BSESTARMF, body);
    
    dispatch({
      type: PAYMENT_INITIATE_SUCCESS,
      payload: res.data
    });

    // return res.data;
    
  } catch (err) {

    console.log(err)
    const errors = err.response['data'].errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: {}
    });

  }

};

export const logout = (body_parameters) => async dispatch => {
   
  const body = body_parameters;
 
  try {

    const res = await api.post(API_END_POINTS.LOGOUT, body);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res ? res.data : {}
    });
    
    
  } catch (err) {
    
    console.log(err)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {}
    });

  }
};

// export const logout = () => ({ type: LOGOUT });
