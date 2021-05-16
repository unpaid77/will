import {userConstants} from '../actions/actionTypes';

const initialState = {
  emailData: {},
  emailLoading: false,
  emailStatus: false,
  emailError: '',
  emailMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.EMAIL_INITIATION_REQUEST:
      return {
        ...state,
        emailLoading: true,
      };
    case userConstants.EMAIL_INITIATION_SUCCESS:
      return {
        ...state,
        emailData: action.data.data,
        emailLoading: false,
        emailStatus: true,
        emailMessage: action.data.message,
      };
    case userConstants.EMAIL_INITIATION_FAILURE:
      return {
        ...state,
        emailError: action.error.message,
        emailLoading: false,
        emailStatus: false,
      };
    default:
      return state;
  }
}
