import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Modal, Image} from 'react-native';
import {LOADER_FOOD} from '../../_helpers/ImageProvide';
const FoodLoader = () => {
  const navigation = useNavigation();
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={true}
      animationType="slide"
      onRequestClose={() => {
        navigation.navigate('Home');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image
            source={LOADER_FOOD}
            style={{
              width: 140,
              height: 140,
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
    backgroundColor: '#F2A884',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 150,
    width: 150,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default FoodLoader;
