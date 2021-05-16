import {userConstants} from '../actions/actionTypes';

const initialState = {
  homeData: {},
  loading: false,
  homeError: '',
  homeMessage: '',
  homeStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.HOME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.HOME_SUCCESS:
      return {
        ...state,
        homeData: action.user.data,
        loading: false,
        homeMessage: action.user.message,
        homeStatus: true,
      };
    case userConstants.HOME_FAILURE:
      return {
        ...state,
        homeError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
}
