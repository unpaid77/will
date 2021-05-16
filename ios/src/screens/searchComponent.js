import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {cartActions} from '../actions/cart';
import Header from '../components/Header/Header';
import {MEAL_SEARCH} from '../util/api';
import {HOME_FILTER, HOME_SEARCH, CROSS} from '../_helpers/ImageProvide';
let styleCss = require('../GlobalStyle');
const searchComponent = ({navigation, ...props}) => {
  const [value, setValue] = useState('');
  const [Data, setData] = useState([]);
  const handleLoginKeyUp = (e) => {
    setValue(e);
    if (e.length == 0) {
      setData([]);
    } else {
      MEAL_SEARCH(e).then((data) => {
        setData(data.data);
      });
    }
  };
  const dietCompanyNavigation = (data) => {
    props.selectedPlan(data);
    if (props.listOfItems === 0) {
      props.restaurantId(data.id);
      props.programName('diet_company');
      navigation.navigate('CommonCalendar', {
        restaurant_id: data.id,
      });
    } else {
      Toast.showWithGravity(
        'You already have selected some on your card.Please remove it or compelte the process.',
        Toast.SHORT,
        Toast.CENTER,
      );
    }
  };
  
  const renderItem = (e, i) => {
    let url = e.image_url + e.image;
    return (
      <TouchableOpacity
        style={styles.searchDirection}
        key={{i}}
        onPress={() => {
          dietCompanyNavigation(e);
        }}>
        <View>
          <Image style={{width: 40, height: 40}} source={{uri: url}} />
        </View>
        <View style={{marginHorizontal: 10}}>
          <Text style={styles.searchResultText}>{e.name}</Text>
          <Text style={styles.searchResultText2}>Recent searches</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <Header />
      <TouchableOpacity
              style={{marginTop: 20, marginRight:20 ,alignSelf:'flex-end'}}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image style={{height: 15, width: 15}} source={CROSS} />
            </TouchableOpacity>
      <ScrollView>
        <View style={styleCss.mainContainer}>
          <View>
            <Text style={styles.heading}>
              {props.labelData.what_would_you_like_to_eat}
            </Text>
          </View>

          <View style={styles.searchBar}>
            <View style={styles.iconWidth}>
              <Image style={{width: 20, height: 19}} source={HOME_SEARCH} />
            </View>
            <View style={{flex: 1}}>
              <TextInput
                style={{paddingVertical: 3, fontSize: 15}}
                placeholder={props.labelData.search_food_you_like}
                placeholderTextColor="#acacac"
                onChangeText={(text) => handleLoginKeyUp(text)}
                value={value}
              />
            </View>
            <View style={styles.iconWidth}>
            <TouchableOpacity onPress={() =>navigation.navigate('FilterComponent') }>
              <Image style={{width: 20, height: 19}} source={HOME_FILTER} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <ScrollView>
              {Data.map((e, i) => {
                return <View key={i}>{renderItem(e)}</View>;
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
    listOfItems: state.cartReducer.listOfItems,
  };
};
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#1a1824',
    marginTop: 40,
    paddingBottom: 8,
  },
  iconWidth: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 42,
    color: '#1a1824',
    fontWeight: 'bold',
    marginTop: 60,
  },
  searchResultText: {
    fontSize: 14,
    color: '#1a1824',
  },
  searchResultText2: {
    fontSize: 12,
    color: '#acacac',
  },
  searchDirection: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
});
const actionCreators = {
  programId: cartActions.programId,
  restaurantId: cartActions.restaurantId,
  programName: cartActions.programName,
  selectedPlan: cartActions.selectedPlan,
};
export default connect(mapStateToProps, actionCreators)(searchComponent);
