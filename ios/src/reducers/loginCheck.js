import {userConstants} from '../actions/actionTypes';

const initialState = {
  token: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_CHECK_SUCCESS:
      return {
        ...state,
        token: action.data.token,
      };
    default:
      return state;
  }
}
