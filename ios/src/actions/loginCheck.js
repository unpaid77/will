import {userConstants} from './actionTypes';
import {USER_API} from '../util/api';
import AsyncStorage from '@react-native-community/async-storage';

export const loginCheckActions = {
    loginCheckAction
  };

function loginCheckAction () {
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        dispatch(success(token))
    }
    function success(data){
        return {type: userConstants.LOGIN_CHECK_SUCCESS, data};
    }
  }