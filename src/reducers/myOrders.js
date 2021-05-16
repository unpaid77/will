import {userConstants} from '../actions/actionTypes';

const initialState = {
  myOrdersData: {},
  myOrdersLoading: false,
  myOrdersStatus: false,
  myOrdersError: '',
  myOrdersMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.MYORDERS_REQUEST:
      return {
        ...state,
        myOrdersLoading: true,
      };
    case userConstants.MYORDERS_SUCCESS:
      return {
        ...state,
        myOrdersData: action.data.data,
        myOrdersLoading: false,
        myOrdersStatus: true,
        myOrdersMessage: action.data.message,
      };
    case userConstants.MYORDERS_FAILURE:
      return {
        ...state,
        myOrdersError: action.error.message,
        myOrdersLoading: false,
        myOrdersStatus: false,
      };
    default:
      return state;
  }
}
