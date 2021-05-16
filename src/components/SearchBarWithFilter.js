import React, {useState} from 'react';
import {View, TextInput, Image} from 'react-native';
import {HOME_FILTER, HOME_SEARCH} from '../_helpers/ImageProvide';
import {connect} from 'react-redux';

let styleCss = require('../GlobalStyle');
const SearchbarFilter = (props) => {
  const [value, onChangeText] = useState();
  return (
    <View style={{marginTop: 10}}>
      <View style={styleCss.inputArea}>
        <View style={{flex: 1}}>
          <Image style={{width: 20, height: 20}} source={HOME_FILTER} />
        </View>

        <View style={{flex: 9}}>
          <TextInput
            style={styleCss.textInput}
            placeholder={props.labelData.search_Text}
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
        </View>
        <View style={{flex: 1}}>
          <Image
            style={{width: 20, height: 20, alignSelf: 'flex-end'}}
            source={HOME_SEARCH}
          />
        </View>
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
