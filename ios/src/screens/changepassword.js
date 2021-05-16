import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
let styleCss = require('../GlobalStyle');
import {connect} from 'react-redux';
import {CROSS, LOGIN_pass, LOGO} from '../_helpers/ImageProvide';

import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import {COOMMON_API} from '../util/api';
const ChangePassword = (props) => {
  const [token, setToken] = useState('');
  const [device_token, setDevice] = useState('');
  const [language, setLanguage] = useState('');
  const [oldpass, setOldpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  useEffect(() => {
    getValue();
  }, []);
  const getValue = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const lang = await AsyncStorage.getItem('language');
      const device_token = await AsyncStorage.getItem('device_token');
      setToken(token);
      setLanguage(lang);
      setDevice(device_token);
    } catch (e) {
      console.error(e);
    }
  };
  const handleSubmit = () => {
    if (
      oldpass == null ||
      oldpass == undefined ||
      oldpass == '' ||
      oldpass.length < 6
    ) {
      Toast.showWithGravity(
        'required minimum 6 charecters',
        Toast.SHORT,
        Toast.CENTER,
      );
    } else if (
      newpass == null ||
      newpass == undefined ||
      newpass == '' ||
      newpass.length < 6
    ) {
      Toast.showWithGravity(
        'required minimum 6 charecters',
        Toast.SHORT,
        Toast.CENTER,
      );
    } else if (
      confirmpass == null ||
      confirmpass == undefined ||
      confirmpass == '' ||
      confirmpass.length < 6
    ) {
      Toast.showWithGravity(
        'required minimum 6 charecters',
        Toast.SHORT,
        Toast.CENTER,
      );
    } else {
      var data = {};
      data.device_token = device_token;
      data.old_password = oldpass;
      data.new_password = newpass;
      data.confirm_password = confirmpass;
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
      COOMMON_API(formBody, 'update-password').then((responseJson) => {
        if (responseJson.data.jump_to_login) {
          props.navigation.navigate('Login');
        }
        Toast.showWithGravity(responseJson.message, Toast.SHORT, Toast.CENTER);
      });
    }
  };
  if (props.labelData) {
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive">
        <View style={{marginBottom: 50}}>
          <View style={styleCss.mainContainer}>
            <View style={{alignItems: 'flex-end', marginTop: 10}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Setting')}>
                <Image style={{width: 16, height: 16}} source={CROSS} />
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', marginVertical: 30}}>
              <Image style={{width: 120, height: 100}} source={LOGO} />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.heading}>
                {props.labelData.change_password}
              </Text>
            </View>

            <View style={styles.mrgTop}>
              <View>
                <Text style={styles.inputLabel}>
                  {props.labelData.old_password}
                </Text>
              </View>
              <View style={styleCss.inputStylesPass}>
                <View style={styles.imgStyle}>
                  <Image style={{width: 14, height: 16}} source={LOGIN_pass} />
                </View>
                <View style={{flex: 5}}>
                  <TextInput
                    style={{
                      height: 50,
                      paddingLeft: 5,
                      alignSelf: 'flex-start',
                    }}
                    placeholder={props.labelData.old_password}
                    onChangeText={(text) => setOldpass(text)}
                    value={oldpass}
                    secureTextEntry={true}
                    // autoFocus
                  />
                </View>
              </View>
            </View>

            <View style={styles.mrgTop}>
              <View>
                <Text style={styles.inputLabel}>New Password</Text>
              </View>
              <View style={styleCss.inputStylesPass}>
                <View style={styles.imgStyle}>
                  <Image style={{width: 14, height: 16}} source={LOGIN_pass} />
                </View>
                <View style={{flex: 5}}>
                  <TextInput
                    style={{
                      height: 50,
                      alignSelf: 'flex-start',
                      paddingLeft: 5,
                    }}
                    placeholder="New Password"
                    onChangeText={(text) => setNewpass(text)}
                    value={newpass}
                    secureTextEntry={true}
                  />
                </View>
              </View>
            </View>

            <View style={styles.mrgTop}>
              <View>
                <Text style={styles.inputLabel}>
                  {props.labelData.con_pass}
                </Text>
              </View>
              <View style={styleCss.inputStylesPass}>
                <View style={styles.imgStyle}>
                  <Image style={{width: 14, height: 16}} source={LOGIN_pass} />
                </View>
                <View style={{flex: 5}}>
                  <TextInput
                    style={{
                      height: 50,
                      paddingLeft: 5,
                    }}
                    placeholder={props.labelData.con_pass}
                    onChangeText={(text) => setConfirmpass(text)}
                    value={confirmpass}
                    secureTextEntry={true}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity style={styleCss.btnButton} onPress={handleSubmit}>
              <Text style={styles.text}>{props.labelData.submit}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  } else return null;
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

  mrgTop: {
    marginTop: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
export default connect(mapStateToProps, null)(ChangePassword);
