import {userConstants} from './actionTypes';
import {GET_API} from '../util/api';
export const addressListActions = {
  addressListAction,
};

function addressListAction() {
  return (dispatch) => {
    dispatch(request());
    return GET_API('my-addresses').then(
      (data) => {
        if (data.success) {
          dispatch(success(data));
        } else {
          dispatch(failure(data));
        }
      },
      (error) => {
        console.error(error);
        dispatch(failure(error));
      },
    );
  };

  function request() {
    return {type: userConstants.ADDRESS_LIST_REQUEST};
  }
  function success(user) {
    return {type: userConstants.ADDRESS_LIST_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.ADDRESS_LIST_FAILURE, error};
  }
}
