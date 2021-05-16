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
let styleCss = require('../GlobalStyle');
import {profileActions} from '../actions/profile';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {COOMMON_API} from '../util/api';
import {LOGO} from '../_helpers/ImageProvide';
const Otp = (props) => {
  const [token, setToken] = useState('');
  const [language, setLanguage] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  useEffect(() => {
    getValue();
  }, []);
  const getValue = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const lang = await AsyncStorage.getItem('language');
      const email = await AsyncStorage.getItem('tempemail');
      setToken(token);
      setLanguage(lang);
      setEmail(email);
    } catch (e) {
      //  error
    }
  };
  const handleSubmit = () => {
    if (otp == null || otp == undefined || otp == '' || isNaN(otp)) {
      Toast.showWithGravity('Must be valid otp', Toast.SHORT, Toast.CENTER);
    } else {
      var data = {};
      data.email = email;
      data.verification_code = otp;
      var add = {};
      add.token = token;
      add.language = language;
      let formBody = [];
      for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      COOMMON_API(formBody, 'verify-email').then(async (responseJson) => {
        if (responseJson.success) {
          if (responseJson.data.is_verified) {
            await AsyncStorage.removeItem('tempemail');
            props.profileAction();
            props.navigation.navigate('Setting');
          }
        }
        Toast.showWithGravity(responseJson.message, Toast.SHORT, Toast.CENTER);
      });
    }
  };
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive">
      <View style={styleCss.mainContainer}>
        <View style={{alignItems: 'flex-end', marginTop: 30}}></View>

        <View style={{alignItems: 'center', marginVertical: 30}}>
          <Image style={{width: 120, height: 100}} source={LOGO} />
        </View>

        <View style={{alignItems: 'center', marginBottom: 30}}>
          <Text style={styles.heading}>OTP</Text>
          <Text style={styles.text}>
            Please enter the OTP sent to your mobile number
          </Text>
        </View>

        <View style={{alignSelf: 'center', width: 80, marginBottom: 10}}>
          <TextInput
            placeholder="1234"
            maxLength={4}
            style={styleCss.inputStylesOpt}
            keyboardType="numeric"
            onChangeText={(text) => setOtp(text)}
            value={otp}
            //autoFocus
          />
        </View>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity style={styleCss.btnButton} onPress={handleSubmit}>
            <Text style={styles.buttontext}>{props.labelData.submit}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#f2A884',
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  buttontext: {
    color: '#fff',
    fontSize: 14,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f2A884',
  },
});
const actionCreators = {
  profileAction: profileActions.profileUserAction,
};
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
export default connect(mapStateToProps, actionCreators)(Otp);
