import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Text,
  Switch,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup'; // for everything
import Toast from 'react-native-simple-toast';
import {ScrollView} from 'react-native-gesture-handler';
import {otpActions} from '../actions/otp';
import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN_logo, LOGIN_pass} from '../_helpers/ImageProvide';
const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View style={{marginHorizontal: 20, marginVertical: 1}}>
    <Text style={{marginBottom: 3}}>{label}</Text>
    {children}
    <Text style={{color: 'red'}}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInputPass = ({label, formikProps, formikKey, icon, ...rest}) => {
  const inputStyles = {
    borderColor: '#e0e0e0',
    padding: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    textAlign: 'left',
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
        source={LOGIN_pass}
      />
      <TextInput
        style={inputStyles}
        inlineImageLeft="email"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
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

const validationSchema = yup.object().shape({
  otp: yup.string().required(),
});

const OtpScreen = (props) => {
  const [email, setEmail] = useState('');
  const [userid, setUserid] = useState(0);
  const [device_token, setToken] = useState('');
  const [device_type, setType] = useState('');
  useEffect(() => {
    getValue();
  });

  if (props.otpError) {
    Toast.showWithGravity(props.otpError, Toast.SHORT, Toast.CENTER);
  }
  if (props.otpMessage) {
    Toast.showWithGravity(props.otpMessage, Toast.SHORT, Toast.CENTER);
  }
  const getValue = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const id = await AsyncStorage.getItem('userid');
      const userid = Number(id);
      const device_token = await AsyncStorage.getItem('device_token');
      const device_type = await AsyncStorage.getItem('device_type');
      setToken(device_token);
      setType(device_type);
      setEmail(email);
      setUserid(userid);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: 0,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 50,
        }}>
        <Image source={LOGIN_logo} />
        <Text
          style={{
            color: '#f2A884',
            fontSize: 15,
            textAlign: 'center',
          }}>
          A verification code sent to your email ending with **{email}**
        </Text>

        <Formik
          initialValues={{
            otp: '',
          }}
          onSubmit={(values, actions) => {
            Keyboard.dismiss();

            var user = {};
            user.verification_code = values.otp;
            user.user_id = userid;
            user.device_token = device_token;
            user.device_type = device_type;
            user.grant_type = 'otp';
            props.otpAction(user, props.navigation);
            actions.setSubmitting(true);
          }}
          validationSchema={validationSchema}>
          {(formikProps) => (
            <React.Fragment>
              <StyledInputPass
                icon={'pass'}
                formikProps={formikProps}
                formikKey="otp"
                placeholder="Verification Code"
                secureTextEntry
              />

              <React.Fragment>
                <View
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginTop: 25,
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
                        elevation: 12,
                      }}>
                      <Text style={{color: 'white'}}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  bStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  btnContainer: {
    marginTop: 40,
    alignSelf: 'stretch',
  },
  inputContainer: {
    height: 40,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  banner: {
    alignSelf: 'stretch',
  },
});

const mapStateToProps = (state) => {
  return {
    otpError: state.otpReducer.otpError,
    otpMessage: state.otpReducer.otpMessage,
    labelData: state.labelReducer.labelData,
    otpData: state.otpReducer.otpData,
  };
};

const actionCreators = {
  otpAction: otpActions.otpUserAction,
};

export default connect(mapStateToProps, actionCreators)(OtpScreen);
//export default OtpScreen;
