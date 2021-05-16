import {userConstants} from '../actions/actionTypes';

const initialState = {
  forgotData: {},
  loading: false,
  forgotError: '',
  forgotMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.FORGOT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.FORGOT_SUCCESS:
      return {
        ...state,
        forgotData: action.user.data,
        loading: false,
        forgotMessage: action.user.message,
      };

    case userConstants.FORGOT_FAILURE:
      return {
        ...state,
        forgotError: action.error.message,
        loading: false,
      };
    case userConstants.CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
