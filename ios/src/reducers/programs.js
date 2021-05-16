import {userConstants} from '../actions/actionTypes';

const initialState = {
  programData: {},
  programLoading: false,
  programStatus: false,
  programError: '',
  programMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.PROGRAMS_REQUEST:
      return {
        ...state,
        programLoading: true,
      };
    case userConstants.PROGRAMS_SUCCESS:
      return {
        ...state,
        programData: action.data.data,
        programLoading: false,
        programStatus: true,
        programMessage: action.data.message,
      };
    case userConstants.PROGRAMS_FAILURE:
      return {
        ...state,
        programError: action.error.message,
        programLoading: false,
        programStatus: false,
      };
    default:
      return state;
  }
}
