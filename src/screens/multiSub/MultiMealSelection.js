/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';
import Header from '../../components/Header/Header';
import {multiSubActions} from '../../actions/multiSub';
import {connect} from 'react-redux';
import {ADD_TO_THE_CART} from '../../util/api';
import {
  CHECK_GREEN,
  PLUS_ORANGE,
  UP_DOWN_ARROW_BLACK,
  IN_ICON,
} from '../../_helpers/ImageProvide';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {IMAGE_CDN} from '../../_helpers/globalVeriable';
import Loader from '../../components/Loader/Loader';
import {cartActions} from '../../actions/cart';
let styleCss = require('../../GlobalStyle');

const MultiMealSelection = (props) => {
  const navigation = useNavigation();
  const [daysNumber, setDaysNumber] = useState(1);
  const [mealListing, setmealListing] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDaysNumber(1);
      setmealListing([]);
      setSelectedData([]);
      getPrimaryData();
    });
    return () => {
      unsubscribe;
    };
  }, [props.LIST_ITEMS]);
  const mealListingList = (
    id,
    meal_id,
    index,
    mealListData,
    meal_type,
    plan_diet_package_id,
  ) => {
    setmealListing(
      mealListing.map((x, i) => {
        if (index === i) {
          x.id = id;
          x.meal_id = meal_id;
          x.selectedData = mealListData;
          x.day = daysNumber;
          x.plan_diet_package_id = plan_diet_package_id;
          x.meal_type = meal_type;
        }
        return x;
      }),
    );
  };

  const getPrimaryData = () => {
    let array = [];
    if (props.LIST_ITEMS) {
      props.LIST_ITEMS.plan_package.data.package_diet_package.map((item) => {
        array.push({
          id: null,
          meal_id: null,
          data: item,
          selectedData: null,
          day: null,
          plan_diet_package_id: null,
          meal_type: null,
        });
      });
    }
    setmealListing(array);
  };

  const checkoutList = () => {
    let tf = true;
    // check for null meal value
    mealListing.map((item) => {
      if (item.id === null) {
        tf = false;
        Toast.showWithGravity(
          'Please select atlist one meal from each section.',
          Toast.SHORT,
          Toast.CENTER,
        );
      }
    });
    if (tf) {
      // remove the null value element
      let tempVar = selectedData;
      mealListing.map((data) => {
        tempVar.push({
          day: data.day,
          meal_id: data.meal_id,
          meal_type: data.meal_type,
          plan_diet_package_id: data.plan_diet_package_id,
        });
      });
      setSelectedData(tempVar);

      if (daysNumber === 7) {
        let tmpArray =
          props.selectedMeals === undefined ? [] : props.selectedMeals;

        if (props.selectedWeek === props.multiSubWeek) {
          let sendData = {
            duration_type: props.LIST_ITEMS.duration_type,
            relative_id: props.LIST_ITEMS.relative_id,
            plan_type: props.LIST_ITEMS.plan_type,
            duration: props.LIST_ITEMS.duration,
            start_date: props.selectedDate,
            gender: 1,
            type: 1,
            diet_company: [
              ...tmpArray,
              {
                plan_packages_id: props.LIST_ITEMS.plan_package.packageId,
                restaurant_id: props.LIST_ITEMS.restaurant_id,
                program_id: props.LIST_ITEMS.program_id,
                plan_id: props.LIST_ITEMS.plan_id,
                week: props.selectedWeek,
                meals: tempVar,
              },
            ],
          };
          sendData.diet_company.map((data, i) => {
            if (data === undefined) {
              sendData.diet_company.splice(i, 1);
            }
          });
          ADD_TO_THE_CART(sendData, 'user/addToCart').then((data) => {
            if (data.success) {
              props.ListOfItems();
              navigation.navigate('CartComponent');
            } else {
              Toast.showWithGravity(data.message, Toast.SHORT, Toast.CENTER);
            }
          });
        } else {
          props.multiSubSelectedWeek(props.selectedWeek + 1);
          props.multiSubAddSelectedData({
            restaurant_id: props.LIST_ITEMS.restaurant_id,
            week: props.selectedWeek,
            program_id: props.LIST_ITEMS.program_id,
            plan_id: props.LIST_ITEMS.plan_id,
            plan_packages_id: props.LIST_ITEMS.plan_package.packageId,
            meals: tempVar,
          });
          navigation.navigate('MultiSubs');
        }
      }
      daysNumber != 7 && setDaysNumber(daysNumber + 1);
      getPrimaryData();
    }
  };
  if (props.LIST_ITEMS && mealListing) {
    return (
      <>
        <Header />
        <ScrollView
          style={{backgroundColor: '#ffffff'}}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
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
              <Image
                style={styles.img}
                source={{
                  uri: IMAGE_CDN + props.LIST_ITEMS.image,
                }}
              />
            </Swiper>
            <View style={styles.back}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: '#f2A884', fontSize: 11}}>
                  {props.labelData.back}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[{marginTop: 10}, styleCss.mainContainer]}>
            <View style={{padding: 5, justifyContent: 'flex-end'}}>
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
                  `${props.labelData.day} ${daysNumber}`
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

            <View style={{marginBottom: 30}}>
              {mealListing.map((item, mtindex) => {
                return (
                  <Collapse isCollapsed={true} key={mtindex}>
                    <CollapseHeader>
                      <TouchableOpacity activeOpacity={0.9}>
                        <View style={styles.heading}>
                          <Text style={styles.text}>{item.data.meal_name}</Text>
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
                        {item.data.meal.map((meal_list, mlindex) => {
                          return meal_list['meal_list'].map(
                            (mealListData, mldindex) => {
                              return (
                                <TouchableOpacity
                                  key={mldindex}
                                  onPress={() => {
                                    mealListingList(
                                      meal_list.id,
                                      mealListData.meal_id,
                                      mtindex,
                                      mealListData,
                                      mealListData.meal_type_id,
                                      meal_list.plan_diet_package_id,
                                    );
                                  }}>
                                  <View style={styles.borderBottomBox}>
                                    <Text style={styles.kd}>
                                      {props.labelData.price} :{' '}
                                      {mealListData.price} KD
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
                                              uri:
                                                IMAGE_CDN + mealListData.image,
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
                                          {mealListData.meal_name}
                                        </Text>
                                        <Text style={styles.itemContent}>
                                          {mealListData.discription}
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
                                                height: 23,
                                                marginLeft: 5,
                                              }}
                                              source={
                                                item.id === meal_list.id &&
                                                item.meal_id ===
                                                  mealListData.meal_id
                                                  ? CHECK_GREEN
                                                  : PLUS_ORANGE
                                              }
                                            />
                                          </View>
                                        </View>

                                        {/* Power box */}

                                        <View style={styles.powerBox}>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.itemText}>
                                              P{' '}
                                              {Math.round(mealListData.protein)}
                                              g
                                            </Text>
                                            <Text style={styles.itemText}>
                                              Ca{' '}
                                              {Math.round(mealListData.calorie)}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              marginTop: 10,
                                            }}>
                                            <Text style={styles.itemText}>
                                              C
                                              {Math.round(
                                                mealListData.carbohydrate,
                                              )}
                                              g
                                            </Text>
                                            <Text style={styles.itemText}>
                                              F {Math.round(mealListData.fat)}g
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            },
                          );
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
                  {daysNumber != 7 && `${daysNumber} / 7`}
                  {'   '}
                  {daysNumber === 7
                    ? props.labelData.next
                    : props.labelData.continue}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  } else return <Loader />;
};

const mapStateToProps = (state) => {
  return {
    multiSubWeek: state.commonReducer.multiSubWeek,
    selectedWeek: state.commonReducer.selectedWeek,
    selectedMeals: state.multiSubReducer.selectedMeal,
    LIST_ITEMS: state.multiSubReducer.list_items,
    labelData: state.labelReducer.labelData,
    selectedDate: state.cartReducer.selectedDate,
  };
};
const actionCreators = {
  multiSubAction: multiSubActions.multiSubAction,
  multiSubSelectedWeek: multiSubActions.multiSubSelectedWeek,
  ListOfItems: cartActions.ListOfItems,
  multiSubAddSelectedData: multiSubActions.multiSubAddSelectedData,
};
export default connect(mapStateToProps, actionCreators)(MultiMealSelection);

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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 5,
    width: 75,
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
    resizeMode: 'center',
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
