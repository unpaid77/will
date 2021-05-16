/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';

import Header from '../../components/Header/Header';
import {
  CHECK_GREEN,
  PLUS_ORANGE,
  UP_DOWN_ARROW_BLACK,
  UP_ICON,
  IN_ICON,
  IMAGE_CDN,
} from '../../_helpers/ImageProvide';
import Loader from '../../components/Loader/Loader';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {cartActions} from '../../actions/cart';
import {ADD_TO_THE_CART} from '../../util/api';
let styleCss = require('../../GlobalStyle');
var gloableVariable = [];
var MealTitle = [];
var isSkipped = 0;
const MealSelection = React.memo((props) => {
  const navigation = useNavigation();
  const {BasicInfo, selectedPlan, GenderId, Meal, week} = props.route.params;
  const [mealDataInfo, setmealDataInfo] = useState([]);
  const [daysNumber, setDaysNumber] = useState(1);
  // const [isSkipped, setisSkipped] = useState(0);
  const [MealList, setMealList] = useState([]);
  const [NumberOfWeek, setNumberOfWeek] = useState(1);
  const [getPlan_packages_id, setPlan_packages_id] = useState();
  const [tempDietCompany, setTempDietCompany] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setmealDataInfo([]);
      setDaysNumber(1);
      // setMealTitle([]);
      setMealList([]);
      setNumberOfWeek(1);
      setPlan_packages_id();
      setTempDietCompany([]);
      initializeMeal();
    });
    return unsubscribe;
  }, []);
  const initializeMeal = () => {
    let data = [...Meal.package_diet_package];
    data = data.map((item) => {
      item.meal = item.meal.map((meal) => {
        return {...meal, isSelected: false};
      });
      return {...item, isSelected: false};
    });
    setmealDataInfo(data);
  };
  const selectMeal = (number_of_meals, index, mindex) => {
    let tmpMealListing = [...mealDataInfo];
    let tmpNumber = tmpMealListing[index].meal.filter(
      (e) => e.isSelected == true,
    );

    if (tmpMealListing[index].meal[mindex].isSelected) {
      tmpMealListing[index].meal[mindex].isSelected = false;
      if (tmpNumber.length == number_of_meals) {
        tmpMealListing[index].isSelected = false;
      }
    } else {
      if (tmpNumber.length < number_of_meals) {
        tmpMealListing[index].meal[mindex].isSelected = true;
        tmpMealListing[index].isSelected = true;
      } else {
        Toast.showWithGravity(
          `You can only select ${number_of_meals} meal from this list`,
          Toast.SHORT,
          Toast.CENTER,
        );
      }
    }
    setmealDataInfo([...tmpMealListing]);
  };

  const checkoutList = () => {
    let findUnselectedMeal = mealDataInfo.filter((e) => e.isSelected == false);
    if (findUnselectedMeal.length > 0) {
      Toast.showWithGravity(
        'Please select atleast one meal from each section.',
        Toast.SHORT,
        Toast.CENTER,
      );
    } else {
      if (daysNumber % 7 === 0) {
        apiCall(NumberOfWeek);
      }

      mealDataInfo.forEach((e) => {
        e.meal.forEach((meal) => {
          meal.meal_list.forEach((meal_list) => {
            if (meal.isSelected) {
              MealTitle.push({
                day: daysNumber,
                plan_diet_package_id: meal.plan_diet_package_id,
                meal_type: e.meal_type,
                meal_id: meal_list.meal_id,
              });
            }
          });
        });
      });
      if (daysNumber === NumberOfWeek * 7) {
        setDaysNumber(0);
        mealCollection(NumberOfWeek);
        setNumberOfWeek(NumberOfWeek + 1);
      } else {
        setDaysNumber(daysNumber + 1);
      }
      initializeMeal();
      upButtonHandler();
    }
  };
  const saveForLater = () => {
    isSkipped = 1;
    for (let i = NumberOfWeek; i <= week; i++) {
      if (i == week) {
        apiCall(i);
      } else {
        if (i <= week) {
          mealCollection(i);
        }
      }
      setNumberOfWeek(i + 1);
    }
  };

  const mealCollection = (i) => {
    // let tmpvalue = [
    //   ...tempDietCompany,
    //   {
    //     restaurant_id: props.restaurant_id,
    //     week: i,
    //     plan_id: Meal.plan_id,
    //     plan_packages_id: getPlan_packages_id,
    //     meals: MealTitle,
    //   },
    // ];
    gloableVariable.push({
      restaurant_id: props.restaurant_id,
      week: i,
      plan_id: Meal.plan_id,
      plan_packages_id: getPlan_packages_id,
      program_id: props.program_id,
      meals: MealTitle,
    });
    // setTempDietCompany([...tmpvalue]);
    MealTitle = [];
  };
  const apiCall = (NFW) => {
    let myArray = [...MealTitle];
    myArray = myArray.filter(function (obj) {
      return obj.day !== null && obj;
    });
    mealCollection(NFW);

    if (NFW == week) {
      let cartTemp = {
        duration_type: BasicInfo.duration_type,
        relative_id: BasicInfo.relative_id,
        start_date: props.selectedDate,
        plan_type: BasicInfo.plan_type,
        duration: BasicInfo.duration,
        diet_company: gloableVariable,
        type: BasicInfo.type,
        gender: GenderId,
        is_skipped_for_later: isSkipped,
      };

      ADD_TO_THE_CART(cartTemp, 'user/addToCart').then((data) => {
        if (data.success) {
          props.ListOfItems();
          initializeMeal();
          navigation.navigate('CartComponent');
        } else {
          Toast.showWithGravity(data.message, Toast.SHORT, Toast.CENTER);
        }
      });
    }
  };
  let listViewRef = useRef();
  const upButtonHandler = () => {
    listViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  if (selectedPlan) {
    return (
      <>
        <Header />
        <ScrollView
          style={{backgroundColor: '#ffffff'}}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          ref={listViewRef}>
          <View>
            <Swiper
              style={{height: 200}}
              showsButtons={false}
              loop={true}
              autoplayTimeout={4}
              showsPagination={true}
              paginationStyle={{bottom: 10}}
              removeClippedSubviews={false}
              backgroundColor="transparent"
              activeDotColor="#f2925e"
              resizeMode="center"
              autoplay={true}>
              {selectedPlan.coverimage.map((item, index) => (
                <Image
                  key={index}
                  style={styles.img}
                  source={{
                    uri: selectedPlan.image_url + item.image,
                  }}
                />
              ))}
            </Swiper>
            <View style={styles.back}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={{color: '#f2A884', fontSize: 11}}>
                  {props.labelData.back}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[{marginTop: 10}, styleCss.mainContainer]}>
            <View
              style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              {daysNumber > 1 && (
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    marginHorizontal: 5,
                    paddingHorizontal: 15,
                    alignSelf: 'flex-end',
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    elevation: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => saveForLater()}>
                  <Text style={{fontWeight: 'bold', paddingRight: 5}}>
                    Checkout
                  </Text>
                </TouchableOpacity>
              )}
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  alignSelf: 'flex-end',
                  flexDirection: 'row',
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                  elevation: 10,
                  borderRadius: 10,
                }}>
                <Text style={{fontWeight: 'bold', paddingRight: 5}}>
                  {props.labelData.day} {daysNumber}
                </Text>
                <Image
                  source={UP_DOWN_ARROW_BLACK}
                  style={{
                    width: 15,
                    height: 15,
                    marginTop: 3,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                marginBottom: 20,
              }}>
              {mealDataInfo.map((item, mtindex) => {
                return (
                  <Collapse isCollapsed={true} key={mtindex}>
                    <CollapseHeader>
                      <TouchableOpacity activeOpacity={0.9}>
                        <View style={styles.heading}>
                          <Text style={styles.text}>{item.meal_name}</Text>
                          <View>
                            <Image
                              style={{width: 20, height: 20}}
                              source={item.selected ? UP_ICON : IN_ICON}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                      <View style={styles.cardBox}>
                        {item.meal.map((mealData, mindex) => {
                          return mealData.meal_list.map((meal_list, ml) => {
                            return (
                              <View style={styles.borderBottomBox} key={ml}>
                                <TouchableOpacity
                                  key={ml}
                                  onPress={() => {
                                    setPlan_packages_id(item.plan_packages_id);
                                    selectMeal(
                                      item.number_of_meals,
                                      mtindex,
                                      mindex,
                                      ml,
                                      meal_list,
                                      meal_list.meal_id,
                                      mealData.plan_diet_package_id,
                                      mealData.id,
                                      item.meal_type,
                                    );
                                  }}>
                                  <View>
                                    <View style={{flexDirection: 'row'}}>
                                      <View>
                                        <View style={styles.imgBox}>
                                          <Image
                                            style={{
                                              width: 70,
                                              height: 60,
                                              borderRadius: 10,
                                            }}
                                            source={{
                                              uri: IMAGE_CDN + meal_list.image,
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
                                          {meal_list.meal_name}
                                        </Text>
                                        <Text style={styles.itemContent}>
                                          {meal_list.discription}
                                        </Text>
                                      </View>

                                      <View style={{width: 100}}>
                                        <View>
                                          <View
                                            style={{
                                              alignItems: 'flex-end',
                                              marginBottom: 10,
                                            }}>
                                            <Image
                                              style={{
                                                width: 22,
                                                height: 23,
                                              }}
                                              source={
                                                mealData.isSelected
                                                  ? CHECK_GREEN
                                                  : PLUS_ORANGE
                                              }
                                            />
                                          </View>
                                        </View>
                                        <View style={styles.powerBox}>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.itemText}>
                                              P
                                              {Math.round(
                                                meal_list.protein,
                                              ).toFixed(2)}
                                              g
                                            </Text>
                                            <Text style={styles.itemText}>
                                              Ca
                                              {Math.round(
                                                meal_list.calorie,
                                              ).toFixed(2)}
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
                                                meal_list.carbohydrate,
                                              )}
                                              g
                                            </Text>
                                            <Text style={styles.itemText}>
                                              F {Math.round(meal_list.fat)}g
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            );
                          });
                        })}
                      </View>
                    </CollapseBody>
                  </Collapse>
                );
              })}

              <TouchableOpacity
                style={styleCss.btnButton}
                onPress={() => checkoutList()}>
                <Text style={styles.checkoutText}>
                  {daysNumber != week * 7 &&
                    `${daysNumber * NumberOfWeek} / ${week * 7}`}
                  {'   '}
                  {daysNumber === week * 7
                    ? props.labelData.checkout
                    : props.labelData.continue}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  } else return <Loader />;
});

const styles = StyleSheet.create({
  cardBox: {
    //backgroundColor: 'red',
    alignSelf: 'center',
    width: '100%',
    elevation: 3,
    backgroundColor: 'white', // invisible color
    borderRadius: 10,
    marginVertical: 15,
    padding: 10,
  },
  imgBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 5,
    width: 80,
  },
  back: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    position: 'absolute',
    borderRadius: 10,
    bottom: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  img: {
    height: 200,
    width: '100%',
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
    marginTop: 5,
  },

  headingText: {
    fontSize: 10.5,
    fontWeight: '700',
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
    marginVertical: 20,
  },
  checkoutText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  borderBottomBox: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    programPlanData: state.programPlanReduce.programPlanData,
    mealListData: state.mealListReducer.mealListData,
    restaurant_id: state.cartReducer.restaurant_id,
    selectedPlan: state.cartReducer.selectedPlan,
    selectedDate: state.cartReducer.selectedDate,
    features_id: state.cartReducer.features_id,
    program_id: state.cartReducer.program_id,
    labelData: state.labelReducer.labelData,
    imageUrl: state.cartReducer.imageUrl,
  };
};
const mapActionToProps = {
  ListOfItems: cartActions.ListOfItems,
};
export default connect(mapStateToProps, mapActionToProps)(MealSelection);
