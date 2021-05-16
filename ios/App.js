import React, {useEffect, useState} from 'react';
import {StatusBar, LogBox, Platform, PlatformColor, Appearance} from 'react-native';
import {store} from './src/store/index';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {
  MainStackNavigator,
  CustomStackNavigator,
} from './src/components/navigation/stackNavigator';
import DrawerNavigator from './src/components/navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {getUniqueId, getSystemName} from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import GlobalFont from 'react-native-global-font';
import messaging from '@react-native-firebase/messaging';
import {navigate, setNavigator} from './src/screens/navigationHelper';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
const Stack = createStackNavigator();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const screenOptionStyle = {
  headerShown: false,
};
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(async () => {
    let isLogged = null
    try {
      const verify = await AsyncStorage.getItem('verify');
      const token = await AsyncStorage.getItem('token');
      if ( token
        // verify === 'User' &&
        // (token != null || token != '' || token != undefined)
      ) {
        console.log("+++++++++++++++++++++++++++++++++++++")
        isLogged = true
      } else if (token === null )
      {
        console.log("-------------------------------------")
        isLogged = false
      }
    } catch (e) {
      console.error(e);
    }
    console.log(isLogged)
    return isLogged
  })
  const [internetConnection, setInternetConnection] = useState(true)
  useEffect(() => {
    // NetInfo.addEventListener(state => {
    //   console.log("Connection type!!", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   setInternetConnection(state.isConnected)
    // });
    getNetworkAccess()
    let fontName = Platform.OS == 'android' ? 'SFPro-Regular' : 'Helvetica';
    GlobalFont.applyGlobal(fontName);
    const device_token = getUniqueId();
    // const device_name = getSystemName();
    // if (device_name == 'Android') {
    //   setDeviceValue(device_token, '1');
    // } else {
    //   console.log(device_token)
    //   setDeviceValue(device_token, '2');
    // }
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
    getNotificationData();

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data,
      );
      let verify = AsyncStorage.getItem('verify');
      if(verify === 'User') {
        console.log("Hey......i'm going to navigate")
      navigate({ name: 'Offers' });
      }
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage.data.notificationType);
      
    });
    
    messaging()
      .getToken()
      .then(device_token => {
        AsyncStorage.setItem('device_token', device_token);
        const device_name = getSystemName();
    if (device_name == 'Android') {
      setDeviceValue(device_token, '1');
    } else {
      setDeviceValue(device_token, '2');
    }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          
        }
      });

    // return unsubscribe;
  }, []);

  const getNetworkAccess = () => {
    NetInfo.fetch().then(state => {
      console.log("Is connected?", state.isConnected);
      if(state.isConnected == 'false'){
        Toast.showWithGravity("Please check your internet connection", Toast.SHORT, Toast.CENTER);
      }
      setInternetConnection(state.isConnected)
    });
  }
  const getNotificationData = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken() //<---- Add this
      }
  };

  getFcmToken = async () => {
    console.log("=============getFcmToken==========")
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
     console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }
  const setDeviceValue = async (device_token, device_type) => {
    try {
      await AsyncStorage.setItem('device_token', device_token);
      await AsyncStorage.setItem('device_type', device_type);
    } catch (e) {
      //  errorr
      console.error(e);
    }
  };
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" networkActivityIndicatorVisible />
      <NavigationContainer 
      ref={(navigator) => {
            setNavigator(navigator);
          }}>
        <Stack.Navigator
          initialRouteName={"Main"}
          screenOptions={screenOptionStyle}>
            <Stack.Screen name="Main" component={MainStackNavigator} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="Custom" component={CustomStackNavigator} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
