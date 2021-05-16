/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from './Header/Header';
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
let styleCss = require('../GlobalStyle');

const FreshChat = () => {
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
    ChatNow();
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
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive">
        <TouchableOpacity style={styleCss.btnButton} onPress={() => ChatNow()}>
          <Text>Chat Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styleCss.btnButton}
          onPress={() => Freshchat.showFAQs(faqOptions)}>
          <Text>FAQs</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default FreshChat;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
});
