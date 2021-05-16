import {userConstants} from '../actions/actionTypes';

const initialState = {
  cardData: {},
  loading: false,
  cardError: '',
  cardMessage: '',
  cardStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.CARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.CARD_SUCCESS:
      return {
        ...state,
        cardData: action.user.data,
        loading: false,
        cardMessage: action.user.message,
        cardStatus: true,
      };
    case userConstants.CARD_FAILURE:
      return {
        ...state,
        cardError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
}
