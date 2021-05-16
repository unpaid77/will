import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchbarFilter from '../components/SearchBarWithFilter';
import {labelActions} from '../actions/label';
import {homeActions} from '../actions/home';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {HEADER_MENU_ICON, HEADER_SMALL_LOGO} from '../_helpers/ImageProvide';
import {cartActions} from '../actions/cart';
let styleCss = require('../GlobalStyle');

const DATA3 = [
  {
    id: '1',
    title: 'Diet Plans',
    imageUrl: require('../../assets/image/home/photo.jpeg'),
    description: 'All monthly deals',
  },
  {
    id: '2',
    title: 'Resturants',
    imageUrl: require('../../assets/image/home/photo.jpeg'),
    description: 'Grab a quick meals',
  },
  {
    id: '3',
    title: 'Resturants',
    imageUrl: require('../../assets/image/home/photo.jpeg'),
    description: 'Grab a quick meals',
  },
  {
    id: '4',
    title: 'Resturants',
    imageUrl: require('../../assets/image/home/photo.jpeg'),
    description: 'Grab a quick meals',
  },
];

const Dietcompanies = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    getValue();
  }, []);
  const getValue = async () => {
    try {
      const Token = await AsyncStorage.getItem('token');
      const language = await AsyncStorage.getItem('language');
      setToken(Token);
      setLanguage(language);
      var lang = 'en';
      var add = {};
      add.token = Token;
      if (language == 'ar') {
        add.language = language;
      } else {
        add.language = lang;
      }
      props.labelAction(add, props.navigation);
      props.homeAction();
    } catch (e) {
      //  error
      console.error(e);
    }
  };
  if (props.labelStatus) {
    if (props.homeStatus) {
      if (
        Object.keys(props.homeData).length > 0 &&
        props.homeData.constructor === Object
      ) {
        return (
          <>
            <View style={styleCss.header}>
              <View
                style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Image
                    style={{width: 20, height: 15}}
                    source={HEADER_MENU_ICON}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{flex: 4, alignItems: 'center', alignSelf: 'center'}}>
                <Image
                  style={{width: 50, height: 50}}
                  source={HEADER_SMALL_LOGO}
                />
              </View>
              <View style={{flex: 1}}></View>
            </View>
            <SafeAreaView style={{backgroundColor: 'white'}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={DATA3}
                renderItem={({item}) => {
                  return (
                    <View style={styleCss.serviceBox}>
                      <Image
                        source={item.imageUrl}
                        style={{width: 60, height: 60}}
                      />
                      <View style={styleCss.textContainer}>
                        <Text style={styleCss.h2}>{item.title}</Text>
                        <Text style={styleCss.ptext}>{item.description}</Text>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
              <View style={styleCss.mainContainer}>
                {/* Search bar  start here*/}

                <SearchbarFilter />

                {/* Search bar  End here*/}

                {/* DietCompany start here */}

                <ScrollView
                  contentContainerStyle={styleCss.scrollViewCard}
                  keyboardShouldPersistTaps="handled"
                  keyboardDismissMode="interactive">
                  {props.homeData.dietcompanies.map((item, index) => {
                    return (
                      <View style={styleCss.homeCard} key={index}>
                        <Image
                          source={{
                            uri: item.image_url + item.image,
                          }}
                          style={{
                            width: '100%',
                            height: 120,
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              {/* DietCompany end here */}
            </SafeAreaView>
          </>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

//export default Home;
const mapStateToProps = (state) => {
  return {
    homeError: state.homeReducer.homeError,
    homeMessage: state.homeReducer.homeMessage,
    homeData: state.homeReducer.homeData,
    homeStatus: state.homeReducer.homeStatus,
    labelData: state.labelReducer.labelData,
    labelStatus: state.labelReducer.labelStatus,
  };
};
const actionCreators = {
  homeAction: homeActions.homeAction,
  labelAction: labelActions.labelAction,
  selectedPlan: cartActions.selectedPlan,
};
export default connect(mapStateToProps, actionCreators)(Dietcompanies);
