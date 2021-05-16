import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header/Header';
import SubHeader from '../components/Header/SubHeader';
import {CONGRATULATION, OOPS} from '../_helpers/ImageProvide';
import {REGISTER_Artboard} from '../_helpers/ImageProvide';

const paymentResult = ({navigation, route}) => {
  const {result, status} = route.params;
  return (
    <>
      <SubHeader />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Image
          style={{height: 300, width: 300}}
          source={status ? CONGRATULATION : OOPS}></Image>
        <View style={{width: 300, paddingTop: 30}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f2A884',
              paddingVertical: 20,
              borderRadius: 10,
              justifyContent: 'center',
            }}
            onPress={() => {
              status
                ? navigation.navigate('MyOrders')
                : navigation.navigate('CartComponent');
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                alignSelf: 'center',
              }}>
              {status ? 'Track your order' : 'Make payment again'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default paymentResult;
