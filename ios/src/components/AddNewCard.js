/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import SubHeader from './Header/SubHeader';
import Loader from './Loader/Loader';
const {width, height} = Dimensions.get('window');
import {GET_MY_CART} from '../util/api';
import {HEADER_unchecked, CHECKED} from '../_helpers/ImageProvide';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const AddNewCard = (props) => {
  const [cardholderName, setCardholderName] = useState();
  const [cardNumber, setcardNumber] = useState();
  const [expiryDate, setexpiryDate] = useState();
  const [ccv, setccv] = useState();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      style={{backgroundColor: '#fff', padding: 5, paddingHorizontal: 10}}>
      <SubHeader />
      <View
        style={{
          paddingHorizontal: 15,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: height / 1.2,
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.header}>Add cradit card</Text>
        </View>
        <View style={{flex: 5}}>
          <TextInput
            style={styles.inputFields}
            onChangeText={(text) => setCardholderName(text)}
            value={cardholderName}
            placeholder="Card Holder Name"
          />
          <TextInput
            style={styles.inputFields}
            onChangeText={(text) => setCardholderName(text)}
            value={cardholderName}
            placeholder="Card Number"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              style={[styles.inputFields, {width: width / 2.5}]}
              onChangeText={(text) => setCardholderName(text)}
              value={cardholderName}
              placeholder="Expiry Date"
            />
            <TextInput
              style={[
                styles.inputFields,
                {
                  width: width / 2.5,
                },
              ]}
              onChangeText={(text) => setCardholderName(text)}
              value={cardholderName}
              placeholder="CCV"
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f2A884',
              paddingVertical: 15,
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#ffffff',
                fontWeight: 'bold',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({
  inputFields: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 30,
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  redioText: {
    fontSize: 30,
  },
});
