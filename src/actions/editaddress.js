import {userConstants} from './actionTypes';
import {ADD_AND_UPDATE_API} from '../util/api';
export const editAddressActions = {
  editAddressAction,
};

function editAddressAction(data) {
  return (dispatch) => {
    dispatch(request());
    return ADD_AND_UPDATE_API(data, 'update-address').then(
      (data) => {
        if (data.success) {
          dispatch(success(data));
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
    return {type: userConstants.EDIT_ADDRESS_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(user) {
    return {type: userConstants.EDIT_ADDRESS_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.EDIT_ADDRESS_FAILURE, error};
  }
}
