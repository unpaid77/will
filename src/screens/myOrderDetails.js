import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {MYORDERS_API} from '../util/api';
import {MYORDERDETAILS_API} from '../util/api';

import Header from '../components/Header/Header';
import {PLAN_ARROW_RIGHT} from '../_helpers/ImageProvide';
import {myOrdersAction} from '../actions/myOrders';
import Loader from '../components/Loader/Loader';
const {width} = Dimensions.get('window');
import {REGISTER_Artboard} from '../_helpers/ImageProvide';
import {CROSS} from '../_helpers/ImageProvide';

const MyOrderDetails = ({navigation, route}) => {
  const {result} = route.params;

  const [totalOrders, settotalOrders] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loader, setLoader] = useState(true);
  const [orderStatus, setorderStatus] = useState(null);

  useEffect(() => {
    setLoader(true);
    // settotalOrders(null);
    getData();
  }, []);

  const getData = () => {
    MYORDERS_API('user/order/list').then((data) => {
      settotalOrders(data.data);
      setorderStatus(data.data.map((status) => status.status));
      data.success ? setLoader(false) : setLoader(true);
    });

    MYORDERDETAILS_API('user/myCart').then((data) => {
      setorderDetails(data.data);
      data.success ? setLoader(false) : setLoader(true);
    });
  };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <>
        <Header />
        <ScrollView style={{paddingHorizontal: 20}}>
          <View style={{flexDirection: 'column', padding: 5}}>
            <View style={{flexDirection: 'column', paddingVertical: 5}}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>
                  {props.labelData.order} #{orderlist.order_id}
                </Text>
                <Text
                  style={{fontSize: 20, paddingVertical: 8, marginBottom: 15}}>
                  {totalOrders.length == 1 ? (
                    <Text>{totalOrders.length} </Text>
                  ) : (
                    <Text>{totalOrders.length} orders</Text>
                  )}
                </Text>
              </View>

              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 15,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image style={{height: 14, width: 14}} source={CROSS}></Image>
                </TouchableOpacity>
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
                            <View style={{marginLeft: 10}}>
                              <Image source={PLAN_ARROW_RIGHT}></Image>
                            </View>
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
    // justifyContent: 'flex-end',
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
  };
};
export default connect(mapStateToProps, null)(MyOrderDetails);
