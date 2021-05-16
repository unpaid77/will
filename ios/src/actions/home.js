import {userConstants} from './actionTypes';
import {GET_API} from '../util/api';
export const homeActions = {
  homeAction,
};

function homeAction() {
  return (dispatch) => {
    dispatch(request());
    GET_API('home/list').then(
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
    return {type: userConstants.HOME_REQUEST};
  }
  function success(user) {
    return {type: userConstants.HOME_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.HOME_FAILURE, error};
  }
}
