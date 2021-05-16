import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {MYORDERS_API} from '../util/api';
import Header from '../components/Header/Header';
import {PLAN_ARROW_RIGHT, CROSS} from '../_helpers/ImageProvide';
import Loader from '../components/Loader/Loader';

const myOrders = (props) => {
  //   const {result} = route.params;

  const [totalOrders, settotalOrders] = useState(null);
  const [loader, setLoader] = useState(true);
  const [emailLoader, setEmailLoader] = useState(false);

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
      console.log(data.data)
      data.success ? setLoader(false) : setLoader(true);
    });
  };

  const onPress = (orderlist) => {
    props.navigation.navigate('MyOrderDetails', {
      order_id: orderlist.order_id,
    });
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <ScrollView style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'column', padding: 5}}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 5,
              justifyContent: 'space-between',
            }}>
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
                  {totalOrders.length == 1
                    ? props.labelData.order
                    : props.labelData.my_orders}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 25,
              }}
              onPress={() => props.navigation.navigate('Home')}>
              <Image style={{width: 15, height: 15}} source={CROSS} />
            </TouchableOpacity>
          </View>
          <View>
            {totalOrders.map((orderlist, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onPress(orderlist)}
                  key={index}>
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
                              {props.labelData.order} #{orderlist.order_id}
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
                            <View
                              style={[
                                styles.thiredSection,
                                {alignSelf: 'flex-start'},
                              ]}>
                              <Text style={{color: '#f2A884'}}>
                                {orderlist.meal_date_status === null
                                  ? orderlist.is_cancelled
                                  : orderlist.meal_date_status.day_status}
                              </Text>
                              <View>
                                <TouchableOpacity
                                  onPress={() => onPress(orderlist)}>
                                  <Text>
                                    {props.labelData.edit_your_program}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
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
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{paddingTop: 30}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#f2A884',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                setEmailLoader(true);
                MYORDERS_API('user/order/export').then((data) => {
                  if (data.success) {
                    setEmailLoader(false);
                    Toast.showWithGravity(
                      'Your order has been send sucessfully, please check your mail.',
                      Toast.SHORT,
                      Toast.CENTER,
                    );
                  } else {
                    Toast.showWithGravity(
                      "Your order hasn't send sucessfully, please contact to customer care.",
                      Toast.SHORT,
                      Toast.CENTER,
                    );
                  }
                });
              }}>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                {emailLoader ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : null}
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {props.labelData.export_orders_via_email}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
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
    emailData: state.emailExportReducer.emailData,
  };
};

export default connect(mapStateToProps, null)(myOrders);
