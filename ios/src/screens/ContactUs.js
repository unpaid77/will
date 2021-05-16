import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  CALL,
  EMAIL,
  WHATS_APP,
  LIVE_CHAT,
  COMMON_ARROW_RIGHT,
} from '../_helpers/ImageProvide';
let styleCss = require('../GlobalStyle');
import SubHeader from '../components/Header/SubHeader';
import {useNavigation} from '@react-navigation/native';
import {
  FRESS_CHAT_APP_ID,
  FRESS_CHAT_APP_KEY,
  FRESS_CHAT_DOMAIN,
} from '../_helpers/globalVeriable';
import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
  FaqOptions,
} from 'react-native-freshchat-sdk';
import AsyncStorage from '@react-native-community/async-storage';

const ContactUs = (props) => {
  var freshchatConfig = new FreshchatConfig(
    FRESS_CHAT_APP_ID,
    FRESS_CHAT_APP_KEY,
  );
  freshchatConfig.domain = FRESS_CHAT_DOMAIN;
  freshchatConfig.teamMemberInfoVisible = true;
  freshchatConfig.cameraCaptureEnabled = false;
  freshchatConfig.gallerySelectionEnabled = true;
  freshchatConfig.responseExpectationEnabled = true;
  freshchatConfig.showNotificationBanner = true; //iOS only
  freshchatConfig.notificationSoundEnabled = true; //iOS only
  freshchatConfig.themeName = 'CustomTheme.plist'; //iOS only
  freshchatConfig.stringsBundle = 'FCCustomLocalizable'; //iOS only
  Freshchat.init(freshchatConfig);
  const ChatNow = () => {
    Freshchat.showConversations();
  };
  let freshchatUser = new FreshchatUser();
  useEffect(() => {
    let data = getAsyncStorage();
    freshchatUser.firstName = data.first_name;
    freshchatUser.lastName = data.last_name;
    freshchatUser.email = data.email;
    freshchatUser.phone = data.phone_number;
    Freshchat.setUser(freshchatUser, (error) => {
      console.log(error);
    });
  });
  const getAsyncStorage = async () => {
    return {
      device_token: await AsyncStorage.getItem('device_token'),
      first_name: await AsyncStorage.getItem('first_name'),
      last_name: await AsyncStorage.getItem('last_name'),
      phone_number: await AsyncStorage.getItem('phone_number'),
      email: await AsyncStorage.getItem('email'),
    };
  };
  var faqOptions = new FaqOptions();
  faqOptions.tags = ['premium'];
  faqOptions.filteredViewTitle = 'Tags';
  faqOptions.filterType = FaqOptions.FilterType.ARTICLE;

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  if (!props.labelData) {
    null;
  }
  return (
    <>
      <SubHeader />
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={styleCss.mainContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}>
            <View>
              <TouchableOpacity
                style={{
                  shadowOffset:
                    Platform.OS === 'ios'
                      ? {width: 20, height: 20}
                      : {width: 20, height: 20},
                  shadowColor: 'black',
                  shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
                  elevation: 5,
                  backgroundColor: '#fff',
                  padding: 10,
                  fontSize: 16,
                  width: '100%',
                  height: 107,
                  padding: 5,
                  borderRadius: 10,
                  borderColor: '#F2A884',
                }}
                onPress={() => {
                  setModalVisible(false);
                  Linking.openURL(`tel:${props.labelData.call_us_number}`);
                }}>
                <View
                  style={{
                    padding: 10,
                    height: 98,
                    borderWidth: 1,
                    borderRadius: 10,
                    flexDirection: 'row',
                    borderColor: '#F2A884',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={CALL} />
                  </View>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View
                      style={{
                        borderBottomColor: '#F2A884',
                        borderBottomWidth: 1,
                      }}></View>
                    <Text style={[styles.textSize, {textAlign: 'center'}]}>
                      {props.labelData.call_us}
                    </Text>
                    <Text style={[styles.textSize, {textAlign: 'center'}]}>
                      {props.labelData.call_us_number}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={COMMON_ARROW_RIGHT}
                      style={{height: 20, width: 30}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.box}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={styles.textSize}>{props.labelData.call_us}</Text>
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Image source={CALL} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://wa.me/${props.labelData.whats_app_number}`,
                  )
                }>
                <Text style={styles.textSize}>
                  {props.labelData.whatsAppText}
                </Text>
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Image source={WHATS_APP} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('SendMail');
                }}>
                <Text style={styles.textSize}>{props.labelData.email}</Text>
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Image source={EMAIL} />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity onPress={() => ChatNow()}>
                <Text style={styles.textSize}>{props.labelData.liveChat}</Text>
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Image source={LIVE_CHAT} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={{borderColor: '#f5c0a3', borderWidth: 1}}></View>
      <View style={styleCss.mainContainer}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
              style={{position: 'absolute', left: 0, top: 5}}>
              <Image
                style={{width: 30, height: 15}}
                source={COMMON_ARROW_LEFT}
              />
            </TouchableOpacity>
            <Text style={styles.textSizeHeading}>FAQ</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={{borderColor: '#f5c0a3', borderWidth: 1, padding: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textSize2}>Refund Policy - </Text>
              <Text style={styles.textSize3}>click to know more</Text>
            </View>
            <View style={{marginTop: 15}}>
              <Text style={styles.textSize4}>
                We do offer refund policy contact us at whatsapp
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: '#f5c0a3',
              borderWidth: 1,
              padding: 15,
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textSize2}>Deliver Time - </Text>
              <Text style={styles.textSize3}>click to know more</Text>
            </View>
            <View style={{marginTop: 15}}>
              <Text style={styles.textSize4}>
                We do offer refund policy contact us at whatsapp
              </Text>
            </View>
          </View>
        </View> 
      </View>*/}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    shadowOffset:
      Platform.OS === 'ios' ? {width: 20, height: 20} : {width: 20, height: 20},
    shadowColor: 'black',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },

  textSize: {
    fontSize: 16,
    color: '#000',
  },
  textSize2: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  textSize3: {
    fontSize: 14,
    color: '#666',
  },
  textSize4: {
    fontSize: 16,
    color: '#666',
  },
  textSizeHeading: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
});
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};

export default connect(mapStateToProps, null)(ContactUs);
