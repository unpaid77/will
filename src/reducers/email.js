import {userConstants} from '../actions/actionTypes';

const initialState = {
  emailData: {},
  loading: false,
  emailError: '',
  emailMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.EMAIL_SUCCESS:
      return {
        ...state,
        emailData: action.user.data,
        loading: false,
        emailMessage: action.user.message,
      };
    case userConstants.EMAIL_SENT_SUCCESS:
      return {
        ...state,
        emailData: action.user.data,
        loading: false,
        emailMessage: 'Please try after sometime',
      };

    case userConstants.EMAIL_FAILURE:
      return {
        ...state,
        emailError: action.error.message,
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
