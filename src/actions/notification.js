import {userConstants} from './actionTypes';
import {GET_API} from '../util/api';
export const notificationActions = {
  notificationAction,
};

function notificationAction(data, navigation) {
  return (dispatch) => {
    dispatch(request());
    return GET_API('creditcard/list').then(
      (data) => {
        if (data.success) {
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
    return {type: userConstants.NOTIFICATION_REQUEST};
  }
  function success(user) {
    return {type: userConstants.NOTIFICATION_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.NOTIFICATION_FAILURE, error};
  }
}
