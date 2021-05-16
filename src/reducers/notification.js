import {userConstants} from '../actions/actionTypes';

const initialState = {
  notificationData: {},
  active_notification: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.NOTIFICATION_REQUEST:
      return {
        ...state,
        status: true,
      };
    case userConstants.NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationData: action.data,
        notificationStatus: true,
      };
    case userConstants.NOTIFICATION_FAILURE:
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
}
