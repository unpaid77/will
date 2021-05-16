import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {LOGO} from '../../_helpers/ImageProvide';
import {connect} from 'react-redux';
const NotificationMessage = (props) => {
  const navigation = useNavigation();
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={true}
      animationType="slide"
      onRequestClose={() => {
        console.log('close modal');
        navigation.navigate('Home');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image
            source={LOGO}
            style={{
              width: 60,
              height: 50,
              marginTop: 5,
              marginRight: 5,
            }}
          />
          <Text>HI</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PushNotification');
            }}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(242, 174, 136,0.1)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
    notificationLOader: state.notificationReducer.notificationLoader,
    NotificationMessage: state.notificationReducer.newNotificationMessage,
  };
};

export default connect(mapStateToProps, null)(NotificationMessage);
