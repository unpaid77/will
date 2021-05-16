import {userConstants} from './actionTypes';
import {GET_API} from '../util/api';
export const notificationActions = {
  notificationAction,
  newNotifiaction,
};
function newNotifiaction(data) {
  return (dispatch) =>
    dispatch({
      type: userConstants.NOTIFICATION_MESSAGE,
      data,
    });
}
function notificationAction() {
  return (dispatch) => {
    dispatch(request());
    return GET_API('my/notification-list').then(
      (data) => {
        console.log("data of notificastion ===|||||||||| ")
        console.log(data)
        if (data !== undefined) {
          if (data.success) {
            dispatch(success(data.data));
          } else {
            dispatch(failure(data));
          }
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
  function success(data) {
    return {type: userConstants.NOTIFICATION_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.NOTIFICATION_FAILURE, error};
  }
}
