import {userConstants} from '../actions/actionTypes';

const initialState = {
  addressData: {},
  loading: false,
  addressError: '',
  addressMessage: '',
  addressStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.ADDRESS_LIST_REQUEST:
      return {
        ...state,
        addressStatus: false,
      };
    case userConstants.ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        addressData: action.user.data,
        loading: false,
        addressMessage: action.user.message,
        addressStatus: true,
      };
    case userConstants.ADDRESS_LIST_FAILURE:
      return {
        ...state,
        addressError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
}
