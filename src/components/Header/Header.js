import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
let styleCss = require('../../GlobalStyle');
import {connect} from 'react-redux';
import {
  CART,
  HEADER_MENU_ICON,
  HEADER_SMALL_LOGO,
} from '../../_helpers/ImageProvide';
import Toast from 'react-native-simple-toast';

const Header = (props) => {
  const navigation = useNavigation();
  return (
    <View style={[styleCss.header, {backgroundColor: '#fff'}]}>
      <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image style={{width: 20, height: 15}} source={HEADER_MENU_ICON} />
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
        <TouchableOpacity
          onPress={() => {
            if (props.listOfItem > 0) {
              navigation.navigate('CartComponent');
            } else {
              Toast.showWithGravity(
                props.labelData.please_select_your_plan_first,
                Toast.SHORT,
                Toast.CENTER,
              );
            }
          }}>
          <Image style={{height: 40, width: 40}} source={CART} />
          <View
            style={{
              position: 'absolute',
              width: 18,
              height: 18,
              borderRadius: 100,
              backgroundColor: '#fcb85f',
              marginTop: 10,
              marginLeft: 15,
            }}>
            <Text
              style={{
                position: 'absolute',
                alignSelf: 'center',
                color: '#fff',
                fontWeight: 'bold',
              }}>
              {props.listOfItem}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
    listOfItem: state.cartReducer.listOfItems,
  };
};

export default connect(mapStateToProps, null)(Header);
