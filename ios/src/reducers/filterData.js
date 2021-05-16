import {userConstants} from '../actions/actionTypes';

const initialState = {
  filterData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.FILTER_SUCCESS:
      return {
        ...state,
        filterData: action.user.data,
      };
      case userConstants.FILTER_CLEAR_SUCCESS:
        return {
          ...state,
          filterData: null
        }
    default:
      return state;
  }
}
