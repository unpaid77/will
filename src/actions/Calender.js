import {userConstants} from './actionTypes';
import {ADD_AND_UPDATE_API} from '../util/api';
export const calenderActions = {
  calenderAction,
};

function calenderAction(data) {
  return (dispatch) => {
    dispatch(request());
    ADD_AND_UPDATE_API(data, 'restaurant/calendar').then(
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
    return {type: userConstants.CALENDER_REQUEST};
  }
  function success(data) {
    return {type: userConstants.CALENDER_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.CALENDER_FAILURE, error};
  }
}
