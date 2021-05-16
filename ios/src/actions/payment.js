/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {userConstants} from './actionTypes';
import {PAYMENT_API} from '../util/api';
export const paymentActions = {
  paymentAction,
};

function paymentAction(data) {
  return (dispatch) => {
    dispatch(request());
    return PAYMENT_API(data, 'user/add/order').then(
      (data) => {
        if (data.success) {
          dispatch(success(data));
        } else {
          console.log("payment action not-succesful", data)
          dispatch(failure(data));
        }
        return data;
      },
      (error) => {
        dispatch(failure(error));
      },
    );
  };

  function request() {
    return {type: userConstants.PAYMENT_INITIATION_REQUEST};
  }

  function success(data) {
    return {type: userConstants.PAYMENT_INITIATION_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.PAYMENT_INITIATION_FAILURE, error};
  }
}
