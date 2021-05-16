import {userConstants} from '../actions/actionTypes';

const initialState = {
  mealListData: {},
  loading: false,
  mealListStatus: false,
  mealListError: '',
  mealListMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.MEAL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.MEAL_LIST_SUCCESS:
      return {
        ...state,
        mealListData: action.data,
        loading: false,
        mealListStatus: true,
        mealListMessage: action.message,
      };
    case userConstants.MEAL_LIST_FAILURE:
      return {
        ...state,
        mealListError: action.error.message,
        loading: false,
        mealListStatus: false,
      };
    default:
      return state;
  }
}
