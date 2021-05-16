/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import Header from './Header/Header';
import Loader from '../components/Loader/Loader';
const {width} = Dimensions.get('window');
import {GET_MY_CART, ADD_AND_UPDATE_API} from '../util/api';
import Toast from 'react-native-simple-toast';
import {
  CHECKED,
  EDIT_PENCIL,
  DELETE_ICON,
  REC,
  REC_SELECTED,
  AR,
} from '../_helpers/ImageProvide';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {cartActions} from '../actions/cart';
import {paymentActions} from '../actions/payment';
import {CALANDER_CONFIG} from '../_helpers/globalVeriable';
import AsyncStorage from '@react-native-community/async-storage';
import OneDayCart from './Cart/OneDay';
import MultiSubCart from './Cart/MultiSub';
import ProgramsCart from './Cart/Programs';
import {commonAction} from '../actions/common';
const CartComponent = (props) => {
  const weekConfig = CALANDER_CONFIG;
  const [weekModalVisible, setWeekModalVisible] = useState(false);
  const [BestAndWorstFood, setBestAndWorstFood] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('1');
  const [MealList, setMealList] = useState(null);
  const [Alergies, setAlergies] = useState('');
  const [height, setHeight] = useState('');
  const [daysOff, setDaysOff] = useState([1]);
  const [loader, setLoader] = useState(true);
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('1');
  const [lan, setLan] = useState('en');
  const [age, setAge] = useState('');
  const [userType, setUserType] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true);
      setMealList(null);
      setModalVisible(false);
      getData();
      getlanguage();
    });
    const getlanguage = async () => {
      let ln = await AsyncStorage.getItem('language');
      let uType = await AsyncStorage.getItem('UserType');
      setUserType(uType);
      setLan(ln);
    };
    return unsubscribe;
  }, []);
  const getData = () => {
    GET_MY_CART('user/myCart').then((data) => {
      setMealList(data.data);
      console.log(MealList);
      data.success ? setLoader(false) : setLoader(true);
    });
  };

  const checkOut = async () => {
    var data = {
      address_id: null,
      age: age,
      alergies: Alergies,
      best_and_worst_meal: BestAndWorstFood,
      height: height,
      weight: weight,
      gender: gender,
      delivery_time: deliveryTime,
      is_day_off: MealList.case == '1' ? '0' : 1,
      payment_mode: 1,
      dataSet: MealList.case == '1' ? [] : daysOff,
    };

    MealList.my_address.map((e, i) => {
      if (e.is_default_address) {
        data.address_id = e.id;
      }
    });
    if (data.address_id != null) {
      userType === 'Guest'
        ? navigation.navigate('Register')
        : props.paymentAction(data).then((data) => {
            if (data.success) {
              navigation.navigate('PaymentView', {
                paymentUrl: data.data.data.paymenturl,
              });
            } else {
              Toast.showWithGravity(data.message, Toast.SHORT, Toast.CENTER);
            }
          });
    } else {
      userType === 'Guest'
        ? navigation.navigate('Register')
        : Toast.showWithGravity(
            'Please add your address',
            Toast.SHORT,
            Toast.CENTER,
          );
    }
  };
  const emptyYourCart = () => {
    setModalVisible(!modalVisible);
    ADD_AND_UPDATE_API({cart_id: MealList.cart_id}, 'user/remove-myCart').then(
      () => {
        props.ListOfItems();
        navigation.navigate('Home');
      },
    );
  };
  if (loader) {
    return <Loader />;
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView
          style={{backgroundColor: '#fff', paddingHorizontal: 15}}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {props.labelData.on_cart_message1}
                </Text>
                <Text style={styles.modalText}>
                  {props.labelData.on_cart_message2}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight
                    style={{...styles.openButton}}
                    onPress={() => {
                      emptyYourCart();
                    }}>
                    <Text style={styles.textStyle}>{props.labelData.yes}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{...styles.openButton}}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>{props.labelData.no}</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <View style={{flexDirection: 'column', padding: 5}}>
            <View style={{flexDirection: 'column', paddingVertical: 5}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {props.labelData.my_shopping_bag}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Image style={{marginTop: 5}} source={DELETE_ICON} />
                </TouchableOpacity>
              </View>
              <Text style={{fontSize: 15, paddingVertical: 8}}>
                {MealList.plan_type
                  ? `${props.labelData.selected_program} `
                  : MealList.meal_list.length +
                    ` ${props.labelData.items_added}`}
              </Text>
            </View>
            {MealList.case == '1' ? (
              <OneDayCart mealList={MealList} labelData={props.labelData} />
            ) : null}
            {MealList.case == '2' ? (
              <MultiSubCart mealList={MealList} labelData={props.labelData} />
            ) : null}
            {MealList.case == '3' || MealList.case == '4' ? (
              <ProgramsCart
                mealList={MealList}
                labelData={props.labelData}
                programName={
                  MealList.case == 4
                    ? props.labelData.diet_plan
                    : props.labelData.programs
                }
              />
            ) : null}

            <View
              style={[
                styles.thiredSection,
                {
                  paddingVertical: 15,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{fontSize: 25}}>{props.labelData.coupon}</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  width: width / 2.9,
                  paddingVertical: 0,
                  paddingHorizontal: 20,
                  marginHorizontal: 10,
                }}
                placeholder={props.labelData.enter_code}>
                {MealList.coupon == null ? '' : MealList.coupon}
              </TextInput>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f2A884',
                  paddingVertical: 7,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  {props.labelData.apply}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingVertical: 10}}>
              <Text style={styles.total}>
                {props.labelData.delivery_address}
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}>
                {MealList.my_address.map((address, index) => {
                  return address.is_default_address ? (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{paddingRight: 10}}>
                        <Image
                          source={address.is_default_address && CHECKED}
                          style={{width: 20, height: 20}}
                        />
                      </View>
                      <View style={{flex: 3, marginTop: -3}}>
                        <Text>{address.area}</Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}
                        onPress={() => {
                          props.pathAction('CartComponent');
                          navigation.navigate('Address');
                        }}>
                        <Text style={{paddingHorizontal: 15}}>
                          {props.labelData.edit}
                        </Text>
                        <Image source={EDIT_PENCIL} style={{height: 15}} />
                      </TouchableOpacity>
                    </View>
                  ) : null;
                })}
                <View style={{justifyContent: 'space-between', paddingTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      props.pathAction('CartComponent');
                      userType === 'Guest'
                        ? navigation.navigate('Register')
                        : navigation.navigate('LocationPicker');
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {' '}
                      + {props.labelData.add_new_address}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 10,
                borderBottomColor: '#ccc',
                borderBottomWidth: 0.5,
              }}>
              <Text style={styles.total}>{props.labelData.delivery_time}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setDeliveryTime('1');
                  }}
                  style={{flexDirection: 'row'}}>
                  <Image
                    source={deliveryTime == '1' ? REC_SELECTED : REC}
                    style={{
                      width: 14,
                      height: 14,
                      marginTop: 5,
                      marginRight: 5,
                    }}
                  />
                  <Text style={{color: 'gray', fontSize: 18}}>
                    {props.labelData.morining}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeliveryTime('2');
                  }}
                  style={{flexDirection: 'row'}}>
                  <Image
                    source={deliveryTime == '2' ? REC_SELECTED : REC}
                    style={{
                      width: 14,
                      height: 14,
                      marginTop: 5,
                      marginRight: 5,
                    }}
                  />

                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 18,
                    }}>
                    {props.labelData.evening}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.parent}>
              <View style={styles.child}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textContent}>
                    {props.labelData.height}
                  </Text>
                  <TextInput
                    placeholder="170 cm"
                    style={styles.textinputs}
                    onChangeText={(text) =>
                      setHeight(text.replace(/[^0-9]/g, ''))
                    }
                    value={height}
                    maxLength={3}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.child}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textContent}>
                    {props.labelData.weight}
                  </Text>
                  <TextInput
                    placeholder="80 kg"
                    style={styles.textinputs}
                    onChangeText={(text) =>
                      setWeight(text.replace(/[^0-9]/g, ''))
                    }
                    value={weight}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
              </View>
              <View style={styles.child}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textContent}>{props.labelData.age}</Text>
                  <TextInput
                    placeholder="25 y"
                    style={styles.textinputs}
                    onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))}
                    value={age}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
              </View>
              <View style={styles.child}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Text style={styles.textContent}>
                    {props.labelData.gender}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 5,
                      }}
                      onPress={() => setGender('2')}>
                      <Image
                        source={gender === '2' ? REC_SELECTED : REC}
                        style={{
                          width: 13,
                          height: 13,
                          margin: 2,
                        }}
                      />
                      <Text>{props.labelData.male}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 5,
                      }}
                      onPress={() => setGender('3')}>
                      <Image
                        source={gender === '3' ? REC_SELECTED : REC}
                        style={{
                          width: 13,
                          margin: 2,
                          height: 13,
                        }}
                      />
                      <Text>{props.labelData.female}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {MealList.case != '1' && (
              <View style={[styles.parent, {flexDirection: 'column'}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.total}>{props.labelData.day_off}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setWeekModalVisible(true);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      borderColor: '#ccc',
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}>
                    <Image
                      source={AR}
                      style={{
                        alignSelf: 'center',
                        width: 10,
                        height: 15,
                        marginRight: 5,
                      }}
                    />
                    <Text style={{color: 'gray', fontSize: 18}}>
                      {props.labelData.selected}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text>Selected Days</Text>
                <View style={{flexDirection: 'row'}}>
                  {daysOff.map((e, i) => {
                    return (
                      <Text key={i}>{weekConfig[lan].dayNames[e - 1]}, </Text>
                    );
                  })}
                </View>
              </View>
            )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={weekModalVisible}>
              <View style={styles.weekcenteredView}>
                <View style={styles.modalView}>
                  <View style={{flexDirection: 'column'}}>
                    {weekConfig[lan].dayNames.map((e, i) => {
                      let weekdays = daysOff;
                      var idx = weekdays.indexOf(i + 1);
                      return (
                        <TouchableHighlight
                          key={i}
                          style={{...styles.weekButton}}
                          onPress={() => {
                            if (idx == -1) {
                              weekdays.push(i + 1);
                            } else {
                              if (daysOff.length > 1) {
                                weekdays.splice(idx, 1);
                              }
                            }
                            setDaysOff(weekdays);
                            setWeekModalVisible(false);
                          }}>
                          <Text
                            style={[
                              {
                                color: '#9D9C9D',
                                textAlign: 'right',
                              },
                              idx != -1 && {
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                                textDecorationColor: '#ef6a41',
                              },
                            ]}>
                            {e}
                          </Text>
                        </TouchableHighlight>
                      );
                    })}
                  </View>
                </View>
              </View>
            </Modal>
            <View style={[styles.parent, {flexDirection: 'column'}]}>
              <Text style={styles.total}>{props.labelData.alergies}</Text>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder={props.labelData.type_info}
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={(text) => setAlergies(text)}
              />
            </View>
            <View style={[styles.parent, {flexDirection: 'column'}]}>
              <Text style={styles.total}>
                {props.labelData.best_and_worst_meal}
              </Text>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder={props.labelData.i_prefer_meet_and_i_hage_seafood}
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={(text) => setBestAndWorstFood(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => checkOut()}
              style={{
                backgroundColor: '#f2A884',
                paddingVertical: 15,
                marginVertical: 10,
                alignContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {props.labelData.proceed_to_checkout}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity styl={{padding: 20, marginBottom: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  borderBottomColor: '#2c2c2c',
                  borderBottomWidth: 5,
                  borderRadius: 1,
                  alignSelf: 'center',
                  fontSize: 15,
                  paddingVertical: 10,
                }}>
                {props.labelData.continue_shopping}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  itemContent: {
    fontSize: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#F2A884',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#f2A884',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 25,
    marginHorizontal: 5,
    elevation: 2,
  },
  weekButton: {
    padding: 10,
    paddingHorizontal: 25,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  thiredSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width / 1.2,
    alignSelf: 'flex-end',
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
    fontSize: 10.5,
    fontWeight: '700',
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  weekcenteredView: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  parent: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    paddingVertical: 13,
  },
  child: {
    flexBasis: '46%',
  },
  textContent: {
    width: 58,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  textinputs: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: 85,
    padding: 2,
    margin: 5,
    textAlign: 'center',
  },
  textArea: {
    height: 120,
    justifyContent: 'flex-start',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: width / 1.15,
    marginVertical: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    paymentData: state.paymentReducer.paymentData,
    labelData: state.labelReducer.labelData,
  };
};
const actionCreators = {
  paymentAction: paymentActions.paymentAction,
  ListOfItems: cartActions.ListOfItems,
  pathAction: commonAction.pathFinder,
};
export default connect(mapStateToProps, actionCreators)(CartComponent);
