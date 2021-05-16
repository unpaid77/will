/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {userConstants} from './actionTypes';
import {ADD_AND_UPDATE_API} from '../util/api';
export const programActions = {
  programAction,
};

function programAction(data) {
  return (dispatch) => {
    dispatch(request());
    return ADD_AND_UPDATE_API(data, 'get/restaurant-list/byprogram').then(
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
    return {type: userConstants.PROGRAMS_REQUEST};
  }

  function success(data) {
    return {type: userConstants.PROGRAMS_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.PROGRAMS_FAILURE, error};
  }
}
