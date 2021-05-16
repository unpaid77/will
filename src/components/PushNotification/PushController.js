import React, {Component} from 'react';
var PushNotification = require('react-native-push-notification');
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
export default class PushController extends Component {
  componentDidMount() {
    messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.popInitialNotification((notification) => {
        console.log('Initial Notification', notification);
      });
      PushNotification.localNotification({
        message: 'My Notification Message', // (required)
        date: new Date(Date.now() + 60 * 1000), // in 60 secs
        allowWhileIdle: false,
      });
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification here

        // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      // Android only
      senderID: '634363505435',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  render() {
    return null;
  }
}
