import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
let styleCss = require('../../GlobalStyle');
import {addressListActions} from '../../actions/addresslist';
import {addressSetActions} from '../../actions/addressset';
import {connect} from 'react-redux';
import Loader from '../../components/Loader/Loader';
import {
  CROSS,
  HEADER_unchecked,
  PAYMENT_noCredit,
  LOGO,
  CHECKED,
  ARROW_LEFT,
  ARROW_RIGHT,
  HEADER_SMALL_LOGO,
} from '../../_helpers/ImageProvide';

const Addresslist = (props) => {
  const [address_type] = useState(['home', 'office', 'other']);
  useEffect(() => {
    getValue();
  }, []);
  const getValue = async () => {
    try {
      props.addressListAction();
    } catch (e) {
      console.error(e);
    }
  };
  const setDefaultAddress = (item) => {
    var data = item;
    data.is_default_address = '1';
    props.addressSetAction(data).then(() => {
      if (props.addressSetStatus) {
        props.addressListAction();
        console.log('-----------------------');
      }
    });
  };
  if (props.addressStatus) {
    if (props.addressData.length > 0) {
      return (
        <>
          <ScrollView
            style={{backgroundColor: 'white', flex: 1}}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive">
            <View style={styleCss.header}>
              <View
                style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(props.pathFinder);
                  }}>
                  <Image
                    source={I18nManager.isRTL ? ARROW_RIGHT : ARROW_LEFT}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{flex: 4, alignItems: 'center', alignSelf: 'center'}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Home')}>
                  <Image
                    style={{width: 50, height: 50}}
                    source={HEADER_SMALL_LOGO}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(props.pathFinder);
                  }}>
                  <Image style={{height: 20, width: 20}} source={CROSS} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styleCss.mainContainer}>
              <View>
                <Text style={styleCss.headingPro}>
                  {props.labelData.my_add}
                </Text>
              </View>
              <View style={{marginTop: 35}}>
                {props.addressData.map((item, key) => {
                  return (
                    <View
                      key={key}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={styles.radioAlign}
                        onPress={() => {
                          setDefaultAddress(item);
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{paddingHorizontal: 5}}>
                            <Image
                              style={styles.imgSize}
                              source={
                                item.is_default_address
                                  ? CHECKED
                                  : HEADER_unchecked
                              }
                            />
                          </View>
                          <View>
                            <View style={{flexDirection: 'column'}}>
                              <Text
                                style={[
                                  styles.radioTextHeading,
                                  {alignSelf: 'flex-start'},
                                ]}>
                                {
                                  props.labelData[
                                    address_type[
                                      parseInt(item.address_type) - 1
                                    ]
                                  ]
                                }{' '}
                                {item.is_default_address
                                  ? `(${props.labelData.my_default})`
                                  : null}
                              </Text>
                              <Text
                                numberOfLines={1}
                                style={[styles.radioSubText]}>
                                {item.area.substring(0, 30)}
                                {' ...'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate('Addaddress', {
                              formData: {
                                address_type: item.address_type,
                                area: item.area,
                                block: item.block,
                                street: item.street,
                                building: item.building,
                                floor: item.floor,
                                apartment_number: item.apartment_number,
                                name: item.name,
                                additional_direction: item.additional_direction,
                                is_default_address: item.is_default_address,
                                id: item.id,
                                is_active: item.is_active,
                                user_id: item.user_id,
                              },
                              Action: 'update-address',
                            });
                          }}>
                          <Text style={{fontSize: 14, color: '#f2A884'}}>
                            {props.labelData.change}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              backgroundColor: 'white',
              paddingLeft: 15,
              paddingRight: 15,
            }}>
            <TouchableOpacity
              style={[styleCss.btnButton, styleCss.mrTop]}
              onPress={() => props.navigation.navigate('LocationPicker')}>
              <Text style={styles.text}>
                {props.labelData.add_another_address}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive">
            <View style={styleCss.mainContainer}>
              <View style={styleCss.creditHeader}>
                <View style={{flex: 1}}></View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Image style={{width: 50, height: 40}} source={LOGO} />
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Home')}>
                    <Image style={{width: 20, height: 20}} source={CROSS} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 30}}>
                <Text style={styleCss.headingPro}>
                  {props.labelData.my_add}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 420,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 150, height: 120}}
                  source={PAYMENT_noCredit}
                />

                <Text style={styleCss.creditCardHeading}>
                  No Address Present
                </Text>
                <Text style={styleCss.creditText}>
                  You don't have any address associated with your account
                </Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styleCss.btnButton, styleCss.mrTop]}
            onPress={() => {
              props.navigation.navigate('LocationPicker');
            }}>
            <Text style={styles.text}>
              {props.labelData.add_another_address}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  } else {
    return <Loader />;
  }
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
    fontWeight: 'bold',
  },
  radioAlign: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioText: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontSize: 15,
    paddingLeft: 10,
  },
  radioSubText: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    fontSize: 15,
    color: '#000',
  },
  radioTextHeading: {
    paddingLeft: 10,
    color: '#98979d',
  },
  imgSize: {
    width: 18,
    height: 18,
  },
});
const mapStateToProps = (state) => {
  return {
    addressData: state.addresslistReducer.addressData,
    addressStatus: state.addresslistReducer.addressStatus,
    addressSetData: state.addresssetReducer.addressSetData,
    addressSetStatus: state.addresssetReducer.addressSetStatus,
    labelData: state.labelReducer.labelData,
    pathFinder: state.commonReducer.pathFinder,
  };
};
const actionCreators = {
  addressListAction: addressListActions.addressListAction,
  addressSetAction: addressSetActions.addressSetAction,
};
export default connect(mapStateToProps, actionCreators)(Addresslist);
