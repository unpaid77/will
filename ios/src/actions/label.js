import {userConstants} from './actionTypes';
import {GET_API} from '../util/api';
export const labelActions = {
  labelAction,
};

function labelAction() {
  return (dispatch) => {
    dispatch(request());
    return GET_API('lable-list').then(
      (data) => {
        if (data.success) {
          dispatch(success(data.data));
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
    return {type: userConstants.LABEL_REQUEST};
  }
  function success(data) {
    return {type: userConstants.LABEL_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.LABEL_FAILURE, error};
  }
}
