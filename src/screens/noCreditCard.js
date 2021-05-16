import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {PAYMENT_noCredit} from '../_helpers/ImageProvide';
let styleCss = require('../GlobalStyle');

const NoCreditCard = () => {
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive">
      <View style={styleCss.mainContainer}>
        <View
          style={{
            flex: 1,
            height: 420,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{width: 150, height: 120}} source={PAYMENT_noCredit} />

          <Text style={styleCss.creditCardHeading}>No Credit card</Text>
          <Text style={styleCss.creditText}>
            You don't have any credit cards associated with your account
          </Text>
        </View>

        {/*  <View style={{flex:1, marginBottom:20}}> 
      <TouchableOpacity 
      style={styleCss.btnButton}
      >
            <Text style={styles.text}>Add credit card</Text>
          </TouchableOpacity>
      </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export default NoCreditCard;
