/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {act} from 'react-test-renderer';
import {userConstants} from '../actions/actionTypes';

const initialState = {
  program_id: '',
  features_id: '',
  restaurant_id: '',
  selectedDate: '',
  cartAdd: [],
  listOfItems: 0,
  selectedPlan: {},
  imageUrl: '',
  programName: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.CART_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.data,
      };
    case userConstants.CART_LIST_OF_ITEM:
      return {
        ...state,
        listOfItems: action.data,
      };
    case userConstants.CART_SELECTED_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.data,
      };

    case userConstants.CART_SELECTED_PROGRAM_NAME:
      return {
        ...state,
        programName: action.data,
      };
    case userConstants.CART_SELECTED_PLAN:
      return {
        ...state,
        selectedPlan: action.data,
      };
    case userConstants.CART_RESTAURANT_ID:
      return {
        ...state,
        restaurant_id: action.data,
      };
    case userConstants.CART_PROGRAM_ID:
      return {
        ...state,
        program_id: action.data,
      };
    case userConstants.CART_FEATURES_ID:
      return {
        ...state,
        features_id: action.data,
      };
    case userConstants.CART_ADD:
      return {
        ...state,
        cartAdd: [...state.cartAdd, action.data],
      };
    case userConstants.CART_DELETE:
      state.cartAdd.splice(action.data, 1);
      return {
        ...state,
        cartAdd: [...state.cartAdd],
      };
    default:
      return state;
  }
}
