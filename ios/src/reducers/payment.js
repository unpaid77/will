import {userConstants} from '../actions/actionTypes';

const initialState = {
  paymentData: {},
  paymentLoading: false,
  paymentStatus: false,
  paymentError: '',
  paymentMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.PAYMENT_INITIATION_REQUEST:
      return {
        ...state,
        paymentLoading: true,
      };
    case userConstants.PAYMENT_INITIATION_SUCCESS:
      return {
        ...state,
        paymentData: action.data.data,
        paymentLoading: false,
        paymentStatus: true,
        paymentMessage: action.data.message,
      };
    case userConstants.PAYMENT_INITIATION_FAILURE:
      return {
        ...state,
        paymentError: action.error.message,
        paymentLoading: false,
        paymentStatus: false,
      };
    default:
      return state;
  }
}
