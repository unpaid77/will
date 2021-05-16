import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import * as types from '../actions/actionTypes';
import oneDayMealListReducer from './OneDayMealList';
import registrationReducer from './registration';
import addresslistReducer from './addresslist';
import emailExportReducer from './emailExport';
import editaddressReducer from './editaddress';
import programPlanReduce from './programPlan';
import addresssetReducer from './addressset';
import addaddressReducer from './addaddress';
import forgototpReducer from './forgototp';
import onedayplanReducer from './oneplan';
import calenderReducer from './Calender';
import multiSubReducer from './MultiSub';
import mealListReducer from './MealList';
import programReducer from './programs';
import profileReducer from './profile';
import forgotReducer from './forgot';
import loginReducer from './login';
import labelReducer from './label';
import emailReducer from './email';
import cardReducer from './card';
import cartReducer from './cart';
import homeReducer from './home';
import otpReducer from './otp';
import commonReducer from './common';
import paymentReducer from './payment';
import myOrdersReducer from './myOrders';
import emailExportReducer from './emailExport';

const AppReducer = combineReducers({
  registrationReducer: registrationReducer,
  oneDayMealListReducer: oneDayMealListReducer,
  editaddressReducer: editaddressReducer,
  addresslistReducer: addresslistReducer,
  addresslistReducer: addresslistReducer,
  emailExportReducer: emailExportReducer,
  addresssetReducer: addresssetReducer,
  addaddressReducer: addaddressReducer,
  onedayplanReducer: onedayplanReducer,
  forgototpReducer: forgototpReducer,
  calenderReducer: calenderReducer,
  multiSubReducer: multiSubReducer,
  mealListReducer: mealListReducer,
  profileReducer: profileReducer,
  programReducer: programReducer,
  forgotReducer: forgotReducer,
  labelReducer: labelReducer,
  emailReducer: emailReducer,
  loginReducer: loginReducer,
  homeReducer: homeReducer,
  cardReducer: cardReducer,
  cartReducer: cartReducer,
  otpReducer: otpReducer,
  commonReducer: commonReducer,
  programPlanReduce: programPlanReduce,
  paymentReducer: paymentReducer,
  myOrdersReducer: myOrdersReducer,
  emailExportReducer: emailExportReducer,
});

// Clean state when user logs out
export const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = undefined;
    AsyncStorage.removeItem('persist:root');
  }

  return AppReducer(state, action);
};
export default rootReducer;
