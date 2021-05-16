import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Modal, Image, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {notificationActions} from '../../actions/notification';
import {LOGO, CROSS} from '../../_helpers/ImageProvide';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect} from 'react';
const NotificationMessage = (props) => {
  console.log('messager', props.newNotificationMessage);
  const [message, setMessage] = useState({
    data: {notification_type: '', title: ''},
    from: '',
    messageId: '',
    sentTime: null,
    ttl: null,
  });
  useEffect(() => {
    setMessage(
      props.newNotificationMessage && props.newNotificationMessage.data,
    );
  }, []);
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        console.log({backgroundColor: 'SWIPE_UP'});
        break;
      case SWIPE_DOWN:
        console.log({backgroundColor: 'SWIPE_DOWN'});
        break;
      case SWIPE_LEFT:
        console.log({backgroundColor: 'SWIPE_LEFT'});
        break;
      case SWIPE_RIGHT:
        console.log({backgroundColor: 'SWIPE_RIGHT'});
        break;
      default:
        console.log('default');
    }
  };
  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
      config={config}>
      <Modal
        transparent={true}
        animationType={'none'}
        visible={props.notificationLoader}
        animationType="fade"
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            console.log('touched');
          }}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={LOGO}
              style={{
                width: 60,
                height: 50,
              }}
            />
          </View>
          <View style={styles.activityIndicatorWrapper}>
            {/* <Text>{message.data.title}</Text> */}
          </View>
          <View style={styles.activityIndicatorWrapper}>
            <TouchableOpacity
              onPress={() => {
                props.newNotifiaction({
                  data: {
                    data: {notification_type: '', title: ''},
                    from: '',
                    messageId: '',
                    sentTime: null,
                    ttl: null,
                  },
                  show: false,
                });
              }}>
              <Image source={CROSS} style={{height: 15, weight: 15}} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    margin: 5,
    height: 100,
  },
  modalBackground: {
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    justifyContent: 'space-around',
  },
});

const mapStateToProps = (state) => {
  return {
    notificationLoader: state.notificationReducer.notificationLoader,
    newNotificationMessage: state.notificationReducer.newNotificationMessage,
  };
};

const reduxActions = {
  newNotifiaction: notificationActions.newNotifiaction,
};
export default connect(mapStateToProps, reduxActions)(NotificationMessage);
