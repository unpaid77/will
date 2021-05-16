import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Toggle from '../components/Toggle';
import AsyncStorage from '@react-native-community/async-storage';
let styleCss = require('../GlobalStyle');
import {profileActions} from '../actions/profile';
import {addressListActions} from '../actions/addresslist';
import {labelActions} from '../actions/label';
import {Switch, TouchableOpacity} from 'react-native-gesture-handler';
import Headers from '../components/Header/Header';
import {languageRestart} from '../components/LanguageRestart';
import {commonAction} from '../actions/common';
import Loader from '../components/Loader/Loader';
import {ADD_AND_UPDATE_API} from '../util/api';
import {CROSS} from '../_helpers/ImageProvide';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
const Setting = (props) => {
  const navigation = useNavigation();
  const [LocalLanguage, setLocalLanguage] = useState('');
  const [AllowLocation, setAllowLocation] = useState(null);
  const [Notification, setNotification] = useState(null);
  const [ReceiveOffer, setReceiveOffer] = useState(null);

  async function getReceiveOffer () {
    try{
    const receiveOffer = await AsyncStorage.getItem('ReceiveOffer')
    setReceiveOffer(parseInt(receiveOffer))
    return receiveOffer;
    } 
    catch(e) {
      console.log(e)
    }
  }
  async function getNotification () {
    try{
    const notification = await AsyncStorage.getItem('Notification')
    setNotification(parseInt(notification))
    return notification;
    } 
    catch(e) {
      console.log(e)
    }
  }
  async function getAllowLocation () {
    try{
    const allowLocation = await AsyncStorage.getItem('AllowLocation')
    setAllowLocation(parseInt(allowLocation))
    return allowLocation;
    } 
    catch(e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    getValue();
    getAllowLocation();
    getNotification();
    getReceiveOffer();
  }, []);

//   const getFcmToken = async () => {

//     console.log("=============getFcmToken==========")
//     const fcmToken = await messaging().getToken();
  
//     if (fcmToken) {
//      console.log("Your Firebase Token is:", fcmToken);
//     } else {
//      console.log("Failed", "No token received");
//     }
//   }
//   const getNotificationData = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//       getFcmToken() //<---- Add this
//     } else{
//       console.log("++++++++++=====", enabled)
//     }
//   // }
// };


  const getValue = async () => {
    try {
      props.addressListAction();
      setLocalLanguage(await AsyncStorage.getItem('language'));
      setAllowLocation(parseInt(await AsyncStorage.getItem('AllowLocation')));
      setNotification(parseInt(await AsyncStorage.getItem('Notification')));
      setReceiveOffer(parseInt(await AsyncStorage.getItem('ReceiveOffer')));
    } catch (e) {
      console.error(e);
    }
  };

  const changeWithToggle = (bool) => {
    languageChange(bool)
  } 

  const languageChange = (isOn) => {
    console.log(isOn)
    AsyncStorage.setItem('language', isOn ? 'en' : 'ar');
    props.labelAction();
    languageRestart(isOn);
    setLocalLanguage(isOn ? 'en' : 'ar');
  };
  if (props.settingStatus && props.labelStatus && props.addressStatus) {
    const length = props.settingData.email.indexOf('@');
    const email_1 = props.settingData.email.slice(0, length - 2);
    const email_2 = props.settingData.email.slice(length + 3);
    const email = email_1 + '**@**' + email_2;
    const langChange = props.labelData;
    
    const api_Update = (data) => {
      ADD_AND_UPDATE_API(data, 'update-status').then((data) => {
        if (data.success) {
          if(data.data.is_receive_notification == 1){
            messaging().unregisterDeviceForRemoteMessages()
          }
          if(data.data.is_receive_notification == 0){
            messaging().registerDeviceForRemoteMessages()
            getNotificationData()
          }
          AsyncStorage.setItem(
            'AllowLocation',
            JSON.stringify(data.data.is_location_allow),
          );
          AsyncStorage.setItem(
            'Notification',
            JSON.stringify(data.data.is_receive_notification),
          );
          AsyncStorage.setItem(
            'ReceiveOffer',
            data.data.is_receive_special_offer == 1 ? "true" : "false",
          );
        }
      });
    };
    return (
      <>
        <Headers />
        <View style={styleCss.mainContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 22, fontWeight: '700', marginVertical: 20}}>
              {langChange.setting}
            </Text>
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image style={{height: 15, width: 15}} source={CROSS} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.setTextLight}>{langChange.lang}</Text>
                <Text style={styles.setTextDark}>
                  {LocalLanguage == 'en' ? 'English' : 'عربى'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  languageChange(LocalLanguage == 'en' ? false : true)
                }>
                <Toggle booleanValue={LocalLanguage == 'en' ? false : true} changeLanguage={changeWithToggle} />
                {/* <ToggleSwitch
                  isOn={LocalLanguage == 'en' ? true : false}
                  onColor="#f2A884"
                  offColor="#d0d0d2"
                  size="small"
                  onToggle={(isOn) => languageChange(isOn)}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.setTextLight}>{langChange.email}</Text>
              <Text style={styles.setTextDark}>{email}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Changeemail')}>
                <Text style={styles.setGreenText}>
                  {props.labelData.change}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.setTextLight}>{langChange.pass}</Text>
              <Text style={styles.setTextDark}>
                {props.settingData.password}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('UpdatePassword')}>
                <Text style={styles.setGreenText}>
                  {props.labelData.change}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.setTextLight}>
                {props.labelData.location}
              </Text>
              {props.addressData.length == 0 ? (
                <Text>Please add new address</Text>
              ) : (
                props.addressData.map((item, key) => {
                  return item.is_default_address ? (
                    <Text style={styles.setTextDark} key={key}>
                      {item.area.substring(0, 30)}
                    </Text>
                  ) : null;
                })
              )}
            </View>
            <View>
              <TouchableOpacity
                style={styles.setGreenText}
                onPress={() => {
                  props.pathAction('Setting');
                  props.navigation.navigate('Address');
                }}>
                <Text>{props.labelData.edit}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.setTextLight}>
                {props.labelData.receive_notification}
              </Text>
              <Text style={styles.setTextDark}>
                {Notification
                  ? props.labelData.enabled
                  : props.labelData.disabled}
              </Text>
            </View>
            <Switch
              trackColor={{false: '#d0d0d2', true: '#f2A884'}}
              thumbColor={'#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                api_Update({status_type: 1, status: Notification ? 1 : 0});
                setNotification(!Notification);
              }}
              value={Notification ? true : false}
            />
          </View>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.setTextLight}>
                {langChange.alow_location}
              </Text>
              <Text style={styles.setTextDark}>
                {AllowLocation
                  ? props.labelData.enabled
                  : props.labelData.disabled}
              </Text>
            </View>

            <Switch
              trackColor={{false: '#d0d0d2', true: '#f2A884'}}
              thumbColor={'#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                api_Update({status_type: 2, status: AllowLocation ? 1 : 0});
                setAllowLocation(!AllowLocation);
              }}
              value={AllowLocation ? true : false}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.setTextLight}>
                {langChange.receive_specail_offers}
              </Text>
              <Text style={styles.setTextDark}>
                {ReceiveOffer
                  ? props.labelData.enabled
                  : props.labelData.disabled}
              </Text>
            </View>
            <Switch
              trackColor={{false: '#d0d0d2', true: '#f2A884'}}
              thumbColor={'#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                api_Update({status_type: 3, status: ReceiveOffer ? 0 : 1});
                setReceiveOffer(!ReceiveOffer);
              }}
              value={ReceiveOffer ? true : false}
            />
          </View>
        </View>
      </>
    );
  } else {
    return <Loader />;
  }
};

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  setTextLight: {
    color: '#b8b7ba',
    fontSize: 15,
  },
  setTextDark: {
    color: '#000',
    fontSize: 15,
    alignSelf: 'flex-start',
  },

  setGreenText: {
    color: '#65c986',
    fontWeight: '700',
    fontSize: 14,
  },
});
const mapStateToProps = (state) => {
  return {
    settingError: state.profileReducer.profileError,
    settingMessage: state.profileReducer.profileMessage,
    settingData: state.profileReducer.profileData,
    settingStatus: state.profileReducer.profileStatus,
    labelData: state.labelReducer.labelData,
    addressData: state.addresslistReducer.addressData,
    addressStatus: state.addresslistReducer.addressStatus,
    labelStatus: state.labelReducer.labelStatus,
    userdata: state.loginReducer.userData,
  };
};
const actionCreators = {
  profileAction: profileActions.profileUserAction,
  labelAction: labelActions.labelAction,
  addressListAction: addressListActions.addressListAction,
  pathAction: commonAction.pathFinder,
};
export default connect(mapStateToProps, actionCreators)(Setting);
