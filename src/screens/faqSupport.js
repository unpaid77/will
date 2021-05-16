import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CROSS, LOGO} from '../_helpers/ImageProvide';
const {height, width} = Dimensions.get('window');

const FaqSupport = (props) => {
  return (
    <View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Image style={{width: 48, height: 40}} source={LOGO} />
      </View>
      <View style={{alignItems: 'flex-end', marginTop: 10}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Image style={{width: 16, height: 16}} source={CROSS} />
        </TouchableOpacity>
      </View>
      <Text>FAQs And Support</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height, width},
});
export default connect(null, null)(FaqSupport);
