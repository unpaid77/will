import React, {Fragment} from 'react';

import PushController from './PushController';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import Header from '../Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dateformat from 'dateformat';
// Dummy data for list, we'll replace this with data received from push
let pushData = [
  {
    status: true,
    title: 'First push',
    message: 'First push message',
    date: '2020-12-15T16:16:59.785Z',
  },
  {
    status: true,
    title: 'Second push',
    message: 'Second push message',
    date: '2020-12-16T17:16:59.785Z',
  },
  {
    status: false,
    title: 'Third push',
    message: 'Third push message',
    date: '2020-12-17T18:16:59.785Z',
  },
  {
    status: false,
    title: 'Fourth push',
    message: 'Fourth push message',
    date: '2020-12-18T19:16:59.785Z',
  },
];
const cleanAll = () => {
  console.log('clean all order details');
};
const MarkeAllAsRead = () => {
  console.log('mark all as read');
};
const Offers = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Fragment>
        <Header />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.listHeader}>
              <View>
                <Text
                  style={{color: '#f2A884', fontSize: 22, fontWeight: 'bold'}}>
                  Order Details
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => cleanAll}>
                  <Text style={{color: '#f2A884', fontSize: 18}}>
                    Clean All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => MarkeAllAsRead}>
                  <Text style={{color: '#CCC'}}>Mark all as read</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.body}>
              {pushData.map((e, i) => {
                return <_renderItem item={e} key={i} />;
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
        <PushController />
      </Fragment>
    </View>
  );
};
const _renderItem = ({item}) => (
  <View key={item.title}>
    {item.status ? null : (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}>
        <Text style={{fontSize: 20, fontStyle: 'italic', fontWeight: '600'}}>
          {dateformat(item.date, 'mmm d')}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          {dateformat(item.date, 'h:MM TT')}
        </Text>
      </View>
    )}
    <TouchableOpacity activeOpacity={item.status ? 0.5 : 1}>
      <View style={styles.card}>
        {item.status ? <View style={styles.cardTop}></View> : null}
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  cardTop: {
    height: 74,
    width: 10,
    position: 'absolute',
    marginLeft: -11,
    marginTop: 6,
    backgroundColor: '#EBA984',
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
    shadowColor: '#F2A884',
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
  title: {fontSize: 18, fontWeight: '600', paddingTop: 10, color: '#f2A884'},
  message: {
    fontSize: 13,
    paddingBottom: 15,
  },
  engine: {position: 'absolute', right: 0},
  body: {
    padding: 20,
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

export default Offers;
