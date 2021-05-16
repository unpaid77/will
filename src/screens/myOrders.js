import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {MYORDERS_API} from '../util/api';
import Header from '../components/Header/Header';
import {PLAN_ARROW_RIGHT} from '../_helpers/ImageProvide';

import {emailActions} from '../actions/emailExport';
import Loader from '../components/Loader/Loader';

const myOrders = (props) => {
  const navigation = useNavigation();

  const [totalOrders, settotalOrders] = useState(null);
  const [loader, setLoader] = useState(true);
  const [orderStatus, setorderStatus] = useState(null);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setLoader(true);
      settotalOrders(null);
      getData();
    });
    return () => unsubscribe;
  }, []);

  const getData = () => {
    MYORDERS_API('user/order/list').then((data) => {
      settotalOrders(data.data);
      setorderStatus(data.data.map((status) => status.status));
      data.success ? setLoader(false) : setLoader(true);
    });
  };

  const onPress = (orderlist) => {
    // props.navigation.navigate('MyOrderDetails');
  };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <>
        <Header />
        <ScrollView style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'column', padding: 5}}>
            <View style={{flexDirection: 'column', paddingVertical: 5}}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>
                  {props.labelData.my_orders}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    paddingVertical: 8,
                    marginBottom: 15,
                  }}>
                  <Text>
                    {totalOrders.length}{' '}
                    {totalOrders.length == 1 ? 'Order' : 'Orders'}
                  </Text>
                </Text>
              </View>
            </View>
            <View>
              {totalOrders.map((orderlist, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'column',
                      paddingVertical: 5,
                    }}
                    key={index}>
                    <Text>
                      <View
                        style={[
                          {
                            flex: 2,
                            paddingHorizontal: 10,
                          },
                          styles.borderBottomBox,
                        ]}>
                        <View style={{flexDirection: 'column'}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                styles.headingText,
                                {alignSelf: 'flex-start'},
                              ]}>
                              Order #{orderlist.order_id}
                            </Text>
                            <Text>
                              {orderlist.status == 0 ? (
                                <Text
                                  style={{
                                    color: '#fc1703',
                                    marginLeft: 130,
                                    fontSize: 17,
                                  }}>
                                  {orderlist.total_paid_amount}
                                </Text>
                              ) : orderlist.status == 1 ? (
                                <View>
                                  <Text
                                    style={{
                                      color: '#f2A884',
                                      marginLeft: 130,
                                      fontSize: 17,
                                    }}>
                                    {orderlist.total_paid_amount}
                                  </Text>
                                </View>
                              ) : (
                                <Text
                                  style={{
                                    color: '#23a145',
                                    marginLeft: 130,
                                    fontSize: 17,
                                  }}>
                                  {orderlist.total_paid_amount}
                                </Text>
                              )}
                            </Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                styles.thiredSection,
                                {alignSelf: 'flex-start'},
                              ]}>
                              {orderlist.status == 0 ? (
                                <Text style={{color: '#fc1703'}}>
                                  Cancelled
                                </Text>
                              ) : orderlist.status == 1 ? (
                                <View>
                                  <Text style={{color: '#f2A884'}}>
                                    On it's way
                                  </Text>
                                  <TouchableOpacity>
                                    <Text>Edit your Program</Text>
                                  </TouchableOpacity>
                                </View>
                              ) : (
                                <Text style={{color: '#23a145'}}>
                                  Delivered
                                </Text>
                              )}
                            </Text>
                            <Text style={{marginLeft: 130}}>
                              {orderlist.created_on}
                            </Text>
                            <TouchableOpacity
                              onPress={() => onPress(orderlist)}>
                              <View style={{marginLeft: 10}}>
                                <Image source={PLAN_ARROW_RIGHT}></Image>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={{paddingTop: 30}}>
              <Button
                title="Export Orders via Email"
                color="#f2A884"
                style={{}}></Button>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  itemContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontSize: 15,
  },

  thiredSection: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    paddingVertical: 2,
  },

  borderBottomBox: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingBottom: 10,
    marginBottom: 10,
  },

  total: {color: '#f2A884', fontSize: 20, fontWeight: 'bold'},

  imgBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 2,
    width: 70,
  },

  headingText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 3,
  },
});

const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
    emailData: state.emailExportReducer.emailData,
  };
};

export default connect(mapStateToProps, null)(myOrders);
