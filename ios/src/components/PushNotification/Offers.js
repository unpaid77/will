import React, {Fragment, useEffect, useState} from 'react';
// import Clipboard from '@react-native-community/clipboard';
// import PushController from './PushController';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Clipboard,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

import Header from '../Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dateformat from 'dateformat';
import {GET_API} from '../../util/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
// Dummy data for list, we'll replace this with data received from push

const cleanAll = () => {
  console.log('clean all order details');
};
const MarkeAllAsRead = () => {
  console.log('mark all as read');
};
const Offers = (props) => {
  const [pushData, setPushData] = useState([]);
  const [ReceiveOffer, setReceiveOffer] = useState(null);
  const navigation = useNavigation();
  async function getReceiveOfferStatus () {
    try{
    const receiveOffer = await AsyncStorage.getItem('ReceiveOffer')
    if(receiveOffer == "true") {
      GET_API('coupon/list').then((data) => {
      setPushData(data.data);
    })
  }
    } catch(e) {console.log(e)}
  }


  useEffect(() => {
    // getOfferData()
    const unsubscribe = navigation.addListener('focus', () => {
      getReceiveOfferStatus();
      // ReceiveOffer && GET_API('coupon/list').then((data) => {
      //   setPushData(data.data);
      // })
    });
    return unsubscribe
  }, [navigation]);

  if (pushData.length == 0) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Fragment>
          <Header />
          <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <Text>{props.labelData.no_offer_on_your_account}</Text>
          </View>
        </Fragment>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Fragment>
        <Header />
        <View style={{flex:1}}>
          <ScrollView>
            <View style={styles.listHeader}>
              <View>
                <Text
                  style={{color: '#f2A884', fontSize: 22, fontWeight: 'bold'}}>
                  {props.labelData.my_offers}
                </Text>
              </View>
            </View>
            <View style={styles.body}>
              {pushData.map((e, i) => {
                return <_renderItem item={e} props={props} key={i} />;
              })}
            </View>
          </ScrollView>
        </View>
        {/* <PushController /> */}
      </Fragment>
    </View>
  );
};
const _renderItem = ({item, props}) => (
  <View key={item.date}>
    <Text style={{fontSize: 20, fontStyle: 'italic', fontWeight: '600'}}>
      {dateformat(item.date, 'mmm d')}
    </Text>
    {item.list.map((list, index) => {
      return list.is_read != '0' || list.coupon_details == null ? null : (
        <View key={index}>
          <TouchableOpacity activeOpacity={list.status ? 0.5 : 1}>
            <View style={styles.card}>
              {list.is_read == '0' ? (
                <View style={styles.cardTop}></View>
              ) : null}
              <View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.title}>{list.coupon_details.code}</Text>
                  <TouchableOpacity
                    style={{
                      borderWidth: 0.7,
                      padding: 5,
                      borderRadius: 5,
                      borderColor: '#5AC648',
                    }}
                    onPress={async () => {
                      await Clipboard.setString(list.coupon_details.code);
                      Toast.showWithGravity(
                        props.labelData.copied,
                        Toast.SHORT,
                        Toast.CENTER,
                      );
                    }}>
                    <Text>
                      {props.labelData.copy ? props.labelData.copy : 'Copy'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text>{list.coupon_details.title}</Text>
                <Text style={styles.message}>{list.coupon_details.about}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  cardTop: {
    height: 95,
    width: 10,
    position: 'absolute',
    marginLeft: -11,
    marginTop: 6,
    backgroundColor: '#5AC648',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#5AC648',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    color: '#5AC648',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 13,
    paddingBottom: 15,
  },
  engine: {position: 'absolute', right: 0},
  body: {
    padding: 20,
    flex:1
  },
  sectionContainer: {marginTop: 32, paddingHorizontal: 24},
  sectionTitle: {fontSize: 24, fontWeight: '600'},
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {fontWeight: '700'},
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};

export default connect(mapStateToProps, null)(Offers);
