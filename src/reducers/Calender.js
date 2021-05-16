import {userConstants} from '../actions/actionTypes';

const initialState = {
  calenderData: {},
  loading: false,
  calenderError: '',
  calenderMessage: '',
  calenderStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.CALENDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.CALENDER_SUCCESS:
      return {
        ...state,
        calenderData: action.data,
        loading: false,
        calenderMessage: action.message,
        calenderStatus: true,
      };
    case userConstants.CALENDER_FAILURE:
      return {
        ...state,
        calenderError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
}
