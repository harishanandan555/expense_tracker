import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

const setUserData = async (result, mode) => {
  try {
    if (mode === 'SAVE') {
      if (result) {
        await AsyncStorage.setItem('profileData', JSON.stringify(result['profileData']));
        emitter.emit('HEADER1', result['profileData']);

        if (result['masterList'] && result['masterList']['amc_filter_list']) {
          await AsyncStorage.setItem('masterList', JSON.stringify(result['masterList']['amc_filter_list']));
        }
      }
    } else if (mode === 'MASTER') {
      if (result['profileData']) {
        emitter.emit('HEADER1', result['profileData']);
      }

      if (result['masterList'] && result['masterList']['amc_filter_list']) {
        await AsyncStorage.setItem('masterList', JSON.stringify(result['masterList']['amc_filter_list']));
      }
    } else {
      await AsyncStorage.removeItem('profileData');
      await AsyncStorage.removeItem('masterList');
    }
  } catch (error) {
    console.error('Error setting user data:', error);
  }
};

export { setUserData, emitter };
