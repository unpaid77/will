import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('window');
import {CONGRATULATION} from '../_helpers/ImageProvide';
import {CROSS} from '../_helpers/ImageProvide';

const emailView = ({navigation}) => {
  return (
    <>
      {/* <Header/> */}
      <View
        style={{
          // alignSelf: 'flex-end',
          position: 'absolute',
          right: 10,
          top: 30,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={{height: 15, width: 15}} source={CROSS}></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Text style={{fontSize: 40, fontWeight: '500'}}>
          Order Details Sent
        </Text>
      </View>
    </>
  );
};

export default emailView;
