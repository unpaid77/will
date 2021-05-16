import {userConstants} from './actionTypes';
import {USER_API} from '../util/api';
import {loginActions} from '../actions/login'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export const otpActions = {
  otpUserAction,
};

function otpUserAction(data, navigation, params) {
  // const navigation = useNavigation();
  console.log("registerPArams", params)
  let param = params != undefined || null ? {
    nextScreen: params.prevScreen ?  params.prevScreen : null,
    paymentUrl: params.paymentUrl ? params.paymentUrl: null
  } : null;
  return (dispatch) => {
    dispatch(request());
    USER_API(data, 'user/otp-verification').then(
      (data) => {
        if (data.success) {
          dispatch(success(data));
          console.log(params != undefined || null ? 'params.nextScreen' : 'Login')
          if(params != undefined || null){
            AsyncStorage.setItem('verify', 'User')
          }
          // navigation.navigate(params != undefined || null ? params.nextScreen : 'Login', {
          //   screen: params != undefined || null ? 'Drawer' : 'Main',
          //   paymentUrl: params != undefined || null ? params.paymentUrl : null,
          // });
          navigation.navigate(params != undefined || null ? 'Drawer' : 'Main' , {
            screen: params != undefined || null ? params.nextScreen : 'Login', params: { 
              paymentUrl: params != undefined || null ? params.paymentUrl : null
            } 
          });
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
    return {type: userConstants.VERIFY_OTP_REQUEST};
  }
  function clear() {
    return {type: userConstants.CLEAR};
  }
  function success(user) {
    return {type: userConstants.VERIFY_OTP_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.VERIFY_OTP_FAILURE, error};
  }
}
