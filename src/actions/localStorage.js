import {userConstants} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';

export const localStorage = {
  device_token,
  device_type,
  language,
  token,
};

const device_token = async () => {
  return {
    type: userConstants.DEVICE_TOKEN,
    data: await AsyncStorage.getItem('device_token'),
  };
};
const device_type = async () => {
  return {
    type: userConstants.DEVICE_TYPE,
    data: await AsyncStorage.getItem('device_type'),
  };
};
const language = async () => {
  return {
    type: userConstants.LANGUAGE,
    data: (await AsyncStorage.getItem('language')) === 'ar' ? 'ar' : 'en',
  };
};
const token = async () => {
  return {
    type: userConstants.TOKEN,
    data: await AsyncStorage.getItem('token'),
  };
};
