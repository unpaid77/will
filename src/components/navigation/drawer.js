import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {COOMMON_API} from '../../util/api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import OneDayPlan from '../../screens/oneDayPlan/oneDayPlan';
import {DrawerActions, CommonActions} from '@react-navigation/native';
import {
  SettingStackNavigator,
  CardStackNavigator,
  AddressStackNavigator,
  TermConditionStackNavigator,
  PrivacyPolicyStackNavigator,
  FaqSupportStackNavigator,
  ProgramsStackNavigator,
  CommonCalendarStackNavigator,
} from './stackNavigator';
import HomeScreen from '../../screens/home';
import BottomTabNavigator from './navigation';
import OneDayCalender from '../../screens/oneDayPlan/calendar';
import MultiSubs from '../../screens/multiSub/multiSubs';
import PlanList from '../../screens/multiSub/PlanList';
import PlanListProgram from '../../screens/programs/PlanListProgram';
import MultiSubCalendar from '../../screens/multiSub/multisubcalendar';
import OneDayPlanMealListing from '../../screens/oneDayPlan/onedayplanmeallisting';
import LocationPicker from '../../screens/Address/LocationPicker';
import MealSelection from '../../screens/programs/MealSelection';
import CartComponent from '../../components/CartComponent';
import MultiMealSelection from '../../screens/multiSub/MultiMealSelection';
import PaymentMethod from '../PaymentMethod';
import GetCardDetail from '../GetCardDetail';
import AddNewCard from '../AddNewCard';
import Conformation from '../Conformation';
import MyOrders from '../../screens/myOrders';
import MyOrderDetails from '../../screens/myOrderDetails';
import EmailView from '../../screens/emailView';
import {MENU_arrow_right} from '../../_helpers/ImageProvide';
import PushNotification from '../PushNotification/PushNotification';
import LogOut from '../../screens/Auth/logOut';
import paymentView from '../../screens/paymentView';
import paymentResult from '../../screens/paymentResult';
import dietcompanies from '../../screens/dietcompanies';
import addaddress from '../../screens/Address/addaddress';
import {languageRestart} from '../LanguageRestart';
import addresslist from '../../screens/Address/addresslist';
let styleCss = require('../../GlobalStyle');
const Drawer = createDrawerNavigator();

const signOut = async (props) => {
  const device_token = await AsyncStorage.getItem('device_token');
  const device_type = await AsyncStorage.getItem('device_type');
  let language = await AsyncStorage.getItem('language');
  language = 'en';
  if (language == 'ar') {
    language = 'ar';
  }
  var data = {};
  data.device_token = device_token;
  data.device_type = device_type;
  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  COOMMON_API(formBody, 'logout').then(async (responseJson) => {
    if (responseJson.success) {
      let keys = [];
      keys = await AsyncStorage.getAllKeys();
      keys.splice(keys.indexOf('device_token'), 1);
      keys.splice(keys.indexOf('device_type'), 1);
      await AsyncStorage.multiRemove(keys);
      languageRestart(true);
      props.logout;
      Toast.showWithGravity(responseJson.message, Toast.SHORT, Toast.CENTER);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Custom'}],
        }),
        DrawerActions.closeDrawer(),
      );
    } else {
      Toast.showWithGravity(responseJson.message, Toast.SHORT, Toast.CENTER);
    }
  });
};
const DrawerNavigator = (props) => {
  const [userType, setUserType] = useState();
  useEffect(() => {
    getuserType();
  });
  const getuserType = async () => {
    let tmp = await AsyncStorage.getItem('UserType');
    setUserType(tmp);
  };
  if (props.labelStatus) {
    const TPF = [
      {name: props.labelData.terms_condition, navigation: 'TermCondition'},
      {name: props.labelData.privacy_policy, navigation: 'FaqSupport'},
      {name: props.labelData.faq_support, navigation: 'PrivacyPolicy'},
    ];
    const drowerList =
      userType === 'Guest'
        ? [
            {
              lable: 'Register Now',
              image: require('../../../assets/image/menu/user.png'),
              navigation: 'Register',
            },

            {
              lable: 'Alrady have account',
              image: require('../../../assets/image/menu/logout.png'),
              navigation: 'Login',
            },
          ]
        : [
            {
              lable: props.labelData.my_profile,
              image: require('../../../assets/image/menu/user.png'),
              navigation: 'Profile',
            },
            {
              lable: props.labelData.my_orders,
              image: require('../../../assets/image/menu/myorder.png'),
              navigation: 'MyOrders',
            },
            {
              lable: props.labelData.my_add,
              image: require('../../../assets/image/menu/location.png'),
              navigation: 'Address',
            },
            {
              lable: props.labelData.my_payment_methods,
              image: require('../../../assets/image/menu/card.png'),
              navigation: 'Card',
            },
            {
              lable: props.labelData.setting,
              image: require('../../../assets/image/menu/settings.png'),
              navigation: 'Setting',
            },
            {
              lable: props.labelData.notification,
              image: require('../../../assets/image/menu/bell.png'),
              navigation: 'PushNotification',
            },
            {
              lable: props.labelData.lout_out,
              image: require('../../../assets/image/menu/logout.png'),
              navigation: 'LogOut',
            },
          ];
    const navigationAction = async (navigation) => {
      props.pathAction('Home');
      switch (navigation) {
        case 'LogOut':
          Alert.alert(
            props.labelData.lout_out,
            userType === 'Guest'
              ? 'Please register first'
              : props.labelData.do_you_want_to_logout,
            [
              {
                text: props.labelData.cancel,
                onPress: () => {
                  props.navigation.navigate('Home');
                },
              },
              {
                text: props.labelData.confirm,
                onPress: () => {
                  userType === 'Guest'
                    ? props.navigation.navigate('Register')
                    : signOut(props);
                },
              },
            ],
            {cancelable: false},
          );

        default:
          props.navigation.navigate(navigation);
      }
    };
    const drowerView = (props) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: '15%',
            ...StyleSheet.absoluteFill,
            backgroundColor: '#f2A884',
          }}>
          <View style={{flex: 3, marginVertical: 5, justifyContent: 'center'}}>
            {drowerList.map((data, index) => {
              return (
                <DrawerItem
                  key={index}
                  labelStyle={{color: 'white', fontWeight: '600'}}
                  icon={() => <Image resizeMode="cover" source={data.image} />}
                  label={data.lable}
                  onPress={() => navigationAction(data.navigation)}
                />
              );
            })}

            <View style={{marginVertical: 20}}>
              <Image
                style={{
                  width: 60,
                  height: 30,
                  marginLeft: 70,
                  marginBottom: 20,
                }}
                source={require('../../../assets/image/menu/عربي.png')}
              />
            </View>
            <View style={{marginHorizontal: 18}}>
              {TPF.map((data, index) => {
                return data.navigation === 'LogOut' ? (
                  <Text
                    key={index}
                    style={styles.footerText}
                    onPress={() => navigationAction('LogOut')}>
                    Logout
                  </Text>
                ) : (
                  <Text
                    key={index}
                    style={styles.footerText}
                    onPress={() => navigationAction(data.navigation)}>
                    {data.name}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styleCss.menuWhiteStrip}>
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              <Image
                style={{width: 35, height: 20, marginTop: 50}}
                source={MENU_arrow_right}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    return (
      <Drawer.Navigator
        drawerPosition={'right'}
        initialRouteName={'Home'}
        drawerContent={(props) => drowerView(props)}
        drawerStyle={{width: '100%'}}>
        <Drawer.Screen
          name="MealSelection"
          component={MealSelection}
          options={{swipeEnabled: false}}
        />

        <Drawer.Screen
          name="Addresslist"
          component={addresslist}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="PushNotification"
          component={PushNotification}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Conformation"
          component={Conformation}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="LocationPicker"
          component={LocationPicker}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Addaddress"
          component={addaddress}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="GetCardDetail"
          component={GetCardDetail}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="AddNewCard"
          component={AddNewCard}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="emailView"
          component={EmailView}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="CartComponent"
          component={CartComponent}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{swipeEnabled: false}}
        />

        <Drawer.Screen
          name="PlanListProgram"
          component={PlanListProgram}
          options={{swipeEnabled: false}}
        />
        {/* Start Multi sub Plan */}
        <Drawer.Screen
          name="MultiSubsCalendar"
          component={MultiSubCalendar}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="MultiSubs"
          component={MultiSubs}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="MultiSubsPlan"
          component={PlanList}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="MultiMealSelection"
          component={MultiMealSelection}
          options={{swipeEnabled: false}}
        />
        {/* End Multi sub Plan */}

        <Drawer.Screen
          name="OneMeal"
          component={OneDayPlanMealListing}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="CommonCalendar"
          component={CommonCalendarStackNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="OneCalendar"
          component={OneDayCalender}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Address"
          component={AddressStackNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="LogOut"
          component={LogOut}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingStackNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Diet"
          component={dietcompanies}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="OneDayPlan"
          component={OneDayPlan}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Card"
          component={CardStackNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Programs"
          component={ProgramsStackNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="PaymentView"
          component={paymentView}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="PaymentResult"
          component={paymentResult}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="TermCondition"
          component={TermConditionStackNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="FaqSupport"
          component={FaqSupportStackNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyStackNavigator}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="MyOrders"
          component={MyOrders}
          options={{swipeEnabled: false}}
        />
        <Drawer.Screen
          name="MyOrderDetails"
          component={MyOrderDetails}
          options={{swipeEnabled: false}}
        />
      </Drawer.Navigator>
    );
  } else return null;
};
const styles = StyleSheet.create({
  footerText: {padding: 7, color: '#ededed', fontSize: 12},
});
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
    labelStatus: state.labelReducer.labelStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pathAction: (data) => dispatch({type: 'PATH_FINDER', data}),
    logout: () => dispatch({type: 'LOGOUT'}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);
