import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {cardActions} from '../actions/card';
import {labelActions} from '../actions/label';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import CreditCard from './noCreditCard';
import {DEV_CONFIGS} from '../util/constant';
import {COOMMON_API} from '../util/api';
let styleCss = require('../GlobalStyle');
import {CHECKED, CROSS, HEADER_unchecked, LOGO} from '../_helpers/ImageProvide';

const MyPaymentMethod = (props) => {
  const [checked, setChecked] = useState(0);
  const [token, setToken] = useState('');
  const [lan_guage, setLanguage] = useState('en');
  useEffect(() => {
    getValue();
  }, []);
  const getValue = async () => {
    try {
      const Token = await AsyncStorage.getItem('token');
      const language = await AsyncStorage.getItem('language');
      setToken(Token);
      setLanguage(language);
      var lang = 'en';
      var add = {};
      add.token = Token;
      if (language == 'ar') {
        add.language = language;
      } else {
        add.language = lang;
      }
      props.labelAction(add, props.navigation);
      props.cardAction(add, props.navigation);
    } catch (e) {
      //  error
      console.error(e);
    }
  };
  const deleteCard = (credit_card_id) => {
    var bearer = 'Bearer ' + token;
    var lang = 'en';
    var data = {};
    data.credit_card_id = credit_card_id;
    var add = {};
    add.token = token;
    if (lan_guage == 'ar') {
      add.language = lan_guage;
    } else {
      add.language = lang;
    }
    let formBody = [];
    for (let property in data) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    COOMMON_API(formBody, 'creditcard/delete')
      .then((responseJson) => {
        if (responseJson.success) {
          props.cardAction(add, props.navigation);
          props.labelAction(add, props.navigation);
        }
        Toast.showWithGravity(responseJson.message, Toast.LONG, Toast.CENTER);
      })
      .catch((e) => console.error(e));
  };
  if (props.cardError) {
    Toast.showWithGravity(props.cardError, Toast.LONG, Toast.CENTER);
  }
  if (props.labelStatus) {
    if (props.cardStatus) {
      if (props.cardData.length) {
        return (
          <>
            <ScrollView
              style={{backgroundColor: 'white'}}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive">
              <View style={styleCss.mainContainer}>
                <View style={styleCss.creditHeader}>
                  <View style={{flex: 1}}></View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image style={{width: 50, height: 40}} source={LOGO} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Home')}>
                      <Image style={{width: 20, height: 20}} source={CROSS} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginTop: 30}}>
                  <Text style={styleCss.methodHeadtext}>
                    {props.labelData.my_payment_methods}
                  </Text>
                </View>
                <View style={{marginTop: 35}}>
                  {props.cardData.map((item, index) => {
                    const cardnumber = '' + item.card_number;
                    const card_number = cardnumber.slice(-4);
                    return (
                      <View key={index}>
                        {checked === item.id ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <TouchableOpacity style={styles.radioAlign}>
                              <Image style={styles.imgSize} source={CHECKED} />
                              <View>
                                <Text
                                  numberOfLines={1}
                                  style={styles.radioText}>
                                  **** **** **** {card_number}
                                </Text>
                                <Text style={styles.radioText}>
                                  {item.card_expiry}
                                </Text>
                              </View>
                            </TouchableOpacity>

                            <View>
                              <TouchableOpacity
                                onPress={() => deleteCard(item.id)}>
                                <Text style={styleCss.textColor}>Delete</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setChecked(item.id);
                              }}
                              style={styles.radioAlign}>
                              <Image
                                style={styles.imgSize}
                                source={HEADER_unchecked}
                              />
                              <View>
                                <Text
                                  numberOfLines={1}
                                  style={styles.radioText}>
                                  **** **** **** {card_number}
                                </Text>
                                <Text style={styles.radioText}>
                                  {item.card_expiry}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <View>
                              <TouchableOpacity
                                onPress={() => deleteCard(item.id)}>
                                <Text style={styleCss.textColor}>Delete</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingLeft: 15,
                paddingRight: 15,
              }}>
              <TouchableOpacity style={[styleCss.btnButton, styleCss.mrTop]}>
                <Text style={styles.text}>Add credit card</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      } else {
        return (
          <>
            <ScrollView
              style={{backgroundColor: 'white'}}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive">
              <View style={styleCss.mainContainer}>
                <View style={styleCss.creditHeader}>
                  <View style={{flex: 1}}></View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image style={{width: 50, height: 40}} source={LOGO} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Home')}>
                      <Image style={{width: 20, height: 20}} source={CROSS} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{marginTop: 30}}>
                  <Text style={styleCss.methodHeadtext}>
                    {props.labelData.my_payment_methods}
                  </Text>
                </View>

                <View>
                  <CreditCard />
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingLeft: 15,
                paddingRight: 15,
              }}>
              <TouchableOpacity style={[styleCss.btnButton, styleCss.mrTop]}>
                <Text style={styles.text}>Add credit card</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
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
    width: 180,
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

//export default MyPaymentMethod;
const mapStateToProps = (state) => {
  return {
    cardError: state.cardReducer.cardError,
    cardMessage: state.cardReducer.cardMessage,
    cardData: state.cardReducer.cardData,
    cardStatus: state.cardReducer.cardStatus,
    labelData: state.labelReducer.labelData,
    labelStatus: state.labelReducer.labelStatus,
  };
};
const actionCreators = {
  cardAction: cardActions.cardAction,
  labelAction: labelActions.labelAction,
};
export default connect(mapStateToProps, actionCreators)(MyPaymentMethod);
