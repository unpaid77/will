import React, {Component} from 'react';
var PushNotification = require('react-native-push-notification');
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {notificationActions} from '../../actions/notification';
import {navigate} from '../../screens/navigationHelper'
class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: '',
    };
  }
  componentDidMount() {
    messaging().onMessage(async (remoteMessage) => {
      this.props.newNotifiaction({data: remoteMessage, show: true});
      this.setState({notification: remoteMessage});
      console.log('Notification 1 ---------------', remoteMessage);
      let notification_type = remoteMessage.data.notification_type
      let notification_title = notification_type === "8" || "9" ? "Offers" : notification_type === "5" || "6" || "7" ? "Subscription" : null;

      Alert.alert(
        notification_title === "Offers" ? 'A new coupon has arrived' : notification_title === "Offers" ? 'Track your order': '',
        JSON.stringify(remoteMessage.data.body),
        [
          {
            text: 'Ask me later',
            onPress: () => console.log('Ask me later pressed'),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Show',
            onPress: () => {
              console.log('OK Pressed', this.props);
              this.props.navigation.navigate("drawer", {screen:"notification_title"});
              // RootNavigation.navigate('PushNotification');
              // this.props.navigation.navigate('PushNotification');
            },
          },
        ],
        {cancelable: false},
      );
      // PushNotification.popInitialNotification((notification) => {
      //   console.log(
      //     'Initial Notification popInitialNotification Notification 2 ---------------',
      //     notification,
      //   );
      // });

      PushNotification.localNotification({
        date: new Date(Date.now() + 60 * 1000),
        allowWhileIdle: true,
        autoCancel: true,
        bigText: remoteMessage.data.title,
        title: remoteMessage.data.title,
        message: remoteMessage.data.title,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        onOpen: () => navigate({name: 'PushNotification'}),
      });
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: async function (notification) {
        console.log(
          'NOTIFICATION onNotification: Notification 3 ---------------',
          notification.data.title,
        );
        let notification_type = await notification.data.notification_type;
        if(notification_type === "8" || "9" ){
          console.log("Received coupon");
        navigate({ name: 'Offers' });
        } else if(notification_type === "5" || "6" || "7"){
          console.log("Received order");
          navigate({ name: 'Subscription' });
        }
        PushNotification.localNotification({
          date: new Date(Date.now() + 60 * 1000), // in 60 secs
          allowWhileIdle: true,
          autoCancel: true,
          bigText: notification.data.title,
          title: notification.data.title,
          message: notification.data.title,
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default',
          popInitialNotification: true,
          requestPermissions: true,
          foreground: false,
          userInteraction: false,
        });
      },
      onAction: function (notification) {
        console.log(
          'NOTIFICATION onAction :Notification 4 ---------------',
          notification,
        );
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      senderID: '634363505435',
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
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};

const reduxActions = {
  newNotifiaction: notificationActions.newNotifiaction,
};
export default connect(mapStateToProps, reduxActions)(PushController);
