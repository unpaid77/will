import {userConstants} from '../actions/actionTypes';

const initialState = {
  companyPlanData: {},
  loading: false,
  companyPlanError: '',
  companyPlanMessage: '',
  companyPlanStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.COMPANY_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.COMPANY_PLAN_SUCCESS:
      return {
        ...state,
        companyPlanData: action.data,
        loading: false,
        companyPlanError: '',
        companyPlanMessage: action.message,
        companyPlanStatus: true,
      };
    case userConstants.COMPANY_PLAN_FAILURE:
      return {
        ...state,
        companyPlanError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
}
