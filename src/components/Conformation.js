/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  CONGRATULATION,
  CROSS,
  HEADER_SMALL_LOGO,
} from '../_helpers/ImageProvide';
import {TouchableOpacity} from 'react-native-gesture-handler';
let styleCss = require('../GlobalStyle');

const Conformation = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 10, alignItems: 'center', alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={{width: 70, height: 70}} source={HEADER_SMALL_LOGO} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image style={{height: 20, width: 20}} source={CROSS} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: '#fff',
          width: width,
        }}>
        <Image source={CONGRATULATION} style={{marginLeft: 35}} />
        <TouchableOpacity style={styles.statusButton}>
          <Text>Your Order Status</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Conformation;

const styles = StyleSheet.create({
  statusButton: {
    padding: 20,
    paddingHorizontal: 80,
    alignSelf: 'center',
    backgroundColor: '#f2A884',
    borderRadius: 5,
    fontSize: 18,
  },
});
