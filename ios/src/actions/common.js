/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {userConstants} from './actionTypes';
export const commonAction = {
  multiSubWeek,
  multiSubSelectedWeek,
  pathFinder,
};
function pathFinder(data) {
  return (dispatch) => {
    dispatch({type: userConstants.PATH_FINDER, data});
  };
}
function multiSubWeek(data) {
  return (dispatch) => {
    dispatch({type: userConstants.MULTI_SUB_WEEK, data});
  };
}
function multiSubSelectedWeek(data) {
  return (dispatch) => {
    dispatch({type: userConstants.MULTI_SUB_SELECTED_WEEK, data});
  };
}
