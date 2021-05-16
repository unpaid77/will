import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
let styleCss = require('../GlobalStyle');
import {profileActions} from '../actions/profile';
import AsyncStorage from '@react-native-community/async-storage';
import {CHECKED, CROSS, HEADER_unchecked} from '../_helpers/ImageProvide';
import Toast from 'react-native-simple-toast';
import {PROFILE_API} from '../util/api';
import SubHeader from '../components/Header/SubHeader';
const ProfileEdit = (props) => {
  const [token, setToken] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState(0);
  const [address, setAddress] = useState([]);
  const [language, setLanguage] = useState('');
  useEffect(() => {
    getValue();
  }, []);
  const getValue = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const first = await AsyncStorage.getItem('first_name');
      const last = await AsyncStorage.getItem('last_name');
      const phone = await AsyncStorage.getItem('phone_number');
      const add_ress = await AsyncStorage.getItem('address');
      const lang = await AsyncStorage.getItem('language');
      setFirst(first);
      setLast(last);
      setPhone(phone);
      setToken(token);
      setLanguage(lang);
      if (add_ress != null || add_ress != undefined) {
        const add = JSON.parse(add_ress);
        setAddress(add);
        add.forEach((element) => {
          if (element.is_default_address === 1) {
            setChecked(element.id);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleSubmit = async () => {
    if (first == null || first == undefined || first == '') {
      Toast.showWithGravity(
        props.labelData.first_name_can_not_be_empty,
        Toast.SHORT,
        Toast.CENTER,
      );
    } else if (last == null || last == undefined || last == '') {
      Toast.showWithGravity(
        props.labelData.last_name_can_not_be_empty,
        Toast.SHORT,
        Toast.CENTER,
      );
    } else if (
      phone == null ||
      phone == undefined ||
      phone == '' ||
      isNaN(phone)
    ) {
      Toast.showWithGravity(
        props.labelData.must_be_valid_mobile_number,
        Toast.SHORT,
        Toast.CENTER,
      );
    } else if (phone.length < 8) {
      Toast.showWithGravity(
        props.labelData.the_phone_number_must,
        Toast.SHORT,
        Toast.CENTER,
      );
    } else {
      var formData = new FormData();
      formData.append('first_name', first);
      formData.append('last_name', last);
      formData.append('phone_number', phone);
      formData.append('default_address_id', checked);
      var add = {};
      add.token = token;
      add.language = language;
      PROFILE_API(formData, 'edit/profile').then((responseJson) => {
        if (responseJson.success) {
          props.profileAction();
          props.navigation.navigate('Profile');
        }
        Toast.showWithGravity(responseJson.message, Toast.SHORT, Toast.CENTER);
      });
    }
  };
  return (
    <ScrollView
      style={{backgroundColor: 'white', flex: 1}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive">
      <SubHeader />

      <View style={styleCss.mainContainer}>
        <View style={{paddingBottom: 40}}>
          <View style={styleCss.inputStyles}>
            <View style={styles.imgStyle}>
              <Image
                style={{width: 14, height: 16}}
                source={require('../../assets/image/register/name.png')}
              />
            </View>
            <View style={{flex: 5}}>
              <TextInput
                style={{height: 50, paddingLeft: 5, alignSelf: 'flex-start'}}
                onChangeText={(text) => setFirst(text)}
                value={first}
                placeholder={props.labelData.first_name}
              />
            </View>
          </View>

          <View style={styleCss.inputStyles}>
            <View style={styles.imgStyle}>
              <Image
                style={{width: 14, height: 16}}
                source={require('../../assets/image/register/name.png')}
              />
            </View>
            <View style={{flex: 5}}>
              <TextInput
                style={{height: 50, paddingLeft: 5, alignSelf: 'flex-start'}}
                onChangeText={(text) => setLast(text)}
                value={last}
                placeholder={props.labelData.last_name}
              />
            </View>
          </View>
          <View style={styleCss.inputStyles}>
            <View style={styles.imgStyle}>
              <Image
                style={{width: 14, height: 14}}
                source={require('../../assets/image/register/phone.png')}
              />
            </View>
            <View style={{flex: 5}}>
              <TextInput
                style={{height: 50, paddingLeft: 5, alignSelf: 'flex-start'}}
                keyboardType="numeric"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                placeholder={props.labelData.phone_no}
              />
            </View>
          </View>
          <TouchableOpacity style={styleCss.btnButton} onPress={handleSubmit}>
            <Text style={styles.text}>{props.labelData.submit}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    width: 35,
    alignItems: 'center',
    paddingLeft: 8,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  radioAlign: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  radioText: {
    paddingLeft: 10,
    width: 130,
  },
  radioTextHeading: {
    paddingLeft: 10,
    color: '#98979d',
  },
  imgSize: {
    width: 25,
    height: 25,
  },
});
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
const actionCreators = {
  profileAction: profileActions.profileUserAction,
};
export default connect(mapStateToProps, actionCreators)(ProfileEdit);
