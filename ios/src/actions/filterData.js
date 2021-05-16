import {userConstants} from './actionTypes';
import {GET_API} from '../util/api';
export const filterActions = {
  filterAction,
  filterClearAction,
};

function filterAction(data) {
  return (dispatch) => {
          dispatch(success(data));
  };

  function success(user) {
    return {type: userConstants.FILTER_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.FILTER_FAILURE, error};
  }
}

function filterClearAction() {
  return (dispatch) => {
    dispatch(success())
  }

  function success() {
    return {type: userConstants.FILTER_CLEAR_SUCCESS}
  }
}
