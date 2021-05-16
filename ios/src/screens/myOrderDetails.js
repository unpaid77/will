import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  I18nManager,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import Header from '../components/Header/Header';
import {
  CROSS,
  CIRCLE_ARROW_LEFT,
  CIRCLE_ARROW_RIGHT,
  IMAGE_CDN,
} from '../_helpers/ImageProvide';
import {Calendar} from 'react-native-calendars';
let styleCss = require('../GlobalStyle');
import {ADD_AND_UPDATE_API} from '../util/api';
import Loader from '../components/Loader/Loader';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const MyOrderDetails = (props) => {
  const {order_id} = props.route.params;
  const [orderDetails, setOrderDetails] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [order_id]);

  const getData = () => {
    ADD_AND_UPDATE_API({order_id}, 'user/order/details').then((data) => {
      if (data.success) {
        setOrderDetails(data.data);
      } else {
      }
    });
  };

  const getDisabledDates = () => {
    const disabledDates = {};
    orderDetails.meal_avilablity_date.forEach((e, i) => {
      let dateArray = e.date.split('-');
      disabledDates[`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`] = {
        customStyles: {
          container: {
            backgroundColor: i == 0 ? '#f3a884' : '#ffffff00',
          },
          text: {
            color: e.is_meal_available ? (i == 0 ? '#fff' : '#f3a884') : '#fff',
          },
        },
      };
    });
    return disabledDates;
  };
  const onDayPress = (day) => {
    let m = moment(new Date()).add(2, 'days');
    orderDetails.meal_avilablity_date.forEach((element) => {
      const dateArray = element.date.split('-');
      if (day.dateString == `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`) {
        mealCheck(element, day, day.dateString);
      }
    });
  };

  const mealCheck = (element, day, selectedDate) => {
    let data = {};
    data = {
      plan_packages_id: element.plan_packages_id,
      order_id: order_id,
      week: element.week,
      day: element.day,
      user_order_week_id: element.user_order_week_id,
    };
    let week_details =
      orderDetails.weekly_details == null
        ? [...orderDetails.meal_list]
        : [...orderDetails.weekly_details];
    ADD_AND_UPDATE_API(data, 'plan/package/meal/list').then((data) => {
      if (data.success) {
        //console.log(
        //  data.data.basic.week == 1 && data.data.basic.week == 1
        //    ? 'myOrderListingOneDay'
        //    : 'MyOrderListing',
        //);
        props.navigation.navigate(
          orderDetails.weekly_details == null
            ? 'myOrderListingOneDay'
            : 'MyOrderListing',
          {
            orderD: data.data,
            weekly_details: week_details,
            oneDayPlan: orderDetails.weekly_details == null ? 1 : 0,
            weekIN: element.week - 1,
            day,
            date: orderDetails.date,
            meal_avilablity_date: orderDetails.meal_avilablity_date,
          },
        );
      }
    });
  };
  console.log("orderDetails");
  console.log(orderDetails)
  if (orderDetails) {
    return (
      <>
        <Header />
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={styleCss.mainContainer}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 25,
              }}>
              <Text style={styles.orderText}>{orderDetails.plan_name}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{width: 10, height: 10}} source={CROSS} />
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.orderText}>{props.labelData.order}</Text>
              <Text style={styles.orderText}>#{orderDetails.order_id}</Text>
            </View>
            <View>
              <Text style={styles.status}>
                {orderDetails.meal_date_status == null
                  ? orderDetails.is_cancelled
                  : orderDetails.meal_date_status.day_status}
              </Text>
            </View>
            {orderDetails.weekly_details != null ? (
              orderDetails.weekly_details.map((e, i) => {
                return (
                  <View
                    style={{flexDirection: 'row', marginVertical: 20}}
                    key={i}>
                    <View style={styles.boxShadow}>
                      <Image
                        style={styles.imgBoxShadow}
                        source={{
                          uri: IMAGE_CDN + e.program_image,
                        }}
                      />
                    </View>
                    <View style={{marginLeft: 15, flex: 2}}>
                      <View>
                        <Text style={styles.heading}>{e.program_name}</Text>
                      </View>
                      <View style={styles.boxShadow2}>
                        <Text style={styles.heading2}>
                          {e.plan_packages_name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.kdColor2}>
                              {e.pacakge_price}
                            </Text>
                          </View>
                          {/* <View style={{flexDirection: 'row'}}>
                          <Text style={styles.duration}>Duration</Text>
                          <Text style={styles.duration2}>
                            {orderDetails.concat_duration}
                          </Text>
                        </View> */}
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={{flexDirection: 'row', marginVertical: 20}}>
                <View
                  style={[
                    styles.boxShadow,
                    {padding: 5, justifyContent: 'center'},
                  ]}>
                  <Text style={styles.kdColor2}>{orderDetails.plan_name}</Text>
                </View>
                <View style={{marginLeft: 15, flex: 2}}>
                  <View style={styles.boxShadow2}>
                    <Text style={styles.heading2}>
                      {orderDetails.plan_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.kdColor2}>
                          {orderDetails.total_amount}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View style={{alignItems: 'center'}}>
              <Text style={styles.yet}>{props.labelData.you_have_not_yet}</Text>
              <Text style={styles.yet2}>
                {props.labelData.feeling_not_sure}
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <Calendar
                horizontal={true}
                pagingEnabled={true}
                scrollEnabled={true}
                minDate={orderDetails.date.start_date}
                maxDate={orderDetails.date.end_date}
                markingType={'period'}
                disableAllTouchEventsForDisabledDays
                rowHeight={5}
                hideExtraDays={true}
                renderArrow={(direction) => (
                  <View>
                    <Image
                      source={
                        direction == 'left'
                          ? !I18nManager.isRTL
                            ? CIRCLE_ARROW_LEFT
                            : CIRCLE_ARROW_RIGHT
                          : !I18nManager.isRTL
                          ? CIRCLE_ARROW_RIGHT
                          : CIRCLE_ARROW_LEFT
                      }
                    />
                  </View>
                )}
                theme={{
                  calendarBackground: '#343739',
                  todayTextColor: '#ffffff',
                  todayBackgroundColor: '#f2A884',
                  textDisabledColor: '#6a6e7f',
                  dayTextColor: '#ffffff',
                  monthTextColor: '#ffffff',
                  selectedDayBackgroundColor: '#333248',
                }}
                onDayPress={onDayPress}
                markingType={'custom'}
                markedDates={{
                  ...getDisabledDates(),
                }}
              />
            </View>
            <View style={styles.seleceted}>
              <View style={styles.rowSpace}>
                <View style={styles.colorBox1}></View>
                <View>
                  <Text style={styles.textColor}>Selected days</Text>
                </View>
              </View>
              <View>
                <View style={styles.rowSpace}>
                  <View style={styles.colorBox2}></View>
                  <View>
                    <Text style={styles.textColor}>
                      Available for Selection
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rowTwo}>
              <View style={styles.rowSpace}>
                <View style={styles.colorBox3}></View>
                <Text style={styles.textColor}>Unavailable for Selection</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  } else {
    return <Loader />;
  }
};

const styles = StyleSheet.create({
  orderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1a1824',
    paddingRight: 5,
  },
  status: {
    fontSize: 14,
    color: '#f2ae88',
  },
  imgBoxShadow: {
    width: 98,
    height: 98,
    borderRadius: 10,
  },
  boxShadow: {
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    backgroundColor: '#0000', // invisible color
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  boxShadow2: {
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    backgroundColor: '#0000', // invisible color
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  kdColor: {
    color: '#f2ae88',
    fontSize: 13,
  },
  kdColor2: {
    color: '#f2ae88',
    fontSize: 13,
    marginHorizontal: 5,
  },

  duration: {
    color: '#f2ae88',
    fontSize: 13,
    marginHorizontal: 5,
  },
  duration2: {
    color: '#000',
    fontSize: 13,
  },
  heading2: {
    fontSize: 15,
    color: '#000',
  },
  yet: {
    fontSize: 15,
    color: '#f2ae88',
  },
  yet2: {
    fontSize: 13,
    color: '#acacac',
  },
  seleceted: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 20,
  },
  colorBox1: {
    width: 20,
    height: 20,
    backgroundColor: '#f2A884',
    marginRight: 10,
  },

  colorBox2: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },

  colorBox3: {
    width: 20,
    height: 20,
    backgroundColor: '#75798e',
    marginRight: 10,
  },

  textColor: {
    color: '#f2A884',
    fontSize: 14,
  },

  rowSpace: {
    flexDirection: 'row',
  },

  rowTwo: {
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
export default connect(mapStateToProps, null)(MyOrderDetails);
