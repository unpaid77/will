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
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const GetCardDetail = (props) => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [hideShow, sethideShow] = useState(false);
  useEffect(() => {
    GetCardList();
  }, []);
  const GetCardList = () => {
    GET_MY_CART('creditcard/list').then((data) => {
      if (data.success) {
        sethideShow(data.data.length === 0 ? true : false);
        setLoader(true);
        data.data.length === 0 && addNewCard();
      }
    });
  };
  var [radio_props] = useState([]);
  const [value, setValue] = useState(0);
  const addNewCard = () => {
    navigation.navigate('AddNewCard');
  };
  if (loader) {
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
            <Text style={styles.header}>My Payment Method</Text>
          </View>
          <View style={{flex: 5}}>
            {radio_props.map((data) => {
              return (
                <TouchableOpacity
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
            <TouchableOpacity onPress={() => addNewCard()}>
              <Text>Add new cradit card</Text>
            </TouchableOpacity>
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
  } else {
    return <Loader />;
  }
};

export default GetCardDetail;

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  redioText: {
    fontSize: 30,
  },
});
