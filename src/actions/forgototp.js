import {userConstants} from './actionTypes';
import {USER_API} from '../util/api';
export const forgotOtpActions = {
  forgotOtpAction,
};

function forgotOtpAction(data, navigation) {
  return (dispatch) => {
    dispatch(request());
    USER_API(data, 'user/otp-verification').then(
      (data) => {
        if (data.success) {
          dispatch(success(data));
          navigation.navigate('Forgot');
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
    return {type: userConstants.FORGOT_OTP_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(user) {
    return {type: userConstants.FORGOT_OTP_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.FORGOT_OTP_FAILURE, error};
  }
}
