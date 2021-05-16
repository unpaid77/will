/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {userConstants} from '../actions/actionTypes';

const initialState = {
  labelData: {},
  loading: false,
  labelError: '',
  labelMessage: '',
  labelStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.LABEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LABEL_SUCCESS:
      return {
        ...state,
        labelData: action.data,
        loading: false,
        labelError: '',
        labelMessage: action.message,
        labelStatus: true,
      };
    case userConstants.LABEL_FAILURE:
      return {
        ...state,
        labelError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
}
