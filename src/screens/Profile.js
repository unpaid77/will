import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {profileActions} from '../actions/profile';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
let styleCss = require('../GlobalStyle');
import {PROFILE_API} from '../util/api';
import {
  CAMERA_WHITE,
  HEADER_EDIT_ORANGE,
  HEADER_PROFILE_IMG,
  HEADER_SMALL_LOGO,
  CROSS,
} from '../_helpers/ImageProvide';
const Profile = (props) => {
  useEffect(() => {
    getTokenValue();
  }, []);
  const getTokenValue = async () => {
    try {
      props.profileAction();
    } catch (e) {
      console.error(e);
    }
  };
  const camera = async () => {
    var options = {
      title: props.labelData.select_image,
      cancelButtonTitle: props.labelData.cancel,
      takePhotoButtonTitle: props.labelData.take_photo,
      chooseFromLibraryButtonTitle: props.labelData.choose_from_library,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        result['android.permission.CAMERA'] &&
        result['android.permission.READ_EXTERNAL_STORAGE'] &&
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            Toast.showWithGravity(
              'Camera permission denied',
              Toast.SHORT,
              Toast.CENTER,
            );
          } else if (response.error) {
            Toast.showWithGravity(
              `Image picker ${response.error}`,
              Toast.SHORT,
              Toast.CENTER,
            );
          } else if (response.customButton) {
            Toast.showWithGravity(
              'User tap custom button',
              Toast.SHORT,
              Toast.CENTER,
            );
          } else {
            var image = {
              name: response.fileName,
              type: response.type,

              uri:
                Platform.OS === 'android'
                  ? response.uri
                  : respone.uri.replace('file://', ''),

              data: response.data,
            };

            var formData = new FormData();
            formData.append('image', image);
            PROFILE_API(formData, 'upload/profile/image').then(
              (responseJson) => {
                Toast.showWithGravity(
                  responseJson.message,
                  Toast.SHORT,
                  Toast.CENTER,
                );
                props.profileAction();
              },
            );
          }
        });
      } else {
        Toast.showWithGravity(
          'Camera permission denied',
          Toast.SHORT,
          Toast.CENTER,
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  if (props.profileError) {
    Toast.showWithGravity(props.forgotError, Toast.LONG, Toast.CENTER);
  }
  if (props.profileStatus) {
    return (
      <>
        <View style={styleCss.header}>
          <View
            style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}></View>
          <View style={{flex: 4, alignItems: 'center', alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image
                style={{width: 50, height: 50}}
                source={HEADER_SMALL_LOGO}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image style={{height: 20, width: 20}} source={CROSS} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          <View style={styleCss.mainContainer}>
            <View style={{marginBottom: 30, position: 'relative'}}>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <View>
                  <View style={styles.profileImage}>
                    {props.profileData.image ? (
                      <Image
                        source={{
                          uri:
                            props.profileData.image_url +
                            props.profileData.image,
                        }}
                        style={{width: '100%', height: '100%'}}
                      />
                    ) : (
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={HEADER_PROFILE_IMG}
                      />
                    )}
                  </View>
                  {props.profileData.user_type != 3 && (
                    <View style={styleCss.roundShape}>
                      <TouchableOpacity onPress={camera}>
                        <Image
                          style={{width: 19, height: 16}}
                          source={CAMERA_WHITE}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={{marginTop: 10, flex: 1, flexDirection: 'column'}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: '#000',
                      }}>
                      {props.profileData.username}
                    </Text>
                  </View>
                  <View style={{width: '90%', flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 5}}>
                      <Text style={{fontSize: 14, textAlign: 'center'}}>
                        {props.profileData.default_address
                          ? props.profileData.default_address.area
                          : null}
                      </Text>
                    </View>
                    {props.profileData.user_type != 3 && (
                      <View style={{flexDirection: 'row', flex: 1, width: 100}}>
                        <View>
                          <Text style={{fontSize: 16, fontWeight: '700'}}>
                            {props.labelData.edit_all}
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('ProfileEdit')
                            }>
                            <Image
                              style={{
                                width: 18,
                                height: 16,
                                marginLeft: 5,
                                marginTop: 4,
                              }}
                              source={HEADER_EDIT_ORANGE}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <View>
                  <Text style={styles.lable}>{props.labelData.first_name}</Text>
                  <Text style={styles.text}>
                    {props.profileData.first_name}
                  </Text>
                </View>
                <View style={{marginVertical: 20}}>
                  <Text style={styles.lable}>{props.labelData.last_name}</Text>
                  <Text style={styles.text}>{props.profileData.last_name}</Text>
                </View>
                <View>
                  <Text style={styles.lable}>{props.labelData.email}</Text>
                  <Text style={styles.text}>{props.profileData.email}</Text>
                </View>
                <View style={{marginVertical: 20}}>
                  <Text style={styles.lable}>{props.labelData.phone_no}</Text>
                  <Text style={styles.text}>
                    {props.profileData.phone_number}
                  </Text>
                </View>

                <View>
                  <Text style={styles.lable}>
                    {props.labelData.my_add_list}
                  </Text>
                  <Text style={styles.text}>
                    Default:
                    {props.profileData.default_address
                      ? props.profileData.default_address.area
                      : null}
                    {'\n'}
                    {props.profileData.default_address
                      ? props.profileData.default_address.complete_address
                      : null}
                    {'\n'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  } else {
    return null;
  }
};
const styles = StyleSheet.create({
  lable: {fontSize: 13, color: '#a6a6a6'},
  text: {fontSize: 16, color: '#000000'},
  profileImage: {
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#e2e2e2',
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
const mapStateToProps = (state) => {
  return {
    profileError: state.profileReducer.profileError,
    profileMessage: state.profileReducer.profileMessage,
    profileData: state.profileReducer.profileData,
    profileStatus: state.profileReducer.profileStatus,
    labelData: state.labelReducer.labelData,
    labelStatus: state.labelReducer.labelStatus,
  };
};
const actionCreators = {
  profileAction: profileActions.profileUserAction,
};

export default connect(mapStateToProps, actionCreators)(Profile);
