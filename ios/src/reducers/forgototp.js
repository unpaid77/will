import {userConstants} from '../actions/actionTypes';

const initialState = {
  forgototpData: {},
  loading: false,
  //isSignout: false,
  //userToken: null,
  forgototpError: '',
  forgototpMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.FORGOT_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.FORGOT_OTP_SUCCESS:
      return {
        ...state,
        forgototpData: action.user.data,
        loading: false,
        forgototpMessage: action.user.message,
      };

    case userConstants.FORGOT_OTP_FAILURE:
      return {
        ...state,
        forgototpError: action.error.message,
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
