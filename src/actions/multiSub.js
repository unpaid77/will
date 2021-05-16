/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {userConstants} from './actionTypes';
import {ADD_AND_UPDATE_API} from '../util/api';
export const multiSubActions = {
  multiSubAction,
  multiSubWeek,
  multiSubSelectedWeek,
  multiSubAddSelectedData,
  multiSublist_item,
};

function multiSublist_item(data) {
  return {type: userConstants.MULTI_SUB_LIST_ITEMS, data};
}
function multiSubAddSelectedData(data) {
  return {type: userConstants.MULTI_SUB_ADD_SELECTED_DATA, data};
}
function multiSubWeek(data) {
  return {type: userConstants.MULTI_SUB_WEEK, data};
}
function multiSubSelectedWeek(data) {
  return {type: userConstants.MULTI_SUB_SELECTED_WEEK, data};
}
function multiSubAction(data) {
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
    return {type: userConstants.MULTI_SUB_REQUEST};
  }

  function success(user) {
    return {type: userConstants.MULTI_SUB_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.MULTI_SUB_FAILURE, error};
  }
}
