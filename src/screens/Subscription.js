import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

let styleCss = require('../GlobalStyle');
import {CROSS, LOGIN_pass, LOGO} from '../_helpers/ImageProvide';

const Subscription = (props) => {
  const [oldpass, setOldpass] = useState('');
  const [focus, setFocus] = useState(false);
  const handleCardNumber = (text) => {
    /*   let formattedText = text.split(' ').join('');
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
    } */
    //let formattedText = text.split(' ').join('');
    if (text.length > 0) {
      text = text.replace(/^(\d{2})(\d{2})/, '$1/$2/');
    }
    setOldpass(text);
  };
  const handleSubmit = () => {
    var pattern = /^(0[1-9]|1[012])\/\d{2}$/;
  };
  const focusInput = () => {
    setFocus(true);
  };
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive">
      <View style={{marginBottom: 50}}>
        <View style={styleCss.mainContainer}>
          <View style={{alignItems: 'flex-end', marginTop: 10}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image style={{width: 16, height: 16}} source={CROSS} />
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image style={{width: 120, height: 100}} source={LOGO} />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.heading}>Chanage Password</Text>
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
                  style={{height: 50, paddingLeft: 5}}
                  placeholder={props.labelData.old_password}
                  onChangeText={handleCardNumber}
                  value={oldpass}
                  keyboardType={'numeric'}
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
export default connect(mapStateToProps, null)(Subscription);
