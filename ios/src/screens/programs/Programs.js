/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {connect} from 'react-redux';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  I18nManager,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header/Header';
import {programActions} from '../../actions/program';
import {calenderActions} from '../../actions/Calender';
import {cartActions} from '../../actions/cart';
const {width} = Dimensions.get('window');
import Loader from '../../components/Loader/Loader';
import {
  COMMON_ARROW_LEFT,
  COMMON_ARROW_RIGHT,
  HOME_THREE_DOTS_RIGHT,
} from '../../_helpers/ImageProvide';
let styleCss = require('../../GlobalStyle');

const ProgramsComponent = (props) => {
  const navigation = useNavigation();
  const calenderCall = (item) => {
    props.selectedImageUrl(
      props.programData.program_deatils.image_url +
        props.programData.program_deatils.image,
    );
    props.calender_Action({restaurant_id: item.id});
    props.selectedPlan(item);
    props.restaurantId(item.id);
    navigation.navigate('CommonCalendar');
  };

  if (props.programStatus) {
    return (
      <>
        <Header />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={{alignSelf: 'center', left: -50}}
                onPress={() => navigation.navigate('Home')}>
                <Image
                  style={{width: 30, height: 20}}
                  source={
                    I18nManager.isRTL ? COMMON_ARROW_RIGHT : COMMON_ARROW_LEFT
                  }
                />
              </TouchableOpacity>
              <View style={styleCss.programBox}>
                <View>
                  <Image
                    source={{
                      uri:
                        props.programData.program_deatils.image_url +
                        props.programData.program_deatils.image,
                    }}
                    style={styleCss.programImage}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      style={{
                        alignSelf: 'flex-start',
                      }}
                      source={require('../../../assets/image/home/threeDotLeft.png')}
                    />
                  </View>
                  <View style={{flex: 4}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#ef8361',
                      }}>
                      {props.programData.program_deatils.name}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Image
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                      }}
                      source={HOME_THREE_DOTS_RIGHT}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 18,
                  marginBottom: 15,
                  marginTop: 10,
                }}>
                {props.labelData.restaurents_offer}{' '}
                {props.programData.program_deatils.name}
              </Text>
              <View style={styles.grid}>
                {props.programData.diet_company.length === 0 ? (
                  <Text style={styleCss.noRecordCard}>No Record Found</Text>
                ) : (
                  props.programData.diet_company.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.restorentBox}
                        key={index}
                        onPress={() => {
                          calenderCall(item);
                        }}>
                        <View>
                          <Image
                            source={{
                              uri: item.image_url + item.image,
                            }}
                            style={styleCss.programImage}
                          />
                          <View style={{padding: 5}}>
                            <Text>
                              {props.labelData.name} : {item.name}
                            </Text>
                            <Text>{item.iban}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  } else return <Loader />;
};

const mapStateToProps = (state) => {
  return {
    programError: state.programReducer.programError,
    programMessage: state.programReducer.programMessage,
    programData: state.programReducer.programData,
    programStatus: state.programReducer.programStatus,
    labelData: state.labelReducer.labelData,
  };
};
const actionCreators = {
  programAction: programActions.programAction,
  calender_Action: calenderActions.calenderAction,
  restaurantId: cartActions.restaurantId,
  selectedPlan: cartActions.selectedPlan,
  selectedImageUrl: cartActions.selectedImageUrl,
};
export default connect(mapStateToProps, actionCreators)(ProgramsComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  body: {
    flex: 2,
  },
  restorentBox: {
    width: '45%',
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#F2A884',
    shadowOpacity: 1,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
  },
  grid: {
    width: width * 0.9,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
