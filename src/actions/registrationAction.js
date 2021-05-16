import {userConstants} from './actionTypes';
import {USER_API} from '../util/api';
import AsyncStorage from '@react-native-community/async-storage';
export const registerActions = {
  registerUserAction,
};

function registerUserAction(data, navigation) {
  return (dispatch) => {
    dispatch(request());
    USER_API(data, 'register').then(
      (data) => {
        if (data.success) {
          dispatch(success(data));
          if (data.data.is_verified == 0) {
            const id = data.data.userdetails.id;
            const length = data.data.userdetails.email.indexOf('@');
            const email = data.data.userdetails.email.slice(
              length - 2,
              length + 3,
            );
            AsyncStorage.setItem('token', data.data.authorization_token);
            AsyncStorage.setItem('userid', id.toString());
            AsyncStorage.setItem('email', email);
            navigation.navigate('Otp');
          }
        } else {
          dispatch(failure(data));
        }
        dispatch(clear());
      },
      (error) => {
        dispatch(failure(error));
        dispatch(clear());
      },
    );
  };

  function request() {
    return {type: userConstants.REGISTER_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(reg) {
    return {type: userConstants.REGISTER_SUCCESS, reg};
  }
  function failure(error) {
    return {type: userConstants.REGISTER_FAILURE, error};
  }
}
