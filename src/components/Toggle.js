import React, {useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {View, Switch, StyleSheet} from 'react-native';
const Toggle = ({booleanValue}) => {
  const [bool, setBool] = useState(booleanValue);
  const toggleSwitch = () => setBool((previousState) => !previousState);
  return (
    <>
      {/* <ToggleSwitch
        isOn={bool}
        onColor="#f2A884"
        offColor="#d0d0d2"
        size="small"
        onToggle={(isOn) => setBool(isOn)}
      /> */}
      <Switch
        trackColor={{false: '#d0d0d2', true: '#f2A884'}}
        thumbColor={'#ffffff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={bool}
      />
    </>
  );
};

//https://www.npmjs.com/package/toggle-switch-react-native

export default Toggle;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
