/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  Platform,
} from 'react-native';
import moment from 'moment';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import {multiSubActions} from '../../actions/multiSub';
import {cartActions} from '../../actions/cart';
import {useNavigation} from '@react-navigation/native';
import {CALANDER_CONFIG, WEEK_LIST} from '../../_helpers/globalVeriable';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader/Loader';
import {
  CROSS_WHITE,
  UP_DOWN_ARROW,
  CIRCLE_ARROW_LEFT,
  CIRCLE_ARROW_RIGHT,
} from '../../_helpers/ImageProvide';
const {width} = Dimensions.get('window');
const MultiSubCalender = (props) => {
  const navigation = useNavigation();
  const {featureId, itemId} = props.route.params;
  const [visible, setVisible] = useState(false);
  const [valueone, setValueone] = useState(null);
  const [selectWeek, setSelectWeek] = useState(props.labelData.select);
  const [PROP_ONE, SET_PROP_ONE] = useState();
  LocaleConfig.locales['ar'] = CALANDER_CONFIG['ar'];
  LocaleConfig.locales['en'] = CALANDER_CONFIG['en'];
  useEffect(() => {
    const lc = async () => {
      const lan = await AsyncStorage.getItem('language');
      LocaleConfig.defaultLocale = lan;
      SET_PROP_ONE(WEEK_LIST[lan]);
    };
    lc();
    const unsubscribe = navigation.addListener('focus', () => {
      setVisible(false);
      setValueone(null);
      setValueone(null);
      setSelectWeek(props.labelData.select);
    });
    return () => unsubscribe;
  }, [featureId, itemId]);
  const onDayPress = (day) => {
    if (valueone != null) {
      props.multiSubSelectedWeek(1);
      props.selectedDate(day.dateString);
      props
        .multiSubAction({
          feature_id: featureId,
          start_date: day.dateString,
          number_of_week: valueone,
        })
        .then(() => {
          props.navigation.navigate('MultiSubs', {
            featureId: featureId,
            date: day.dateString,
            week: valueone,
          });
        });
    } else {
      Toast.showWithGravity(
        props.labelData.please_select_number_of_week,
        Toast.SHORT,
        Toast.CENTER,
      );
    }
  };
  const getDisabledDates = () => {
    const disabledDates = {};
    for (let i = 0; i < 3; i++) {
      let m = moment(new Date()).add(i, 'days');

      disabledDates[m.format('YYYY-MM-DD')] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          container: {
            backgroundColor:
              new Date().getDate() === new Date(m).getDate()
                ? '#f2A884'
                : '#75798e',
          },
          text: {
            color: '#fff',
          },
        },
      };
    }

    return disabledDates;
  };
  const renderCalendarWithSelectableDate = () => {
    if (PROP_ONE) {
      return (
        <>
          <View style={styles.calendarbg}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive">
              <View style={styles.topBg}>
                <View style={styles.arrow}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.goBack('Home');
                    }}>
                    <Image style={styles.arrowImg} source={CROSS_WHITE} />
                  </TouchableOpacity>
                </View>

                <View style={styles.roundShap}>
                  <TouchableOpacity
                    style={styles.innerroundShap}
                    onPress={() => setVisible(true)}>
                    <View
                      style={{
                        marginTop: 15,
                        paddingVertical: 5,
                        paddingHorizontal: 12,
                        backgroundColor: '#f2A884',
                        fontWeight: 'bold',
                        borderRadius: 5,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          paddingRight: 10,
                        }}>
                        {selectWeek}
                      </Text>
                      <Image
                        style={{width: 15, height: 15, marginTop: 5}}
                        source={UP_DOWN_ARROW}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '400',
                        fontSize: 18,
                        marginTop: 5,
                      }}>
                      {props.labelData.week}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.calendarArea}>
                <Calendar
                  horizontal={true}
                  pagingEnabled={true}
                  scrollEnabled={true}
                  minDate={new Date()}
                  markingType={'period'}
                  disableAllTouchEventsForDisabledDays
                  rowHeight={5}
                  onDayPress={onDayPress}
                  hideExtraDays={true}
                  renderArrow={(direction) => (
                    <View>
                      <Image
                        source={
                          direction == 'left'
                            ? !I18nManager.isRTL
                              ? CIRCLE_ARROW_LEFT
                              : CIRCLE_ARROW_RIGHT
                            : !I18nManager.isRTL
                            ? CIRCLE_ARROW_RIGHT
                            : CIRCLE_ARROW_LEFT
                        }
                      />
                    </View>
                  )}
                  theme={{
                    calendarBackground: '#343739',
                    todayTextColor: '#ffffff',
                    todayBackgroundColor: '#f2A884',
                    textDisabledColor: '#6a6e7f',
                    dayTextColor: '#ffffff',
                    monthTextColor: '#ffffff',
                    selectedDayBackgroundColor: '#333248',
                  }}
                  markingType={'custom'}
                  markedDates={{
                    ...getDisabledDates(),
                  }}
                />
              </View>

              <View style={styles.seleceted}>
                <View style={styles.rowSpace}>
                  <View style={styles.colorBox1}></View>
                  <View>
                    <Text style={styles.textColor}>
                      {props.labelData.selected_days}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.rowSpace}>
                    <View style={styles.colorBox2}></View>
                    <View>
                      <Text style={styles.textColor}>
                        {props.labelData.available_for_selection}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.rowTwo}>
                <View style={styles.rowSpace}>
                  <View style={styles.colorBox3}></View>
                  <Text style={styles.textColor}>
                    {props.labelData.unavailable_selected}
                  </Text>
                </View>
              </View>
            </ScrollView>
            <Modal
              isVisible={visible}
              backdropColor="#fff"
              backdropOpacity={0.1}
              onBackdropPress={() => setVisible(false)}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 15,
                    fontWeight: '700',
                  }}>
                  {props.labelData.select_you_week}{' '}
                </Text>
                <View style={styles.container}>
                  {PROP_ONE.map((res, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setValueone(res.key);
                          setSelectWeek(res.text);
                          setVisible(false);
                          props.multiSubAddSelectedData([]);
                          props.multiSubWeek(res.key);
                        }}
                        key={res.key}
                        style={styles.first}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.radioText}>{res.text}</Text>
                          <View style={styles.radioCircle}>
                            {valueone === res.key && (
                              <View style={styles.selectedRb} />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </Modal>
          </View>
        </>
      );
    } else {
      return <Loader />;
    }
  };
  return <>{renderCalendarWithSelectableDate()}</>;
};

const actionCreators = {
  multiSubAction: multiSubActions.multiSubAction,
  multiSubWeek: multiSubActions.multiSubWeek,
  multiSubSelectedWeek: multiSubActions.multiSubSelectedWeek,
  selectedDate: cartActions.selectedDate,
  multiSubAddSelectedData: multiSubActions.multiSubAddSelectedData,
};
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
export default connect(mapStateToProps, actionCreators)(MultiSubCalender);
const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
    backgroundColor: 'green',
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },

  calendarbg: {
    backgroundColor: '#343739',
    flex: 1,
  },
  topBg: {
    backgroundColor: '#f2A884',
    height: 150,
    alignItems: 'center',
  },

  calendarArea: {
    marginTop: 80,
  },

  roundShap: {
    backgroundColor: '#393f5d',
    width: 150,
    height: 150,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerroundShap: {
    width: 131,
    height: 130,
    borderRadius: 100,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#F2A884',
    elevation: 5,
    backgroundColor: '#0000', // invisible col
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  todayDate: {
    fontSize: 26,
    color: '#ffffff',
  },

  todayMonth: {
    fontSize: 18,
    color: '#9c9da4',
    fontWeight: 'bold',
  },

  seleceted: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },

  colorBox1: {
    width: 20,
    height: 20,
    backgroundColor: '#f2A884',
    marginRight: 10,
  },

  colorBox2: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    marginRight: 10,
  },

  colorBox3: {
    width: 20,
    height: 20,
    backgroundColor: '#75798e',
    marginRight: 10,
  },

  textColor: {
    color: '#f2A884',
    fontSize: 14,
  },

  rowSpace: {
    flexDirection: 'row',
  },

  rowTwo: {
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  arrowImg: {
    width: 15,
    height: 15,
  },

  arrow: {
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: Platform.OS === 'android' ? 34 : 44,
  },

  heading: {
    fontSize: 28,
    color: '#ffffff',
  },

  selectHeading: {
    alignItems: 'center',
    marginVertical: 15,
  },
  container: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  first: {
    width: width / 3,
    margin: 5,
    padding: 5,
  },
  radioText: {
    marginRight: 5,
    fontSize: 13,
    color: '#000',
    fontWeight: '300',
  },
  radioCircle: {
    marginTop: 3,
    height: 13,
    width: 13,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#f2A884',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 13,
    height: 13,
    borderRadius: 50,
    backgroundColor: '#f2A884',
  },
});
