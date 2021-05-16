import {userConstants} from './actionTypes';
import {USER_API, ADD_AND_UPDATE_API} from '../util/api';
export const forgotActions = {
  forgotUserAction,
  UpdateUserAction,
};

function forgotUserAction(data, navigation) {
  return (dispatch) => {
    dispatch(request());
    USER_API(data, 'user/set-new-password').then(
      (data) => {
        if (data.success) {
          dispatch(success(data));
          navigation.navigate('Login');
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
    return {type: userConstants.FORGOT_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(user) {
    return {type: userConstants.FORGOT_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.FORGOT_FAILURE, error};
  }
}

function UpdateUserAction(data, navigation) {
  return (dispatch) => {
    dispatch(request());
    ADD_AND_UPDATE_API(data, 'update-password').then(
      (data) => {
        if (data.success) {
          dispatch(success(data));
          navigation.navigate('Login');
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
    return {type: userConstants.FORGOT_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(user) {
    return {type: userConstants.FORGOT_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.FORGOT_FAILURE, error};
  }
}
