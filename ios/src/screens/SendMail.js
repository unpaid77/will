import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {ADD_AND_UPDATE_API} from '../util/api';
import {COMMON_ARROW_LEFT} from '../_helpers/ImageProvide';
let styleCss = require('../GlobalStyle');
const SendMail = (props) => {
  const navigation = useNavigation();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const apiCall = () => {
    setLoader(true);
    ADD_AND_UPDATE_API(
      {title: subject, description: message},
      'support/contact-us',
    ).then((data) => {
      Toast.showWithGravity(data.message, Toast.SHORT, Toast.CENTER);
      setLoader(false);
      if (data.success) {
        setMessage('');
        setSubject('');
        navigation.navigate('Home');
      }
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={[styleCss.header, {backgroundColor: '#fff'}]}>
        <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{width: 20, height: 15}} source={COMMON_ARROW_LEFT} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 4, alignItems: 'center', alignSelf: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>Contact Us</Text>
        </View>
        <View
          style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}></View>
      </View>
      <ScrollView
        style={{marginTop: 20}}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive">
        <View style={styleCss.mainContainer}>
          <View style={{marginBottom: 25}}>
            <TextInput
              style={styleCss.inputArea}
              placeholder="Subject"
              value={subject}
              onChangeText={(text) => {
                setSubject(text);
              }}
            />
          </View>
          <View>
            <TextInput
              style={[
                styleCss.inputArea,
                {height: 150, justifyContent: 'flex-start'},
              ]}
              value={message}
              multiline={true}
              numberOfLines={10}
              placeholder="Message"
              onChangeText={(text) => {
                setMessage(text);
              }}
            />
          </View>

          <View style={{marginBottom: 10}}>
            <TouchableOpacity
              style={styleCss.btnButton}
              onPress={() => {
                if (subject == '' || message == '') {
                  Toast.showWithGravity(
                    'Please fill the subject and message',
                    Toast.SHORT,
                    Toast.CENTER,
                  );
                } else {
                  apiCall();
                }
              }}>
              {loader ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.text}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
export default connect(mapStateToProps, null)(SendMail);
