import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/Auth/login';
import OtpScreen from '../../screens/otp';
import ForgotOtpScreen from '../../screens/forgototp';
import ForgotScreen from '../../screens/forgot';
import RegisterScreen from '../../screens/register';
import HomeScreen from '../../screens/home';
import EmailScreen from '../../screens/email';
import Profile from '../../screens/Profile';
import Favourite from '../../screens/Favourite';
import Offers from '../PushNotification/Offers';
import Subscription from '../../screens/Subscription';
import ProfileEdit from '../../screens/ProfileEdit';
import Setting from '../../screens/Setting';
import Changepassword from '../../screens/changepassword';
import Changeotp from '../../screens/changeotp';
import Changeemail from '../../screens/changeemail';
import Spalsh from '../../screens/anim-screen/index';
import MyPaymentMethod from '../../screens/myPaymentMethod';
import Dietcompanies from '../../screens/dietcompanies';
import Addresslist from '../../screens/Address/addresslist';
import Addaddress from '../../screens/Address/addaddress';
import Editaddress from '../../screens/Address/editaddress';
import OneDayPlan from '../../screens/oneDayPlan/oneDayPlan';
import PaymentView from '../../screens/paymentView';
import PaymentResult from '../../screens/paymentResult';
import MyOrders from '../../screens/myOrders';
import MyOrderDetails from '../../screens/myOrderDetails';
import EmailView from '../../screens/emailView';

import TermCondition from '../../screens/termCondition';
import PrivacyPolicy from '../../screens/privacyPolicy';
import FaqSupport from '../../screens/faqSupport';
import CommonCalendar from '../CommonCalendar';
import CartComponent from '../CartComponent';
import ProgramsComponent from '../../screens/programs/Programs';
import UpdatePassword from '../../screens/UpdatePassword';
const Stack = createStackNavigator();
const screenOptionStyle = {
  cardStyle: {backgroundColor: '#fff', color: '#f2A884'},
  headerShown: false,
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={screenOptionStyle}
      mode="Splash">
      <Stack.Screen name="Splash" component={Spalsh} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="ForgotOtp" component={ForgotOtpScreen} />
    </Stack.Navigator>
  );
};
const CustomStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="ForgotOtp" component={ForgotOtpScreen} />
    </Stack.Navigator>
  );
};
const ContactStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Diet" component={Dietcompanies} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
    </Stack.Navigator>
  );
};

const FavouriteStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Favourite" component={Favourite} />
    </Stack.Navigator>
  );
};

const OffersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Offers" component={Offers} />
    </Stack.Navigator>
  );
};
const SubscriptionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Subscription" component={Subscription} />
    </Stack.Navigator>
  );
};
const SettingStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Setting'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Changepassword" component={Changepassword} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      <Stack.Screen name="Changeotp" component={Changeotp} />
      <Stack.Screen name="Changeemail" component={Changeemail} />
    </Stack.Navigator>
  );
};
const CardStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Cardlisting'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Cardlisting" component={MyPaymentMethod} />
    </Stack.Navigator>
  );
};
const AddressStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Addresslist'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Addresslist" component={Addresslist} />
      <Stack.Screen name="Addaddress" component={Addaddress} />
      <Stack.Screen name="Editaddress" component={Editaddress} />
    </Stack.Navigator>
  );
};
const FaqSupportStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'FaqSupport'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="FaqSupport" component={FaqSupport} />
    </Stack.Navigator>
  );
};
const PrivacyPolicyStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'PrivacyPolicy'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

const TermConditionStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'TermCondition'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="TermCondition" component={TermCondition} />
    </Stack.Navigator>
  );
};

const CartStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'CartComponent'}
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="CartComponent" component={CartComponent} />
      <Stack.Screen name="PaymentView" component={PaymentView} />
      <Stack.Screen name="PaymentResult" component={PaymentResult} />
    </Stack.Navigator>
  );
};

const ProgramsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName={'Programs'}>
      <Stack.Screen name="Programs" component={ProgramsComponent} />
    </Stack.Navigator>
  );
};

const CommonCalendarStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} mode="Splash">
      <Stack.Screen name="CommonCalendar" component={CommonCalendar} />
    </Stack.Navigator>
  );
};

const MyOrdersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="MyOrderDetails" component={MyOrderDetails} />
    </Stack.Navigator>
  );
};

const EmailExportStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="emailView" component={EmailView} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  ProgramsStackNavigator,
  CustomStackNavigator,
  ContactStackNavigator,
  ProfileStackNavigator,
  FavouriteStackNavigator,
  OffersStackNavigator,
  SubscriptionStackNavigator,
  SettingStackNavigator,
  CardStackNavigator,
  AddressStackNavigator,
  FaqSupportStackNavigator,
  TermConditionStackNavigator,
  PrivacyPolicyStackNavigator,
  CartStackNavigator,
  CommonCalendarStackNavigator,
  MyOrdersStackNavigator,
  EmailExportStackNavigator,
};
