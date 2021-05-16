import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  BackHandler,
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
import {emailActions} from '../actions/email';
import {LOGIN_email, LOGIN_logo} from '../_helpers/ImageProvide';
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
    paddingBottom: 10,
    paddingLeft: 50,
    alignSelf: 'flex-start',
    height: 50,
    width: 300,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: 8,
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
      <TextInput
        style={inputStyles}
        inlineImageLeft="email"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
      <Image
        style={{
          zIndex: 1000,
          marginLeft: 20,
          marginTop: 25,
          position: 'absolute',
        }}
        source={LOGIN_email}
      />
    </FieldWrapper>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('please enter valid email id')
    .required('Please enter a valid email id'),
});

const signUp = ({values}) => {
  return values;
};

const EmailScreen = (props) => {
  const [loding, setLoading] = useState(false);
  useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  });

  const handleBackButtonClick = () => {
    props.navigation.goBack(null);
    return true;
  };
  if (props.emailError) {
    Toast.showWithGravity(props.emailError, Toast.SHORT, Toast.CENTER);
  }
  if (props.emailMessage) {
    Toast.showWithGravity(props.emailMessage, Toast.SHORT, Toast.CENTER);
  }
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
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
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image source={LOGIN_logo} />
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(values, actions) => {
            Keyboard.dismiss();
            props.emailAction({email: values.email}, props.navigation);
            actions.setSubmitting(true);
          }}
          validationSchema={validationSchema}>
          {(formikProps) => (
            <React.Fragment>
              <StyledInputPass
                icon={'email'}
                formikProps={formikProps}
                formikKey="email"
                placeholder="Email"
                // autoFocus
              />

              <React.Fragment>
                <View
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity onPress={formikProps.handleSubmit}>
                    <View
                      style={{
                        backgroundColor: '#f2A884',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        width: 300,
                        height: 50,
                        shadowRadius: 1,
                        shadowOpacity: 10,
                        shadowOffset: {
                          width: 30,
                          height: 50,
                        },
                        elevation: 5,
                      }}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Submit
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

const mapStateToProps = (state) => {
  return {
    emailError: state.emailReducer.emailError,
    emailMessage: state.emailReducer.emailMessage,
    emailData: state.emailReducer.emailData,
    labelData: state.labelReducer.labelData,
  };
};

const actionCreators = {
  emailAction: emailActions.emailUserAction,
};

export default connect(mapStateToProps, actionCreators)(EmailScreen);
