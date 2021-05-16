import React, {Component} from 'react';
import {View, StatusBar, TextInput, Text} from 'react-native';
export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  render() {
    const {...props} = this.props;
    const {isFocused} = this.state;
    const textStyle = {
      margin: 0,
      padding: 0,
      height: 50,
      fontSize: 15,
      color: '#000',
      alignSelf: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: !isFocused ? '#e2e2e2' : '#f2A884',
    };
    return (
      <View style={{paddingTop: 18}}>
        <TextInput
          {...props}
          style={textStyle}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}
