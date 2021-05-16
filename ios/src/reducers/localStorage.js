import {userConstants} from '../actions/actionTypes';

const initialState = {
  device_token: '',
  device_type: '',
  language: '',
  token: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.DEVICE_TOKEN:
      return {
        ...state,
        device_token: action.data,
      };
    case userConstants.DEVICE_TYPE:
      return {
        ...state,
        device_type: action.data,
      };
    case userConstants.LANGUAGE:
      return {
        ...state,
        language: action.data,
      };
    case userConstants.TOKEN:
      return {
        ...state,
        token: action.data,
      };
    default:
      return state;
  }
}
