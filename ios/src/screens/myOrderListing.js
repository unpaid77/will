import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  I18nManager,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import moment from 'moment';

import Header from '../components/Header/Header';
import {
  COMMON_ARROW_LEFT,
  CHECK_GREEN,
  AR,
  COMMON_ARROW_RIGHT,
  PLUS_ORANGE,
  IN_ICON,
  IMAGE_CDN,
} from '../_helpers/ImageProvide';
let styleCss = require('../GlobalStyle');
import {ADD_TO_THE_CART, ADD_AND_UPDATE_API} from '../util/api';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Loader from '../components/Loader/Loader';
import {useNavigation} from '@react-navigation/native';

const MyOrderListing = (props) => {
  const {
    orderD,
    weekly_details,
    day,
    weekIN,
    oneDayPlan,
    meal_avilablity_date,
    date,
  } = props.route.params;
  let [orderDetail, setOrderDetail] = useState();
  let [orderDetails, setOrderDetails] = useState();
  let [weeklyDetails, setWeeklyDetails] = useState();
  let [weekIndex, setWeekIndex] = useState();
  let [selectedDate, setselectedDate] = useState();
  let [nextShow, setNextShow] = useState();
  let [selectedItem, setSelectedItem] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {
    setWeekIndex(weekIN);
    const unsubscribe = navigation.addListener('focus', () => {
      setOrderDetail();
      setWeeklyDetails({...weekly_details});
      setOrderDetails({...orderD});
      updateData(orderD);
      setselectedDate(day.dateString);
    });
    return unsubscribe;
  }, [orderD, weekly_details, day, meal_avilablity_date, weekIN, oneDayPlan]);

  const updateData = (order) => {
    setNextShow(false);
    let tmpOrder = {...order};
    tmpOrder = tmpOrder.package_diet_package.map((e, i) => {
      let meal = e.meal.map((meal, j) => {
        let meal_list = meal.meal_list.map((meal_list, k) => {
          return {...meal_list, isSelected: false};
        });
        return {...meal, isSelected: false, meal_list};
      });
      return {...e, isSelected: false, meal};
    });
    if (order.selected_meal.length != 0) {
      order.selected_meal.map((sm) => {
        tmpOrder.forEach((e, i) => {
          e.meal.forEach((meal, j) => {
            meal.meal_list.forEach((meal_list, k) => {
              if (sm.meal_id == meal_list.meal_id) {
                tmpOrder[i].meal[j].meal_list[k].isSelected = true;
                tmpOrder[i].meal[j].isSelected = true;
                tmpOrder[i].isSelected = true;
              }
            });
          });
        });
      });
    }
    setOrderDetail([...tmpOrder]);
  };
  const selectItemRestaurent = (number_of_meals, i, j, k) => {
    let tmpOrder = [...orderDetail];
    let findUnselectedMeal = tmpOrder[i].meal.filter(
      (e) => e.isSelected == true,
    );
    if (findUnselectedMeal.length == number_of_meals) {
      if (tmpOrder[i].meal[j].meal_list[k].isSelected) {
        tmpOrder[i].meal[j].meal_list[k].isSelected = false;
        tmpOrder[i].meal[j].isSelected = false;
        tmpOrder[i].isSelected = false;
      } else {
        Toast.showWithGravity(
          `You can only select ${number_of_meals} meal from this list`,
          Toast.SHORT,
          Toast.CENTER,
        );
      }
    } else {
      tmpOrder[i].meal[j].meal_list[k].isSelected = true;
      tmpOrder[i].meal[j].isSelected = true;
      tmpOrder[i].isSelected = true;
    }
    setOrderDetail(tmpOrder);
  };

  const checkoutList = () => {
    setNextShow(date.end_date == selectedDate ? false : true);
    let findUnselectedMeal = orderDetail.filter((e) => e.isSelected == false);
    if (findUnselectedMeal.length > 0) {
      Toast.showWithGravity(
        'Please select atleast one meal from each selection.',
        Toast.SHORT,
        Toast.CENTER,
      );
    } else {
      let meals = [];
      orderDetail.forEach((item) => {
        item.meal.forEach((meal) => {
          meal.meal_list.forEach((meal_list) => {
            if (meal_list.isSelected) {
              meals = [
                ...meals,
                {
                  day: orderDetails.basic.day,
                  plan_diet_package_id: meal.plan_diet_package_id,
                  meal_type: item.meal_type,
                  meal_id: meal_list.meal_id,
                  price: meal_list.price,
                },
              ];
            }
          });
        });
      });
      let payLoad = {
        order_id: orderDetails.basic.order_id,
        user_order_days: [
          {
            user_order_week_id: orderDetails.basic.user_order_week_id,
            week: orderDetails.basic.week,
            day: orderDetails.basic.day,
            date: selectedDate,
            meals,
          },
        ],
      };
      ADD_TO_THE_CART(payLoad, 'user/order/meal/modify').then((res) => {
        if (res.success) {
          Toast.showWithGravity(res.message, Toast.SHORT, Toast.CENTER);
          // navigation.goBack();
        } else {
          Toast.showWithGravity(res.message, Toast.SHORT, Toast.CENTER);
        }
      });
    }
  };
  const nextEvent = async () => {
    // await checkoutList();
    var tomorrow = new Date(selectedDate);
    tomorrow.setDate(new Date(selectedDate).getDate() + 1);
    let date = moment(tomorrow).format('DD-MM-YYYY');
    setselectedDate(moment(tomorrow).format('YYYY-MM-DD'));
    meal_avilablity_date.forEach((element) => {
      if (date == element.date) {
        mealCheck(element);
      }
    });
  };
  const mealCheck = (element) => {
    let data = {};
    setWeekIndex(element.week - 1);
    data = {
      plan_packages_id: element.plan_packages_id,
      order_id: orderDetails.basic.order_id,
      week: element.week,
      day: element.day,
      user_order_week_id: element.user_order_week_id,
    };
    ADD_AND_UPDATE_API(data, 'plan/package/meal/list').then((res) => {
      if (res.success) {
        setOrderDetails({...res.data});
        updateData(res.data);
      }
    });
  };
  const selectItem = (index) => {
    setSelectedItem(false)
  }

  if (orderDetail) {
    return (
      <>
        <Header />
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={styleCss.mainContainer}>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <View style={{position: 'absolute', left: 10, top: '44%'}}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Image
                    style={{width: 30, height: 19}}
                    source={
                      I18nManager.isRTL ? COMMON_ARROW_RIGHT : COMMON_ARROW_LEFT
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styleCss.featureBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: 140,
                        height: 100,
                        borderRadius: 10,
                      }}
                      source={{
                        uri: 
                        IMAGE_CDN + weeklyDetails[0].restuarant_image,
                          // IMAGE_CDN + weeklyDetails[weekIndex].restuarant_image,
                      }}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#ef8361',
                        fontSize: 16,
                      }}>
                      {
                      // weeklyDetails[weekIndex].restaurant_name
                      weeklyDetails[0].restaurant_name
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 15,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{flex: 2}}>
                <Text style={{fontSize: 18, fontWeight: '700'}}>
                  {props.labelData.your_plan
                    ? props.labelData.your_plan
                    : 'Your Plan'}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#aaaaaa',
                    flexDirection: 'row',
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  <View>
                    <Text>
                      {props.labelData.day} {orderDetails.basic.day}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center', paddingLeft: 5}}>
                    <Image style={{width: 12, height: 16}} source={AR} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={[{marginTop: 10}, styleCss.mainContainer]}>
            <View style={{paddingBottom: 30}}>
              <View>
                {orderDetail.map((item, index) => {
                  return (
                    <Collapse isCollapsed={selectedItem} key={index}>
                      <CollapseHeader>
                        <TouchableOpacity
                          onPress={() => selectItem(index)}
                          activeOpacity={0.9}>
                          <View style={styles.heading}>
                            <Text style={styles.text}>{item.meal_name}</Text>
                            <View>
                              <Image
                                style={{width: 20, height: 20}}
                                source={IN_ICON}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </CollapseHeader>
                      <CollapseBody>
                        <View style={styles.cardBox}>
                          {item.meal.map((list, i) => {
                            return (
                              <View style={styles.borderBottomBox} key={i}>
                                {list.meal_list.map((meal, ind) => {
                                  return (
                                    <View key={ind}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          selectItemRestaurent(
                                            item.number_of_meals,
                                            index,
                                            i,
                                            ind,
                                          )
                                        }>
                                        <Text style={styles.kd}>
                                          KD {meal.price}
                                        </Text>
                                        <View style={{flexDirection: 'row'}}>
                                          <View>
                                            <View style={styles.imgBox}>
                                              <Image
                                                style={{
                                                  width: 63,
                                                  height: 70,
                                                  borderRadius: 10,
                                                }}
                                                source={{
                                                  uri: IMAGE_CDN + meal.image,
                                                }}
                                              />
                                            </View>
                                          </View>

                                          <View
                                            style={{
                                              flex: 2,
                                              paddingHorizontal: 10,
                                            }}>
                                            <Text style={styles.headingText}>
                                              {meal.meal_name}
                                            </Text>
                                            <Text style={styles.itemContent}>
                                              {meal.discription}
                                            </Text>
                                          </View>
                                          <View style={{width: 100}}>
                                            <View>
                                              <View
                                                style={{
                                                  alignItems: 'flex-end',
                                                  marginTop: 10,
                                                }}>
                                                <Image
                                                  style={{
                                                    width: 22,
                                                    height: 22,
                                                  }}
                                                  source={
                                                    meal.isSelected
                                                      ? CHECK_GREEN
                                                      : PLUS_ORANGE
                                                  }
                                                />
                                              </View>
                                            </View>
                                            <View style={styles.powerBox}>
                                              <View
                                                style={{
                                                  flexDirection: 'row',
                                                }}>
                                                <Text style={styles.itemText}>
                                                  P {Math.round(meal.protein)}g
                                                </Text>
                                                <Text style={styles.itemText}>
                                                  Ca {Math.round(meal.calorie)}
                                                </Text>
                                              </View>
                                              <View
                                                style={{
                                                  flexDirection: 'row',
                                                  marginTop: 10,
                                                }}>
                                                <Text style={styles.itemText}>
                                                  C{' '}
                                                  {Math.round(
                                                    meal.carbohydrate,
                                                  )}
                                                  g
                                                </Text>
                                                <Text style={styles.itemText}>
                                                  F {Math.round(meal.fat)}g
                                                </Text>
                                              </View>
                                            </View>
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                  );
                                })}
                              </View>
                            );
                          })}
                        </View>
                      </CollapseBody>
                    </Collapse>
                  );
                })}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={[styleCss.btnButton, {width: width / 2.5}]}
                    onPress={() => checkoutList()}>
                    <Text style={styles.checkoutText}>
                      {props.labelData.save}
                    </Text>
                  </TouchableOpacity>
                  {nextShow ? (
                    <TouchableOpacity
                      style={[styleCss.btnButton, {width: width / 2.5}]}
                      onPress={() => nextEvent()}>
                      <Text style={styles.checkoutText}>
                        {props.labelData.next}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
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
  cardBox: {
    //backgroundColor: 'red',
    width: '100%',
    shadowOffset: {width: 10, height: 5},
    shadowColor: '#F2A884',
    shadowOpacity: 8,
    elevation: 3,
    backgroundColor: 'white', // invisible color
    borderRadius: 20,
    padding: 10,
    marginVertical: 15,
  },
  kd: {
    fontSize: 10,
    textAlign: 'right',
  },
  itemText: {
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  itemContent: {
    fontSize: 10,
  },

  powerBox: {
    borderWidth: 1,
    borderColor: '#f2cab3',
    borderTopLeftRadius: 8,
    padding: 5,
    marginTop: 10,
  },

  borderBottomBox: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingBottom: 10,
    marginBottom: 10,
  },

  imgBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 5,
    width: 75,
  },
  headingText: {
    fontSize: 10.5,
    fontWeight: '700',
    marginBottom: 5,
  },
  topPick: {
    borderWidth: 1,
    borderColor: '#f3b490',
    width: 50,
    position: 'absolute',
    left: -8,
    top: 2,
    zIndex: 9,
    backgroundColor: 'white',
    transform: [{rotate: '330deg'}],
  },
  toppickText: {
    fontSize: 10,
    color: '#f3b490',
    textAlign: 'center',
  },

  heading: {
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    shadowColor: '#F2A884',
    flexDirection: 'row',
    width: width * 0.88,
    shadowOpacity: 5,
    paddingBottom: 5,
    borderRadius: 5,
    paddingTop: 5,
    elevation: 5,
    margin: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },

  checkout: {
    backgroundColor: '#f2A884',
    bottom: 0,
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 5,
    marginTop: 10,
  },
  checkoutText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
export default connect(mapStateToProps, null)(MyOrderListing);
