import {userConstants} from './actionTypes';
import {ADD_AND_UPDATE_API} from '../util/api';
export const onedayplanActions = {
  onedayplanAction,
};

function onedayplanAction(data) {
  return (dispatch) => {
    dispatch(request());
    return ADD_AND_UPDATE_API(data, 'get/restaurant-list/byfeature').then(
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
    return {type: userConstants.ONE_DAY_PLAN_REQUEST};
  }

  function success(user) {
    return {type: userConstants.ONE_DAY_PLAN_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.ONE_DAY_PLAN_FAILURE, error};
  }
}
