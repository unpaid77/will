import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
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
import PushController from './src/components/PushNotification/PushController';
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};
const App = () => {
  useEffect(() => {
    // let fontName = 'SFPro-Regular';
    // GlobalFont.applyGlobal(fontName);
    const device_token = getUniqueId();
    const device_name = getSystemName();
    if (device_name == 'Android') {
      setDeviceValue(device_token, '1');
    } else {
      setDeviceValue(device_token, '2');
    }
  }, []);
  const setDeviceValue = async (device_token, device_type) => {
    try {
      await AsyncStorage.setItem('device_token', device_token);
      await AsyncStorage.setItem('device_type', device_type);
    } catch (e) {
      //  error
      console.error(e);
    }
  };
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <PushController />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Main'}
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
