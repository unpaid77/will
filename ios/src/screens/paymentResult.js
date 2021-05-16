import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, TouchableOpacity, I18nManager} from 'react-native';
import {cartActions} from '../actions/cart';
import {CONGRATULATION, OOPS} from '../_helpers/ImageProvide';
let styleCss = require('../GlobalStyle');
import {
  ARROW_LEFT,
  ARROW_RIGHT,
  CROSS,
  HEADER_SMALL_LOGO,
} from '../_helpers/ImageProvide';
const paymentResult = (props) => {
  const {navigation} = props;
  const {status} = props.route.params;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      props.ListOfItems();
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <View style={styleCss.header}>
        <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={I18nManager.isRTL ? ARROW_RIGHT : ARROW_LEFT} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 4, alignItems: 'center', alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={{width: 50, height: 50}} source={HEADER_SMALL_LOGO} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={{height: 20, width: 20}} source={CROSS} />
          </TouchableOpacity>
        </View>
      </View>
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
                ? navigation.navigate('Drawer', {
                  screen: 'MyOrders'
                })
                : navigation.navigate('Drawer', {
                  screen: 'CartComponent'
                });
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                alignSelf: 'center',
              }}>
              {status ? 'Track your order' : props.labelData.make_payment_again}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
const actionCreators = {
  ListOfItems: cartActions.ListOfItems,
};

export default connect(mapStateToProps, actionCreators)(paymentResult);
