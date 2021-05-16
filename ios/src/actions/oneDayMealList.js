import {userConstants} from './actionTypes';
import {ADD_AND_UPDATE_API} from '../util/api';
export const oneDayMealListActions = {
  oneDayMealListAction,
};

function oneDayMealListAction(data) {
  return (dispatch) => {
    dispatch(request());
    return ADD_AND_UPDATE_API(data, 'get/feature/plan-list/by-restaurant').then(
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
    return {type: userConstants.ONE_DAY_MEAL_LIST_REQUEST};
  }

  function success(data) {
    return {type: userConstants.ONE_DAY_MEAL_LIST_SUCCESS, data};
  }
  function failure(error) {
    return {type: userConstants.ONE_DAY_MEAL_LIST_FAILURE, error};
  }
}
