import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import {ScrollView} from 'react-native-gesture-handler';
import MealListing from './MealListing';
import Header from '../../components/Header/Header';
import {useEffect} from 'react';
const OneDayPlanMealListing = (props) => {
  const {itemId, featureId, oneday} = props.route.params;
  useEffect(() => {}, [itemId, featureId, oneday]);
  return (
    <>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        style={{backgroundColor: '#fff'}}>
        <View>
          <Swiper
            style={{height: 200}}
            showsButtons={false}
            loop={true}
            autoplayTimeout={4}
            showsPagination={true}
            paginationStyle={{bottom: 10}}
            removeClippedSubviews={false}
            backgroundColor="transparent"
            activeDotColor="#f2925e"
            resizeMode="center"
            autoplay={true}>
            {itemId.coverimage.map((item, index) => (
              <Image
                key={index}
                style={styles.img}
                source={{
                  uri: itemId.image_url + item.image,
                }}
              />
            ))}
          </Swiper>

          <View style={styles.back}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Text style={{color: '#f2A884', fontSize: 11}}>
                {props.labelData.back}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <MealListing
          restaurent_id={itemId.id}
          feature_id={featureId}
          day={oneday}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  innerImg: {
    height: 120,
    width: '100%',
    borderRadius: 5,
  },
  img: {
    height: 200,
    width: '100%',
  },
  back: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    position: 'absolute',
    borderRadius: 10,
    bottom: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
export default connect(mapStateToProps, null)(OneDayPlanMealListing);
