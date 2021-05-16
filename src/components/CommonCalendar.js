/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';
import {programPlanActions} from '../actions/programPlan';
import {dietCompanyPlanActions} from '../actions/dietPlan';
import {cartActions} from '../actions/cart';
import {
  CROSS_WHITE,
  CIRCLE_ARROW_LEFT,
  CIRCLE_ARROW_RIGHT,
} from '../_helpers/ImageProvide';
const {width} = Dimensions.get('window');
import {CALANDER_CONFIG} from '../_helpers/globalVeriable';
import moment from 'moment';
import Loader from './Loader/Loader';
import AsyncStorage from '@react-native-community/async-storage';
const CommonCalendar = (props) => {
  LocaleConfig.locales['ar'] = CALANDER_CONFIG['ar'];
  LocaleConfig.locales['en'] = CALANDER_CONFIG['en'];
  const [localLang, setLocalLang] = useState('en');
  useEffect(() => {
    const lc = async () => {
      let lan = await AsyncStorage.getItem('language');
      LocaleConfig.defaultLocale = lan;
      setLocalLang(lan);
    };
    lc();
  }, []);
  const navigation = useNavigation();
  const monthName = () => {
    const months = CALANDER_CONFIG[localLang].monthNames;
    return months[new Date().getMonth()];
  };
  var today = new Date();

  const dietCompanyPlannavigation = (day) => {
    props
      .dietCompanyPlanAction({
        program_id: props.program_id,
        restaurant_id: props.restaurant_id,
      })
      .then(() => {
        navigation.navigate('PlanListProgram', {
          selectedDate: day,
          type: 3,
        });
      });
  };
  const programPalnnavigation = (day) => {
    props
      .programPlanAction({
        program_id: props.program_id,
        restaurant_id: props.restaurant_id,
      })
      .then(() => {
        navigation.navigate('PlanListProgram', {
          selectedDate: day,
          type: 2,
        });
      });
  };

  const getDisabledDates = () => {
    const disabledDates = {};
    for (let i = 0; i < 3; i++) {
      let m_Day = moment(new Date()).add(i, 'days');
      disabledDates[m_Day.format('YYYY-MM-DD')] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          container: {
            backgroundColor:
              new Date().getDate() === new Date(m_Day).getDate()
                ? '#f2A884'
                : '#75798e',
          },
          text: {
            color: '#fff',
          },
        },
      };
    }

    if (Object.keys(props.calenderData).length !== 0) {
      if (props.calenderData.data.calendar) {
        props.calenderData.data.calendar.map((element) => {
          disabledDates[moment(element.date).format('YYYY-MM-DD')] = {
            textColor: '#75798e',
            disabled: true,
            disableTouchEvent: true,
            customStyles: {
              container: {
                backgroundColor: '#75798e',
              },
              text: {
                color: '#ccc',
              },
            },
          };
        });
      }
    }
    return disabledDates;
  };

  if (props.calenderData) {
    return (
      <View style={styles.container}>
        <View style={styles.close}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={{width: 20, height: 20}} source={CROSS_WHITE} />
          </TouchableOpacity>
        </View>
        <View style={{height: 80}}>
          <View style={styles.circle}>
            <View style={styles.innerroundShap}>
              <Text style={styles.todayDate}>{new Date().getDate()}</Text>
              <Text style={styles.todayMonth}>{monthName()}</Text>
            </View>
          </View>
        </View>
        <View style={styles.Devision}>
          <Text style={styles.heading}>{props.labelData.select_you_date} </Text>
          <Calendar
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={true}
            minDate={new Date()}
            markingType={'period'}
            disableAllTouchEventsForDisabledDays
            rowHeight={5}
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
            onDayPress={(day) => {
              props.selectedDate(day.dateString);
              props.programName === 'diet_company'
                ? dietCompanyPlannavigation(day.dateString)
                : programPalnnavigation(day.dateString);
            }}
            markingType={'custom'}
            markedDates={{
              ...getDisabledDates(),
            }}
          />
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
                {props.labelData.unavailable_selected}{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return <Loader />;
  }
};

const mapStateToProps = (state) => {
  return {
    calenderMessage: state.calenderReducer.calenderMessage,
    calenderStatus: state.calenderReducer.calenderStatus,
    calenderError: state.calenderReducer.calenderError,
    calenderData: state.calenderReducer.calenderData,
    restaurant_id: state.cartReducer.restaurant_id,
    features_id: state.cartReducer.features_id,
    programName: state.cartReducer.programName,
    labelData: state.labelReducer.labelData,
    program_id: state.cartReducer.program_id,
  };
};

const reduxActions = {
  dietCompanyPlanAction: dietCompanyPlanActions.dietCompanyPlanAction,
  programPlanAction: programPlanActions.programPlanAction,
  selectedDate: cartActions.selectedDate,
};
export default connect(mapStateToProps, reduxActions)(CommonCalendar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 30,
    backgroundColor: '#f2A884',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    zIndex: 1,
    top: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#393f5d',
  },
  close: {
    marginTop: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  innerroundShap: {
    width: 140,
    height: 140,
    shadowOffset: {width: 0, height: 0},
    borderRadius: 100,
    backgroundColor: '#393f5d',
    shadowColor: '#F2A884',
    elevation: 15,
    alignItems: 'center',
    shadowOpacity: 10,
    justifyContent: 'center',
  },
  Devision: {
    paddingTop: 30,
    flex: 3,
    backgroundColor: '#343739',
    width: width,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  heading: {
    fontSize: 28,
    color: 'white',
    alignSelf: 'center',
  },
  topBg: {
    backgroundColor: '#f2A884',
    height: 150,
    alignItems: 'center',
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

  todayDate: {
    fontSize: 26,
    color: 'white',
  },

  todayMonth: {
    fontSize: 16,
    color: '#9c9da4',
  },

  seleceted: {
    marginTop: 30,
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
    paddingTop: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
});
