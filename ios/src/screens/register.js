import React, {useEffect, useState} from 'react';
import {cartActions} from '../actions/cart';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Text,
  Switch,
  BackHandler,
  Platform,
  Keyboard,
} from 'react-native';
import {getUniqueId, getSystemName} from 'react-native-device-info';
import {Formik} from 'formik';
import * as yup from 'yup'; // for everything
import Toast from 'react-native-simple-toast';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {registerActions} from '../actions/registrationAction';
import {loginActions} from '../actions/login';
import AsyncStorage from '@react-native-community/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {
  REGISTER_button,
  LOGIN_email,
  LOGIN_logo,
  LOGIN_pass,
  REC,
  REC_SELECTED,
} from '../_helpers/ImageProvide';
const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View style={{marginHorizontal: 20, marginVertical: 1}}>
    <Text style={{marginBottom: 3}}>{label}</Text>
    {children}
    <Text style={{color: 'red'}}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInputName = ({label, formikProps, formikKey, icon, ...rest}) => {
  const inputStyles = {
    borderColor: '#e0e0e0',
    padding: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    alignSelf: 'flex-start',
    height: 50,
    width: 300,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 5,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -15,
    fontStyle: 'italic',
  };
  const iconStyle = {
    marginTop: 20,
  };
  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}
      icon={icon}>
      <Image
        style={{
          zIndex: 1000,
          marginLeft: 20,
          marginTop: 25,
          position: 'absolute',
        }}
        source={require('../../assets/image/register/name.png')}
      />
      <TextInput
        style={inputStyles}
        inlineImageLeft="email"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        placeholderTextColor={'darkgrey'}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledInputPhone = ({label, formikProps, formikKey, icon, ...rest}) => {
  const inputStyles = {
    borderColor: '#e0e0e0',
    padding: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    alignSelf: 'flex-start',
    height: 50,
    width: 300,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 5,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -15,
    fontStyle: 'italic',
  };
  const iconStyle = {
    marginTop: 20,
  };
  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}
      icon={icon}>
      <Image
        style={{
          zIndex: 1000,
          marginLeft: 20,
          marginTop: 25,
          position: 'absolute',
        }}
        source={require('../../assets/image/register/phone.png')}
      />
      <TextInput
        style={inputStyles}
        inlineImageLeft="email"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        placeholderTextColor={'darkgrey'}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledInput = ({label, formikProps, formikKey, icon, ...rest}) => {
  const inputStyles = {
    borderColor: '#e0e0e0',
    padding: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    alignSelf: 'flex-start',
    height: 50,
    width: 300,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 5,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -15,
    fontStyle: 'italic',
  };
  const iconStyle = {
    marginTop: 20,
  };
  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}
      icon={icon}>
      <Image
        style={{
          zIndex: 1000,
          marginLeft: 20,
          marginTop: 25,
          position: 'absolute',
        }}
        source={LOGIN_email}
      />
      <TextInput
        style={inputStyles}
        inlineImageLeft="email"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        placeholderTextColor={'darkgrey'}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledInputPass = ({
  label,
  formikProps,
  formikKey,
  keyboardType,
  icon,
  ...rest
}) => {
  const inputStyles = {
    borderColor: '#e0e0e0',
    padding: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    alignSelf: 'flex-start',
    height: 50,
    width: 300,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -15,
    fontStyle: 'italic',
  };
  const iconStyle = {
    marginTop: 20,
  };
  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}
      icon={icon}>
      <Image
        style={{
          zIndex: 1000,
          marginLeft: 20,
          marginTop: 25,
          position: 'absolute',
        }}
        source={LOGIN_pass}
      />
      <TextInput
        style={inputStyles}
        inlineImageLeft="email"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        keyboardType={keyboardType}
        placeholderTextColor={'darkgrey'}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledSwitch = ({formikKey, formikProps, label, ...rest}) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={(value) => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

const RegisterScreen = (props) => {
  const [device_token, setToken] = useState('');
  const [device_type, setType] = useState('');
  const [selected, setSelected] = useState(false);
  const [userType, setUserType] = useState();
  const [uType, setUType] = useState(null)
  const [guestId, setGuestId] = useState(null)
  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .test('alphabets', 'Name must only contain alphabets', (value) => {
        return /^[A-Za-z]+$/.test(value);
      })
      .required('Please enter first name'),

    last_name: yup
      .string()
      .required('Please enter last name')
      .test('alphabets', 'Name must only contain alphabets', (value) => {
        return /^[A-Za-z]+$/.test(value);
      }),
    phone_number: yup
      .number()
      .test(
        'len',
        props.labelData.must_be_valid_mobile_number,
        (val) => val && val.toString().length >= 8,
      )
      .typeError('Please enter a valid Mobile Number')
      .required('Please enter a valid mobile number'),
    email: yup
      .string()
      .email('Email is invalid')
      .required('Please enter a valid email id'),
    password: yup
      .string()
      .required('Please enter password')
      .min(5, 'Password must have more than 5 characters '),
    // .matches(
    //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //   "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    // ),
    confirm_password: yup
      .string()
      .required('Please confirm password')
      .min(5, 'Password must have more than 5 characters ')
      .oneOf([yup.ref('password'), null], "Passwords don't match."),
  });

  useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    getDeviceValue();
    getUserType()
    // console.log(props.route.params)
  });

  const getUserType = async () => {
    let userType = await AsyncStorage.getItem('UserType');
    
  }

  const handleBackButtonClick = () => {
    props.navigation.goBack(null);
    return true;
  };
  const getDeviceValue = async () => {
    try {
      let guestId = await AsyncStorage.getItem('User_id');
      setGuestId(guestId)
      let userType = await AsyncStorage.getItem('UserType');
      setUType(userType)
      let uType = await AsyncStorage.getItem('verify');
      setUserType(uType);
      const device_token = await AsyncStorage.getItem('device_token');
      const device_type = await AsyncStorage.getItem('device_type');
      setToken(device_token);
      setType(device_type);
    } catch (e) {
      //  error
    }
  };

  const removeUserType = async () => {
    AsyncStorage.removeItem('UserType');
  }

  if (props.regError) {
    Toast.showWithGravity(props.regError, Toast.LONG, Toast.CENTER);
  }
  if (props.regResponse) {
    Toast.showWithGravity(props.regResponse, Toast.LONG, Toast.CENTER);
  }
  return (
    <SafeAreaView>
      {Platform.OS == 'ios' ? (
        <TouchableOpacity
          style={{
            zIndex: 99999,
            marginTop: '10%',
            marginLeft: 15,
            position: 'absolute',
            width: 40,
            height: 20,
          }}
          onPress={() => handleBackButtonClick()}>
          <FontAwesomeIcon
            style={{fontSize: 24}}
            icon={faArrowLeft}
            color={'#000000'}
          />
        </TouchableOpacity>
      ) : null}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive">
        <View
          style={{
            backgroundColor: '#ffffff',
            marginTop: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={LOGIN_logo} />
          <Text style={{color: '#f2A884', fontSize: 25, fontWeight: 'bold'}}>
            Welcome !
          </Text>
          <Text style={{color: '#f2A884', fontSize: 20}}>
            Let's create account for you
          </Text>

          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              phone_number: '',
              email: '',
              password: '',
              confirm_password: '',
            }}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();
              if (selected) {
                var user = {
                  first_name: values.first_name,
                  last_name: values.last_name,
                  phone_number: values.phone_number,
                  email: values.email,
                  password: values.password,
                  confirm_password: values.confirm_password,
                  device_token: device_token,
                  device_type: getSystemName() === 'Android' ? '1' : '2',
                  language: 'en',
                  is_guest: uType === 'Guest' ? 1 : 0,
                };
                if(uType === 'Guest') {
                  user = {...user, guest_id: guestId}
                }
                removeUserType()
                console.log("user", user)
                console.log("props.route.params", props.route.params)
                props.registerUserAction(user, props.navigation, props.route.params);
                actions.setSubmitting(true);
              } else {
                Toast.showWithGravity(
                  'Please select terms and conditions first',
                  Toast.LONG,
                  Toast.CENTER,
                );
              }
            }}
            validationSchema={validationSchema}>
            {(formikProps) => (
              <React.Fragment>
                <StyledInputName
                  keyboardType="default"
                  formikProps={formikProps}
                  formikKey="first_name"
                  placeholder="First Name"
                  // autoFocus
                />
                <StyledInputName
                  keyboardType="default"
                  formikProps={formikProps}
                  formikKey="last_name"
                  placeholder="Last Name"
                />
                <StyledInputPhone
                  keyboardType="numeric"
                  formikProps={formikProps}
                  formikKey="phone_number"
                  maxLength={8}
                  placeholder="Phone"
                />
                <StyledInput
                  keyboardType="default"
                  icon={'email'}
                  formikProps={formikProps}
                  formikKey="email"
                  placeholder="Email"
                />
                <StyledInputPass
                  keyboardType="default"
                  formikProps={formikProps}
                  formikKey="password"
                  placeholder="Password"
                  secureTextEntry
                />

                <StyledInputPass
                  keyboardType="default"
                  formikProps={formikProps}
                  formikKey="confirm_password"
                  placeholder="Confirm Password"
                  secureTextEntry
                />

                <React.Fragment>
                  <View style={{justifyContent: 'center', textAlign: 'center'}}>
                    <TouchableOpacity
                      style={{justifyContent: 'center', textAlign: 'center'}}
                      onPress={formikProps.handleSubmit}>
                      <Image
                        style={{
                          width: 350,
                          resizeMode: 'contain',
                        }}
                        source={REGISTER_button}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={{color: 'red'}}>
                    {formikProps.errors.general}
                  </Text>
                  {userType === 'Guest' ? null : (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        textAlign: 'center',
                        flexDirection: 'row',
                        zIndex: 1000,
                        marginBottom: 0,
                        marginTop: 0,
                      }}>
                      <TouchableOpacity
                        style={{height: 50}}
                        onPress={() => {
                          props.ListOfItems();
                          props.logAction(
                            {
                              userType: 'Guest',
                              device_token: 'Guest',
                              device_type: getSystemName() === 'Android' ? '1' : '2',
                              language: 'en',
                            },
                            props.navigation,
                          );
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#f2A884',
                            fontWeight: 'bold',
                          }}>
                          <Text> Continue as a guest</Text>
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <TouchableOpacity>
                    <View
                      style={{height: 50}}
                      onPress={() => {
                        props.navigation.navigate('Login');
                      }}>
                      <Text
                        style={{fontSize: 18, color: '#f2A884'}}
                        onPress={() => {
                          props.navigation.navigate('Login');
                        }}>
                        Already a User? Login
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      textAlign: 'center',
                      flexDirection: 'row',
                      zIndex: 1000,
                      marginBottom: 0,
                      marginTop: 0,
                    }}>
                    <View style={{height: 50}}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelected(!selected);
                        }}
                        style={{flexDirection: 'row'}}>
                        <View style={{marginTop: 5, paddingRight: 5}}>
                          <Image
                            source={selected ? REC_SELECTED : REC}
                            style={{width: 13, height: 13}}
                          />
                        </View>

                        <Text style={{fontSize: 15, color: '#f2A884'}}>
                          I agree to the Terms and Conditions
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </React.Fragment>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    regError: state.registrationReducer.regError,
    labelData: state.labelReducer.labelData,
    regResponse: state.registrationReducer.regResponse,
    profileData: state.profileReducer.profileData,
  };
};

const actionCreators = {
  logAction: loginActions.loginUserAction,
  registerUserAction: registerActions.registerUserAction,
  ListOfItems: cartActions.ListOfItems,
};

export default connect(mapStateToProps, actionCreators)(RegisterScreen);
