import {userConstants} from './actionTypes';
import {ADD_AND_UPDATE_API} from '../util/api';
export const dietCompanyPlanActions = {
  dietCompanyPlanAction,
};

function dietCompanyPlanAction(data) {
  return (dispatch) => {
    dispatch(request());
    return ADD_AND_UPDATE_API(data, `get/company/plan-list/by-restaurant`).then(
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
    return {type: userConstants.PROGRAMS_PLAN_REQUEST};
  }
  function success(data) {
    return {type: userConstants.PROGRAMS_PLAN_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.PROGRAMS_PLAN_FAILURE, error};
  }
}
