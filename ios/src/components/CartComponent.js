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
  Clipboard,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
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
import {cartActions} from '../actions/cart';
import {paymentActions} from '../actions/payment';
import AsyncStorage from '@react-native-community/async-storage';
import OneDayCart from './Cart/OneDay';
import MultiSubCart from './Cart/MultiSub';
import ProgramsCart from './Cart/Programs';
import {commonAction} from '../actions/common';
import {Formik} from 'formik';
import * as yup from 'yup'; // for everything
const CartComponent = (props) => {
  const [BestAndWorstFood, setBestAndWorstFood] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('1');
  const [MealList, setMealList] = useState(null);
  const [Alergies, setAlergies] = useState('');
  const [height, setHeight] = useState('');
  const [loader, setLoader] = useState(true);
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('1');
  const [age, setAge] = useState('');
  const [coupon, setCoupon] = useState('');
  const [addRemove, setAddRemove] = useState(true);
  const [loaderAdd, setLoaderAdd] = useState(false);
  const [userType, setUserType] = useState('');
  const [missing, setMissing] = useState(false)
  const [missingHeight, setMissingHeight] = useState(false)
  const [missingWeight, setMissingWeight] = useState(false)
  const [missingAge, setMissingAge] = useState(false)
  const [missingGender, setMissingGender] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState('')

  const navigation = useNavigation();
  useEffect(() => {
    setAddRemove(coupon == '' ? true : false);
    const unsubscribe = navigation.addListener('focus', () => {
    // setAddRemove(coupon == '' ? true : false);
      setLoader(true);
      setMealList(null);
      setModalVisible(false);
      getData();
      getlanguage();
      // setAddRemove(coupon == '' ? true : false);
      setLoaderAdd(false);
    });
    const getlanguage = async () => {
      // let uType = await AsyncStorage.getItem('UserType');
      let verify = await AsyncStorage.getItem('verify');
      setUserType(verify);
    };
    return unsubscribe;
  }, []);
  const getData = () => {
    GET_MY_CART('user/myCart').then((data) => {
      if (data.success) {
        setMealList(data.data);
        setLoader(false);
      } else {
        Toast.showWithGravity(
          `${data.message}, Please contact to customer care`,
          Toast.SHORT,
          Toast.CENTER,
        );
        navigation.navigate('Home');
      }
    });
  };
  const applyCoupon = (addRemoved) => {
    setLoaderAdd(true);
    ADD_AND_UPDATE_API(
      {coupon},
      addRemoved ? 'user/add/coupon-in-myCart' : 'user/remove/coupon-in-myCart',
    ).then((data) => {
      setLoaderAdd(false);
      if (data.success) {
        if (addRemove === false) {
          setCoupon('');
        } 
        setAddRemove(!addRemoved);
        getData();
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.CENTER);
      } else {
        setCoupon('');
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.CENTER);
      }
    });
  };

  const guestPayment = (data) => {
    props.paymentAction(data).then((data) => {
      if (data.success) {
        setCoupon('');
        setPaymentUrl(data.data.data.paymenturl)
        navigation.navigate('Register', {
          prevScreen : 'PaymentView',
          paymentUrl: data.data.data.paymenturl
        })
      } else {
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.CENTER);
      }
    });
    navigation.navigate('Register', {
      prevScreen : 'PaymentView',
      paymentUrl: paymentUrl
    })
  }

  const validationSchema = yup.object().shape({
    height: yup
      .string()
      .required('Enter height'),
      weight: yup
      .string()
      .required('enter weight'),
      age: yup
      .string()
      .required('Please enter age')
  });
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
      payment_mode: 1,
      // is_day_off: MealList.case == '1' ? '0' : 1,
      // dataSet: MealList.case == '1' ? [] : daysOff,
    };
    console.log("Height", height);console.log("Weight", weight);console.log("Age", age);
    if(height== '' || weight== '' || age== '' || gender=='1' ){
      if(height== ''){
        setMissingHeight(true)
      } else {
        setMissingHeight(false)
      }
      if(weight== ''){
        setMissingWeight(true)
      }else {
        setMissingWeight(false)
      }
      if(age== ''){
        setMissingAge(true)
      }else {
        setMissingAge(false)
      }
      if(gender== '1'){
        setMissingGender(true)
      }else {
        setMissingGender(false)
      }
      Toast.showWithGravity('Please enter required fields', Toast.SHORT, Toast.BOTTOM);
      return
    }

    MealList.my_address.map((e, i) => {
      if (e.is_default_address) {
        data.address_id = e.id;
      }
    });
    console.log(data)
    if (data.address_id != null) {
      userType === 'Guest'
        ? guestPayment(data)
        : props.paymentAction(data).then((data) => {
            if (data.success) {
              setCoupon('');
              setPaymentUrl(data.data.data.paymenturl)
              if (data.data == null) {
                console.log("payment action from cart data.data == null", data)
                navigation.navigate('PaymentResult', {
                  result: 'Not Congratulations!',
                  status: 1,
                });
              } else {
                console.log("payment action from cart data.data != null", data)
                navigation.navigate('PaymentView', {
                  paymentUrl: data.data.data.paymenturl,
                });
              }
            } else {
              Toast.showWithGravity(data.message, Toast.SHORT, Toast.CENTER);
            }
          });
    } else {
      userType === 'Guest'
        ? Toast.showWithGravity(
          'Please add your address',
          Toast.SHORT,
          Toast.CENTER,
        )
        : Toast.showWithGravity(
            'Please add your address',
            Toast.SHORT,
            Toast.CENTER,
          );
    }
  };
  const emptyYourCart = () => {
    setAddRemove(true)
    setCoupon('');
    // applyCoupon(false)
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
          style={{backgroundColor: '#fff', paddingHorizontal: 10}}
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

            {MealList.case == '2' ? null : (
              <View style={styles.thiredSection}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 20}}>{props.labelData.coupon}</Text>
                </View>
                <View style={{flex: 2, paddingRight: 5}}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      width: '100%',
                      marginHorizontal: 10,
                      height: 35,
                      alignSelf: 'flex-start',
                      alignSelf: 'center',
                    }}>
                    <TextInput
                      style={{
                        width: '100%',
                        height: 40,
                        fontSize: 16,
                        alignSelf: 'flex-start',
                      }}
                      value={coupon}
                      onChangeText={(el) => setCoupon(el)}
                      placeholderTextColor={'lightgrey'}
                      editable={addRemove}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#f2A884',
                      paddingVertical: 7,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    }}
                    onPress={() => applyCoupon(addRemove)}>
                    {loaderAdd ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : addRemove ? (
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {props.labelData.apply}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        Remove
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
                      navigation.navigate('LocationPicker',{Action: 'add-address'});
                      // userType === 'Guest'
                      //   ? 
                      //   // navigation.navigate('Register')
                      //   navigation.navigate('Addaddress', {
                      //     Action: 'add-address',
                      //   })
                      //   // : navigation.navigate('Address');
                        
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {props.labelData.add_new_address}
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
                  <Text style={missingHeight  ? [styles.textContent, {color:'red'}] : styles.textContent}>
                    {missingHeight   ? `*${props.labelData.height}` :  props.labelData.height}
                  </Text>
                  <Formik
                    initialValues={{
                       height: '',
                     }}
                     onSubmit={(values, actions) => {
                      Keyboard.dismiss();
                      actions.setSubmitting(true);
                      setHeight(values.height)
                      actions.setValues(values.height);
                    }}
                     validationSchema={validationSchema}>

                     {({ handleChange, handleBlur, handleSubmit, values, errors}) => (
                     <View style={{flexDirection:'column'}}>
                      <TextInput
                        placeholder="170 cm"
                        style={styles.textinputs}
                        onChangeText={handleChange('height')}
                        // onChange={() => setHeight(text.replace(/[^0-9]/g, '')) }
                        // onFocus={handleChange('height')}
                        // onBlur={handleChange('height')}
                        onKeyPress={({ nativeEvent }) => {
                          nativeEvent.key === 'Backspace' && setHeight(values.height.replace(/[^0-9]/g, ''));
                        }}
                        onChange={() => setHeight(values.height.replace(/[^0-9]/g, ''))}
                        value={values.height}
                        maxLength={3}
                        keyboardType="numeric"
                        placeholderTextColor={'lightgrey'}
                      />
                     {errors.height &&
                       <Text style={{ fontSize: 10, color: 'red', position:'absolute', marginTop:'30%', marginLeft: '10%' }}>{errors.height}</Text>
                     }
                     </View>
                   )}
                  </Formik>
                </View>
              </View>
              <View style={styles.child}>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                <Text style={missingWeight  ? [styles.textContent, {color:'red'}] : styles.textContent}>
                    {missingWeight  ? `*${props.labelData.weight}` :  props.labelData.weight}
                  </Text>
                  <Formik
                    initialValues={{
                       weight: '',
                     }}
                     onSubmit={(values, actions) => {
                      Keyboard.dismiss();
                      actions.setSubmitting(true);
                      actions.setValues(values.weight);
                    }}
                     validationSchema={validationSchema}>
                       
                     {({ handleChange, handleBlur, handleSubmit, values, errors}) => (
                     <View style={{flexDirection:'column'}}>
                  <TextInput
                    placeholder="80 kg"
                    style={styles.textinputs}
                    onChangeText={handleChange('weight')}
                        // onChange={() => setHeight(text.replace(/[^0-9]/g, '')) }
                        // onFocus={handleChange('height')}
                        // onBlur={handleChange('height')}
                        // onKeyPress={({ nativeEvent }) => {
                        //   nativeEvent.key === 'Backspace' && handleChange;
                        // }}
                        onChange={() => setWeight(values.weight.replace(/[^0-9]/g) )}
                    value={values.weight}
                    maxLength={3}
                    keyboardType="numeric"
                    placeholderTextColor={'lightgrey'}
                  />
                 {errors.weight &&
                   <Text style={{ fontSize: 10, color: 'red', position:'absolute', marginTop:'30%', marginLeft: '10%' }}>{errors.weight}</Text>
                 }
                 </View>
               )}
              </Formik>
                </View>
              </View>
              <View style={styles.child}>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                <Text style={missingAge ? [styles.textContent, {color:'red'}] : styles.textContent}>
                    {missingAge ? `*${props.labelData.age}` :  props.labelData.age}
                    </Text>
                  <Formik
                    initialValues={{
                       age: '',
                     }}
                     onSubmit={(values, actions) => {
                      Keyboard.dismiss();
                      actions.setSubmitting(true);
                      actions.setValues(values.age);
                    }}
                     validationSchema={validationSchema}>
                       
                     {({ handleChange, handleBlur, handleSubmit, values, errors}) => (
                     <View style={{flexDirection:'column'}}>
                  <TextInput
                    placeholder="25 y"
                    style={styles.textinputs}
                    onChangeText={handleChange('age')}
                        // onChange={() => setHeight(text.replace(/[^0-9]/g, '')) }
                        // onFocus={handleChange('age')}
                        // onBlur={handleBlur('age')}
                        // onKeyPress={({ nativeEvent }) => {
                        //   nativeEvent.key === 'Backspace' && handleChange;
                        // }}
                    onChange={() => setAge(values.age.replace(/[^0-9]/g) )}
                    value={values.age}
                    maxLength={3}
                    keyboardType="numeric"
                    placeholderTextColor={'lightgrey'}
                  />
                 {errors.age &&
                   <Text style={{ fontSize: 10, color: 'red', position:'absolute', marginTop:'30%', marginLeft: '10%'}}>{errors.age}</Text>
                 }
                 </View>
               )}
              </Formik>
                </View>
              </View>
              <View style={styles.child}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                <Text style={missingGender ? [styles.textContent, {color:'red'}] : styles.textContent}>
                    {missingGender ? `* ${props.labelData.gender}` :  props.labelData.gender}
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
                placeholderTextColor={'lightgrey'}
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
            {/* <TouchableOpacity styl={{padding: 20, marginBottom: 10}}>
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
            </TouchableOpacity> */}
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
    paddingVertical: 10,
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
    marginVertical:5
  },
  textContent: {
    width: 58,
    textAlign: 'right',
    textAlignVertical: 'center',
    marginVertical:'2%'
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
