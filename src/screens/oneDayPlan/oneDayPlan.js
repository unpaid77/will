import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, I18nManager} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {onedayplanActions} from '../../actions/oneplan';
import Header from '../../components/Header/Header';
import {
  AR,
  COMMON_ARROW_LEFT,
  COMMON_ARROW_RIGHT,
  HOME_THREE_DOTS_LEFT,
  HOME_THREE_DOTS_RIGHT,
} from '../../_helpers/ImageProvide';
let styleCss = require('../../GlobalStyle');
const OneDayPlan = (props) => {
  const {featureId} = props.route.params;
  if (props.onedayplanStatus && props.labelData) {
    return (
      <>
        <Header />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          style={{backgroundColor: '#fff'}}>
          <View style={styleCss.mainContainer}>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <View style={{position: 'absolute', left: 10, top: '44%'}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Home')}>
                  <Image
                    style={{width: 30, height: 19}}
                    source={
                      I18nManager.isRTL ? COMMON_ARROW_RIGHT : COMMON_ARROW_LEFT
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styleCss.featureBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      style={{width: 9, height: 19}}
                      source={HOME_THREE_DOTS_LEFT}
                    />
                  </View>
                  <View style={{flex: 4}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#ef8361',
                        fontSize: 16,
                      }}>
                      {props.onedayplanData.feature_deatils.name}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Image
                      style={{
                        width: 9,
                        height: 19,
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                      }}
                      source={HOME_THREE_DOTS_RIGHT}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 15,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{flex: 2}}>
                <Text style={{fontSize: 18, fontWeight: '700'}}>
                  {props.labelData.choose_plan}:
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#aaaaaa',
                    flexDirection: 'row',
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  <View>
                    <Text>{props.labelData.day}</Text>
                  </View>
                  <View style={{justifyContent: 'center', paddingLeft: 5}}>
                    <Image style={{width: 12, height: 16}} source={AR} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* choose plan */}
          <View style={{marginBottom: 40}}>
            <ScrollView
              contentContainerStyle={styleCss.scrollViewCard}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive">
              {props.onedayplanData.diet_company.map((item, index) => {
                return (
                  <View style={styleCss.homeCard2} key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('OneCalendar', {
                          itemId: item,
                          featureId: featureId,
                        });
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          source={{
                            uri: item.image_url + item.image,
                          }}
                          style={{width: '95%', height: 160, borderRadius: 10}}
                        />
                        <Text style={{fontSize: 12, paddingTop: 6}}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    onedayplanStatus: state.onedayplanReducer.onedayplanStatus,
    onedayplanData: state.onedayplanReducer.onedayplanData,
    labelData: state.labelReducer.labelData,
  };
};
const actionCreators = {
  onedayplanAction: onedayplanActions.onedayplanAction,
};
export default connect(mapStateToProps, actionCreators)(OneDayPlan);
