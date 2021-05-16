import {userConstants} from '../actions/actionTypes';

const initialState = {
  userData: {},
  loading: false,
  isSignout: false,
  userToken: null,
  loginError: '',
  loginMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.user.data,
        loading: false,
        showOtp: true,
        loginMessage: action.user.message,
      };
    case userConstants.LOGIN_SUCCESS_VERIFY:
      return {
        ...state,
        userData: action.user.data,
        loading: false,
        showOtp: true,
        //userToken: action.user.accessToken,
        loginMessage: 'please verify you OTP sent in your Email',
      };
    case userConstants.TOKEN_RESTORE:
      return {
        ...state,
        userData: state.userData,
        userToken: action.token,
      };

    case userConstants.LOGOUT_REQUEST:
      return {
        ...state,
        userData: '',
        loading: false,
        showOtp: true,
        userToken: '',
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.error.message,
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
