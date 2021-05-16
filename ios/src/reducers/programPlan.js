/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {userConstants} from '../actions/actionTypes';

const initialState = {
  programPlanData: {},
  loading: false,
  programPlanError: '',
  programPlanMessage: '',
  programPlanStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.PROGRAMS_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.PROGRAMS_PLAN_SUCCESS:
      return {
        ...state,
        programPlanData: action.data,
        loading: false,
        programPlanError: '',
        programPlanMessage: action.message,
        programPlanStatus: true,
      };
    case userConstants.PROGRAMS_PLAN_FAILURE:
      return {
        ...state,
        programPlanError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
}
