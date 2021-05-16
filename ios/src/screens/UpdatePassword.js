import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Text,
  Platform,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup'; // for everything
import Toast from 'react-native-simple-toast';
import {forgotActions} from '../actions/forgot';
import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN_logo, LOGIN_pass} from '../_helpers/ImageProvide';
import {ScrollView} from 'react-native-gesture-handler';
const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View style={{marginHorizontal: 20, marginVertical: 1}}>
    <Text style={{marginBottom: 3}}>{label}</Text>
    {children}
    <Text style={{color: 'red'}}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

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
    shadowOpacity: 5,
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -15,
    fontStyle: 'italic',
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
        inlineImageLeft="pass"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};
const StyledInputPass = ({label, formikProps, formikKey, icon, ...rest}) => {
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
    shadowOpacity: 5,
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -15,
    fontStyle: 'italic',
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
        inlineImageLeft="pass"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledInputOldPass = ({label, formikProps, formikKey, icon, ...rest}) => {
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
    shadowOpacity: 5,
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -15,
    fontStyle: 'italic',
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
        inlineImageLeft="pass"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const validationSchema = yup.object().shape({
  new_password: yup
    .string()
    .required('Please enter password')
    .min(5, 'Password must have more than 5 characters '),
  confirm_password: yup
    .string()
    .required('Please enter confirm password')
    .min(5, 'Password must have more than 5 characters '),
  old_password: yup
    .string()
    .required('Please enter old password')
    .min(5, 'Password must have more than 5 characters '),
});

const UpdatePassword = (props) => {
  const [userid, setUserid] = useState(0);
  const [device_token, setToken] = useState('');
  const [device_type, setType] = useState('');
  useEffect(() => {
    getDeviceValue();
  }, []);
  const getDeviceValue = async () => {
    try {
      const device_token = await AsyncStorage.getItem('device_token');
      const device_type = await AsyncStorage.getItem('device_type');
      const id = await AsyncStorage.getItem('userid');
      const userid = Number(id);
      setToken(device_token);
      setType(device_type);
      setUserid(userid);
    } catch (e) {
      //  error
      console.error(e);
    }
  };
  if (props.forgotError) {
    Toast.showWithGravity(props.forgotError, Toast.LONG, Toast.CENTER);
  }
  if (props.forgotMessage) {
    Toast.showWithGravity(props.forgotMessage, Toast.LONG, Toast.CENTER);
  }
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive">
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={LOGIN_logo} />
          <Text
            style={{
              color: '#f2A884',
              fontSize: 23,
              textAlign: 'center',
            }}>
            {props.labelData.change_password}
          </Text>

          <Text
            style={{
              width: '50%',
              color: '#f2A884',
              fontSize: 15,
              textAlign: 'center',
            }}>
            {props.labelData.plz_enter_your_pass}
          </Text>

          <Formik
            initialValues={{
              old_password: '',
              confirm_password: '',
              new_password: '',
            }}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();

              if (values.new_password === values.old_password) {
                Toast.showWithGravity(
                  'old and new password should not be same',
                  Toast.LONG,
                  Toast.CENTER,
                );
              } else {
                var user = {};
                user.new_password = values.new_password;
                user.confirm_password = values.confirm_password;
                user.old_password = values.old_password;
                user.device_token = device_token;
                props.forgotAction(user, props.navigation);
                actions.setSubmitting(true);
              }
            }}
            validationSchema={validationSchema}>
            {(formikProps) => (
              <React.Fragment>
                <StyledInputOldPass
                  icon={'pass'}
                  formikProps={formikProps}
                  formikKey="old_password"
                  placeholder={props.labelData.old_password}
                  secureTextEntry
                />
                <StyledInput
                  icon={'pass'}
                  formikProps={formikProps}
                  formikKey="new_password"
                  placeholder={props.labelData.type_new_password}
                  secureTextEntry
                />
                <StyledInputPass
                  icon={'pass'}
                  formikProps={formikProps}
                  formikKey="confirm_password"
                  placeholder={props.labelData.confirm_new_password}
                  secureTextEntry
                />
                <React.Fragment>
                  <View
                    style={{
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}>
                    <TouchableOpacity onPress={formikProps.handleSubmit}>
                      <View
                        style={{
                          backgroundColor: '#f2A884',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          padding: 10,
                          width: 300,
                          height: 50,
                          shadowColor: '#F2A884',
                          shadowRadius: 16,
                          shadowOpacity: 10,
                          shadowOffset: {
                            width: 300,
                            height: 50,
                          },
                          elevation: 2,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          {props.labelData.submit}
                        </Text>
                      </View>
                    </TouchableOpacity>
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
    forgotError: state.forgotReducer.forgotError,
    forgotMessage: state.forgotReducer.forgotMessage,
    labelData: state.labelReducer.labelData,
    forgotData: state.forgotReducer.forgotData,
  };
};

const actionCreators = {
  forgotAction: forgotActions.UpdateUserAction,
};

export default connect(mapStateToProps, actionCreators)(UpdatePassword);
