import {userConstants} from '../actions/actionTypes';

const initialState = {
  profileData: {},
  loading: false,
  profileError: '',
  profileMessage: '',
  profileStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.PROFILE_SUCCESS:
      return {
        ...state,
        profileData: action.user.data,
        profileStatus: true,
        loading: false,
        profileMessage: action.user.message,
      };
    case userConstants.PROFILE_FAILURE:
      return {
        ...state,
        profileError: action.error.message,
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
