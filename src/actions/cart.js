/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {userConstants} from './actionTypes';
import {GET_MY_CART} from '../util/api';

export const cartActions = {
  cartDeleteAction,
  selectedImageUrl,
  cartToDataBase,
  cartAddAction,
  restaurantId,
  selectedDate,
  selectedPlan,
  programId,
  featuresId,
  programName,
  ListOfItems,
};
function ListOfItems() {
  return (dispatch) => {
    GET_MY_CART(`user/myCart`).then((data) => {
      if (data) {
        if (data.success) {
          if (Array.isArray(data)) {
            dispatch(success(data.data.length));
          } else {
            dispatch(success(1));
          }
        } else dispatch(success(0));
      } else dispatch(success(0));
    });
  };
  function success(data) {
    return {type: userConstants.CART_LIST_OF_ITEM, data};
  }
}
function programName(data) {
  return {type: userConstants.CART_SELECTED_PROGRAM_NAME, data};
}
function selectedPlan(data) {
  return {type: userConstants.CART_SELECTED_PLAN, data};
}
function selectedDate(data) {
  return {type: userConstants.CART_SELECTED_DATE, data};
}
function selectedImageUrl(data) {
  return {
    type: userConstants.CART_SELECTED_IMAGE_URL,
    data,
  };
}
function restaurantId(data) {
  return {type: userConstants.CART_RESTAURANT_ID, data};
}

function programId(data) {
  return {type: userConstants.CART_PROGRAM_ID, data};
}

function featuresId(data) {
  return {type: userConstants.CART_FEATURES_ID, data};
}

function cartDeleteAction(data) {
  return {type: userConstants.CART_DELETE, data};
}

function cartAddAction(data) {
  return {type: userConstants.CART_ADD, data};
}

function cartToDataBase() {
  return {type: userConstants.CART_TO_DB};
}
