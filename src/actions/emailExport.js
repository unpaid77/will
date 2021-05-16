import {userConstants} from './actionTypes';
import {EXPORTEMAIL_API} from '../util/api';
export const emailActions = {
  emailAction,
};

function emailAction(data) {
  return (dispatch) => {
    dispatch(request());
    return EXPORTEMAIL_API(data, 'user/order/export').then(
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
    return {type: userConstants.EMAILEXPORT_REQUEST};
  }

  function success(data) {
    return {type: userConstants.EMAILEXPORT_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.EMAILEXPORT_FAILURE, error};
  }
}
