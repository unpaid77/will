import {userConstants} from '../actions/actionTypes';

const initialState = {
  addressSetData: {},
  loading: false,
  addressSetError: '',
  addressSetMessage: '',
  addressSetStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.ADDRESS_SET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.ADDRESS_SET_SUCCESS:
      return {
        ...state,
        addressSetData: action.user.data,
        loading: false,
        addressSetMessage: action.user.message,
        addressSetStatus: true,
      };
    case userConstants.ADDRESS_SET_FAILURE:
      return {
        ...state,
        addressSetError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
}
