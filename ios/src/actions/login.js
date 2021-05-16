import {userConstants} from './actionTypes';
import {USER_API} from '../util/api';
import AsyncStorage from '@react-native-community/async-storage';
export const loginActions = {
  loginUserAction,
  logOutAction,
};
function logOutAction() {
  return {type: userConstants.LOGOUT_REQUEST};
}
const commonAction = (data, navigation, params) => {
  console.log("params",params)
  params = null;
  AsyncStorage.setItem(
    'AllowLocation',
    JSON.stringify(data.userdetails.is_location_allow),
  );
  AsyncStorage.setItem(
    'Notification',
    JSON.stringify(data.userdetails.is_receive_notification),
  );
  AsyncStorage.setItem(
    'ReceiveOffer',
    JSON.stringify(data.userdetails.is_receive_special_offer),
  );
  AsyncStorage.setItem('token', data.authorization_token);
  AsyncStorage.setItem('email', data.userdetails.email);
  AsyncStorage.setItem('verify', data.is_verified === 1 ? "User" : "Guest");
  // AsyncStorage.setItem('verified', data.is_verified === 1 ? "User" : "Guest");
  AsyncStorage.setItem('User_id', data.userdetails.id.toString());
  console.log("=====================================")
  navigation.navigate(params != undefined || null ? params.nextScreen : 'Drawer', {
    paymentUrl: params != undefined || null ? params.paymentUrl : null,
  });
  console.log("=====================================")
};

function loginUserAction(data, navigation, params) {
  return async (dispatch) => {
    dispatch(request());
    let userType = await AsyncStorage.getItem('UserType');
    let verify = await AsyncStorage.getItem('verify');
    let userTypes = data.device_token;
    console.log(params)
    // let path = parseInt(data.device_type) === 1 ? 'login' : 'guest/login';
    let path = userTypes === 'Guest' ? 'guest/login' : 'login';
      console.log("////////////////|||||||||||||||||||")
      if(userTypes != 'Guest' && userType === 'Guest') {
      path = 'loginwithcredential';
      console.log(path)
      data = {...data, guest_id: await AsyncStorage.getItem('User_id')};
      console.log(data)
    }
    console.log(path)
    // console.log("login.js verify", device_token)
    // AsyncStorage.setItem(
    //   'UserType',
    //   userTypes === 'Guest' ? 'Guest' : 'User'
    // );
    USER_API(data, path).then(
      (data) => {
        if (data.success) {
          if (data.data.is_verified == 1) {
            console.log(data.data)
            dispatch(success(data));
            AsyncStorage.setItem('verify', data.is_verified === 1 ? "User" : "Guest");
            AsyncStorage.setItem( 'UserType', data.is_verified === 1 ? "User" : "Guest");
            commonAction(data.data, navigation, params);
          }
          if (data.data.is_verified == 0) { //never gets hit because condition is wrong for checking guest
            console.log(data.data)
            dispatch(success_verify(data));
            // console.log("login.js USER_API =>", data.data)
            const id = data.data.userdetails.id;
            const length = data.data.userdetails.email.indexOf('@');
            const email = data.data.userdetails.email.slice(
              length - 2,
              length + 3,
              );
            AsyncStorage.setItem('userid', id.toString());
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('verify', data.data.userdetails.is_verified ? "User" : "Guest");
            AsyncStorage.setItem( 'UserType', data.data.userdetails.is_verified === 1 ? "User" : "Guest");
            navigation.navigate('Otp');
          } else {
            dispatch(success(data));
            console.log("============================")
            console.log(data.data.userdetails.is_verified)
            AsyncStorage.setItem('verify', data.data.userdetails.is_verified === 1 ? "User" : "Guest");
            AsyncStorage.setItem( 'UserType', data.data.userdetails.is_verified === 1 ? "User" : "Guest");
            commonAction(data.data, navigation, params);
          }
        } else {
          dispatch(failure(data));
        }
        dispatch(clear());
      },
      (error) => {
        dispatch(failure(error));
        dispatch(clear());
      },
    );
  };

  function request() {
    return {type: userConstants.LOGIN_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(user) {
    return {type: userConstants.LOGIN_SUCCESS, user};
  }
  function success_verify(user) {
    return {type: userConstants.LOGIN_SUCCESS_VERIFY, user};
  }
  function failure(error) {
    return {type: userConstants.LOGIN_FAILURE, error};
  }
}
