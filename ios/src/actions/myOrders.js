/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {userConstants} from './actionTypes';
import {MYORDERS_API} from '../util/api';
export const myOrdersActions = {
  myOrdersAction,
};

function myOrdersAction(data) {
  return (dispatch) => {
    dispatch(request());
    return MYORDERS_API(data, 'user/addToCart').then(
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
    return {type: userConstants.MYORDERS_REQUEST};
  }

  function success(data) {
    return {type: userConstants.MYORDERS_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.MYORDERS_FAILURE, error};
  }
}
