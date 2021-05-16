import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Modal, Image} from 'react-native';
import {LOGO} from '../../_helpers/ImageProvide';
const Loader = () => {
  const navigation = useNavigation();
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={true}
      animationType="slide"
      onRequestClose={() => {
        console.log('close modal');
        // navigation.navigate('Home');
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

export default Loader;

// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';
// export default Loader = () => {
//   return (
//     <View style={styles.container}>
//       <Spinner
//         visible={true}
//         textContent={'Loading...'}
//         textStyle={styles.spinnerTextStyle}
//         overlayColor="rgba(0, 0, 0, 0.1)"
//         animation="fade"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   spinnerTextStyle: {
//     color: '#fff',
//   },
// });
