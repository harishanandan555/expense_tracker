import axios from 'axios';
import { LOGOUT } from '../actions/types';
import { AppConstants } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const api = axios.create({
  baseURL: AppConstants.API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    console.log(111)
    console.log(config.data);
    let _body_parameters = config.data ?  config.data : JSON.parse(config.data);
    console.log(_body_parameters);
   
    if (
      _body_parameters &&
      _body_parameters['is_external_bb_access_token'] &&
      _body_parameters['bb_access_token']
    ) {
      config.headers['bb-access-token'] = _body_parameters['bb_access_token'];
    } else {
      const token = await AsyncStorage.getItem('token');
      config.headers['bb-access-token'] = token;
    }

    _body_parameters = null;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  
  async (response) => {
    console.log(111)
    if (
      response['data']['erase_token_id'] ||
      response['data']['navigateScreen'] === 'signin' ||
      ['003', '004'].indexOf(response['data']['code']) > -1 ||
      response['data']['navigateScreen'] === './signin' ||
      response['data']['token_id'] ===
        'g6Eg1l0aId3yzoosDaSfxeblOy2lXoUgXgFeHdnoYuUtIDIeIQ'
    ) {
      await AsyncStorage.removeItem('token');
      // Handle navigation in React Native based on your app's navigation setup
      // e.g., navigation.navigate('SignInLoggedOut');
    } else {
      if (response['data'] && response['data']['code'] && ['003', '004'].indexOf(response['data']['code']) > -1) {
        await AsyncStorage.removeItem('token');
        // Handle navigation in React Native based on your app's navigation setup
        // e.g., navigation.navigate('SignInLoggedOut');
      } else {
        if (response['data'] && response['data']['token_id']) {
          if (response['data']['is_authenticated']) {
            await AsyncStorage.setItem('token', response['data']['token_id']);
          }
        }
      }
    }
    return response || { data: { code: '011', messageText: 'internal error' } };
  },
  async (error) => {
    // Handle error, e.g., dispatch(LOGOUT) or navigate to a logout screen
    // based on your app's logic
    return Promise.reject(error);
  }
);

export default api;
