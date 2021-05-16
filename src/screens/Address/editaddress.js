import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {addressListActions} from '../../actions/addresslist';
import {editAddressActions} from '../../actions/editaddress';
import AsyncStorage from '@react-native-community/async-storage';
let styleCss = require('../../GlobalStyle');
import {
  LOGO,
  ARROW_LEFT,
  ARROW_RIGHT,
  CHECKED,
  HEADER_unchecked,
} from '../../_helpers/ImageProvide';
const Editaddress = (props) => {
  const {itemId} = props.route.params;
  const [basic, setBasic] = useState('');
  const [complete, setComplete] = useState('');
  const [type, setType] = useState('');
  const [checked, setChecked] = useState(false);
  const [lan_guage, setLanguage] = useState('en');
  const [additional_direction, setadditional_direction] = useState();
  const [address_type, setaddress_type] = useState();
  const [apartment_number, setapartment_number] = useState();
  const [area, setarea] = useState();
  const [block, setblock] = useState();
  const [building, setbuilding] = useState();
  const [floor, setfloor] = useState();
  const [is_default_address, setis_default_address] = useState();
  const [name, setname] = useState();
  const [street, setstreet] = useState();
  useEffect(() => {
    getValue();
  }, []);
  const getValue = async () => {
    try {
      setBasic(itemId.building);
      setComplete(itemId.area);
      setType(itemId.address_type);
      if (itemId.is_default_address) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleBasicChange = (newText) => setBasic(newText);
  const handleCompleteChange = (newText) => setComplete(newText);
  const handleTypeChange = (newText) => setType(newText);
  const handleSubmit = () => {
    if (basic == null || basic == undefined || basic == '') {
      Toast.showWithGravity('Must be non empty', Toast.SHORT, Toast.CENTER);
    } else if (complete == null || complete == undefined || complete == '') {
      Toast.showWithGravity('Must be non empty', Toast.SHORT, Toast.CENTER);
    } else if (type == null || type == undefined || type == '') {
      Toast.showWithGravity('Must be non empty', Toast.SHORT, Toast.CENTER);
    } else {
      var data = itemId;
      data.building = basic;
      data.area = complete;
      if (checked) {
        data.is_default_address = 1;
      } else {
        data.is_default_address = 0;
      }
      props.editAddressAction(data).then(() => {
        props.addressListAction().then(() => {
          if (props.addressStatus) {
            props.navigation.navigate('Addresslist');
          }
        });
      });
    }
  };
  if (props.editaddressMessage) {
    Toast.showWithGravity(props.editaddressMessage, Toast.SHORT, Toast.CENTER);
  }
  if (props.labelData) {
    return (
      <>
        <ScrollView
          style={{backgroundColor: 'white'}}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          <View style={styleCss.mainContainer}>
            <View style={styleCss.creditHeader}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Addresslist')}>
                  <Image
                    style={{width: 36, height: 14}}
                    source={I18nManager.isRTL ? ARROW_RIGHT : ARROW_LEFT}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image style={{width: 50, height: 40}} source={LOGO} />
              </View>
              <View style={{flex: 1}}></View>
            </View>
            <View style={{marginVertical: 30}}>
              <Text style={styleCss.headingPro}>
                `${props.labelData.edit} ${props.labelData.address}`
              </Text>
            </View>

            <FloatingLabelInput
              placeholder={props.labelData.basic_address}
              value={basic}
              onChangeText={handleBasicChange}
            />
            <FloatingLabelInput
              placeholder={props.labelData.complete_add}
              value={complete}
              onChangeText={handleCompleteChange}
            />

            <FloatingLabelInput
              placeholder={props.labelData.address_type}
              value={type}
              onChangeText={handleTypeChange}
            />
            <View style={{marginTop: 40}}>
              {checked ? (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  style={styles.radioAlign}>
                  <Image style={styles.imgSize} source={CHECKED} />
                  <View>
                    <Text numberOfLines={1} style={styles.radioText}>
                      {props.labelData.make_this_my_default_address}?
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  style={styles.radioAlign}>
                  <Image style={styles.imgSize} source={HEADER_unchecked} />
                  <View>
                    <Text numberOfLines={1} style={styles.radioText}>
                      {props.labelData.make_this_my_default_address}?
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            backgroundColor: 'white',
            paddingLeft: 15,
            paddingRight: 15,
            paddingVertical: 30,
          }}>
          <TouchableOpacity
            style={[styleCss.btnButton, styleCss.mrTop]}
            onPress={handleSubmit}>
            <Text style={styles.text}>{props.labelData.submit}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  } else return null;
};

const styles = StyleSheet.create({
  imgStyle: {
    width: 35,
    alignItems: 'center',
    paddingLeft: 8,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  radioAlign: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  radioText: {
    paddingLeft: 10,
  },
  radioTextHeading: {
    paddingLeft: 10,
    color: '#98979d',
  },
  imgSize: {
    width: 25,
    height: 25,
  },
});

//export default Editaddress;
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
    addressStatus: state.addresslistReducer.addressStatus,
    editaddressMessage: state.editaddressReducer.editaddressMessage,
  };
};
const actionCreators = {
  addressListAction: addressListActions.addressListAction,
  editAddressAction: editAddressActions.editAddressAction,
};
export default connect(mapStateToProps, actionCreators)(Editaddress);
