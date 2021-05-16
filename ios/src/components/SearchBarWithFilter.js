import React, {useState} from 'react';
import {View, TextInput, Text, Image, TouchableOpacity} from 'react-native';
import {HOME_FILTER, HOME_SEARCH} from '../_helpers/ImageProvide';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

let styleCss = require('../GlobalStyle');
const SearchbarFilter = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 10}}>
      <View
        style={styleCss.inputArea}>
        <View style={{flex: 1, zIndex:22,}}>
          <TouchableOpacity onPress={() =>navigation.navigate('FilterComponent') }>
          <Image style={{width: 20, height: 20}} source={HOME_FILTER} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        style={{flexDirection:'row', alignItems:'center', justifyContent:'center',width:'88%'}}
        onPress={() => {
          navigation.navigate('SearchComponent');
        }}>
        <View style={{flex: 6}}>
          <Text style={{color: 'darkgrey'}}> {props.labelData.search_Text}</Text>
        </View>
        <View style={{flex: 1}}>
          <Image
            style={{width: 20, height: 20, alignSelf: 'flex-end'}}
            source={HOME_SEARCH}
          />
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};

export default connect(mapStateToProps, null)(SearchbarFilter);
