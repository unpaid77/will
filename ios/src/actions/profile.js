import {userConstants} from './actionTypes';
import {GET_API} from '../util/api';
import AsyncStorage from '@react-native-community/async-storage';
export const profileActions = {
  profileUserAction,
};

function profileUserAction() {
  return (dispatch) => {
    dispatch(request());
    GET_API('my-profile').then(
      (data) => {
        if (data.success) {
          AsyncStorage.setItem('first_name', data.data.first_name);
          AsyncStorage.setItem('last_name', data.data.last_name);
          AsyncStorage.setItem('phone_number', data.data.phone_number);
          AsyncStorage.setItem('language', data.data.language);
          if (data.data.my_address.length > 0) {
            const address = JSON.stringify(data.data.my_address);
            AsyncStorage.setItem('address', address);
          }
          dispatch(success(data));
        } else {
          dispatch(failure(data));
        }
      },
      (error) => {
        dispatch(failure(error));
      },
    );
  };

  function request() {
    return {type: userConstants.PROFILE_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(user) {
    return {type: userConstants.PROFILE_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.PROFILE_FAILURE, error};
  }
}
