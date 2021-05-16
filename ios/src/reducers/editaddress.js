import {userConstants} from '../actions/actionTypes';

const initialState = {
  editaddressData: {},
  loading: false,
  editaddressError: '',
  editaddressMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.EDIT_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        editaddressData: action.user.data,
        loading: false,
        editaddressMessage: action.user.message,
      };
    case userConstants.EDIT_ADDRESS_FAILURE:
      return {
        ...state,
        editaddressError: action.error.message,
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
