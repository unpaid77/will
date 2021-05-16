import {userConstants} from '../actions/actionTypes';

const initialState = {
  otpData: {},
  loading: false,
  otpError: '',
  otpMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpData: action.user.data,
        loading: false,
        otpMessage: action.user.message,
      };
    case userConstants.VERIFY_OTP_FAILURE:
      return {
        ...state,
        otpError: action.error.message,
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
