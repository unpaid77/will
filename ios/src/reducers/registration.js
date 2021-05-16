import {userConstants} from '../actions/actionTypes';

const initialState = {
  regResponse: '',
  loading: false,
  showOtp: true,
  regError: '',
  userToken: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        regResponse: action.reg.data.message,
        loading: false,
        showOtp: true,
        userToken: action.reg.data.authorization_token,
      };

    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        regError: action.error.message,
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
