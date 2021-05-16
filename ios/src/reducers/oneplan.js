import {userConstants} from '../actions/actionTypes';

const initialState = {
  onedayplanData: {},
  loading: false,
  onedayplanStatus: false,
  onedayplanError: '',
  onedayplanMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.ONE_DAY_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.ONE_DAY_PLAN_SUCCESS:
      return {
        ...state,
        onedayplanData: action.user.data,
        loading: false,
        onedayplanStatus: true,
        onedayplanMessage: action.user.message,
      };
    case userConstants.ONE_DAY_PLAN_FAILURE:
      return {
        ...state,
        onedayplanError: action.error.message,
        loading: false,
        onedayplanStatus: false,
      };
    default:
      return state;
  }
}
