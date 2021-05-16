import {userConstants} from './actionTypes';
import {USER_API} from '../util/api';
import AsyncStorage from '@react-native-community/async-storage';
export const emailActions = {
  emailUserAction,
};

function emailUserAction(data, navigation) {
  return (dispatch) => {
    dispatch(request());
    USER_API(data, 'user/forget-password').then(
      (data) => {
        if (data.success) {
          if (data.data.is_otp_sent) {
            const id = data.data.user_id;
            const length = data.data.email.indexOf('@');
            const email = data.data.email.slice(length - 2, length + 3);
            AsyncStorage.setItem('userid', id.toString());
            AsyncStorage.setItem('email', email);
            dispatch(success(data));
            navigation.navigate('ForgotOtp');
          } else {
            dispatch(success_sent(data));
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
    return {type: userConstants.EMAIL_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(user) {
    return {type: userConstants.EMAIL_SUCCESS, user};
  }
  function success_sent(user) {
    return {type: userConstants.EMAIL_SENT_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.EMAIL_FAILURE, error};
  }
}
