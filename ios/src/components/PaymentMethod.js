/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, Button} from 'react-native';
import SubHeader from './Header/SubHeader';
const {width, height} = Dimensions.get('window');
import {HEADER_unchecked, CHECKED} from '../_helpers/ImageProvide';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const PaymentMethod = (props) => {
  const navigation = useNavigation();
  var [radio_props] = useState([
    {label: 'Pickup myself', value: 0},
    {label: 'Cash on delivery', value: 1},
    {label: 'Pay with credit card', value: 2},
  ]);
  const [value, setValue] = useState(0);
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
          <Text style={styles.header}>Select Payment Method</Text>
        </View>
        <View style={{flex: 5}}>
          {radio_props.map((data, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{flexDirection: 'row', padding: 20}}
                onPress={() => setValue(data.value)}>
                <Image
                  source={data.value == value ? CHECKED : HEADER_unchecked}
                  style={{width: 30, height: 30, margin: 7}}
                />
                <Text style={styles.redioText}>{data.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (value === 0) {
              } else if (value === 1) {
                navigation.navigate('Conformation');
              } else {
                navigation.navigate('GetCardDetail');
              }
            }}
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

export default PaymentMethod;

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  redioText: {
    fontSize: 30,
  },
});
