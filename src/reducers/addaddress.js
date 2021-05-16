import {userConstants} from '../actions/actionTypes';

const initialState = {
  addaddressData: {},
  loading: false,
  addaddressError: '',
  addaddressMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addaddressData: action.user.data,
        loading: false,
        addaddressMessage: action.user.message,
      };
    case userConstants.ADD_ADDRESS_FAILURE:
      return {
        ...state,
        addaddressError: action.error.message,
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
