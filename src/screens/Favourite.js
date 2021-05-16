import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ImagePropTypes} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {CROSS} from '../_helpers/ImageProvide';
import {Calendar, CalendarList} from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';
const OneDay = (props) => {
  const calender = [
    {
      date: '2020-10-25',
      is_off: 1,
    },
    {
      date: '2020-10-20',
      is_off: 1,
    },
    {
      date: '2020-11-26',
      is_off: 1,
    },
    {
      date: '2020-10-29',
      is_off: 1,
    },
  ];
  const [selected, setSelected] = useState('');

  const onDayPress = (day) => {
    props.navigation.navigate('Home');
  };
  const getDisabledDates = (startDate, calenderDate) => {
    const disabledDates = {};
    const start = moment(startDate);
    const end = moment(startDate).add(2, 'days');

    for (
      let m_Day = moment(start).add(1, 'days');
      m_Day.diff(end, 'days') <= 0;
      m_Day.add(1, 'days')
    ) {
      disabledDates[m_Day.format('YYYY-MM-DD')] = {
        textColor: '#f2A884',
        disabled: true,
        disableTouchEvent: true,
      };
    }
    calenderDate.forEach((element) => {
      disabledDates[moment(element.date).format('YYYY-MM-DD')] = {
        textColor: '#75798e',
        disabled: true,
        disableTouchEvent: true,
      };
    });

    return disabledDates;
  };
  const renderCalendarWithSelectableDate = (calen) => {
    var calendar = calen.map((item) => {
      if (item.is_off) {
        return {date: item.date};
      }
    });
    return (
      <>
        <View style={styles.calendarbg}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive">
            <View style={styles.topBg}>
              <View style={styles.arrow}>
                <Image style={styles.arrowImg} source={CROSS} />
              </View>

              <View style={styles.roundShap}>
                <View style={styles.innerroundShap}>
                  <Text style={styles.todayDate}>20</Text>
                  <Text style={styles.todayMonth}>October</Text>
                </View>
              </View>
            </View>

            <View style={styles.calendarArea}>
              <View style={styles.selectHeading}>
                <Text style={styles.heading}>
                  {props.labelData.select_you_week}{' '}
                </Text>
              </View>
              <CalendarList
                horizontal={true}
                // Enable paging on horizontal, default = false
                pagingEnabled={true}
                scrollEnabled={true}
                minDate={new Date()}
                markingType={'period'}
                disableAllTouchEventsForDisabledDays
                style={styles.calendar}
                onDayPress={onDayPress}
                theme={{
                  calendarBackground: '#343739',
                  todayTextColor: 'white',
                  todayBackgroundColor: '#f2A884',
                  textDisabledColor: '#6a6e7f',
                  dayTextColor: 'white',
                  monthTextColor: 'white',
                  selectedDayBackgroundColor: '#333248',
                }}
                markedDates={{
                  ...getDisabledDates(new Date(), calendar),
                }}
              />
            </View>

            <View style={styles.seleceted}>
              <View style={styles.rowSpace}>
                <View style={styles.colorBox1}></View>
                <View>
                  <Text style={styles.textColor}>Selected days</Text>
                </View>
              </View>
              <View>
                <View style={styles.rowSpace}>
                  <View style={styles.colorBox2}></View>
                  <View>
                    <Text style={styles.textColor}>
                      Available for Selection
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rowTwo}>
              <View style={styles.rowSpace}>
                <View style={styles.colorBox3}></View>
                <Text style={styles.textColor}>Unavailable for Selection</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  };
  //{renderCalendarWithSelectableDate(calender)}
  return <>{renderCalendarWithSelectableDate(calender)}</>;
};
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
  };
};
export default connect(mapStateToProps, null)(OneDay);
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
    backgroundColor: '#393f5d',
    width: 130,
    height: 130,
    borderRadius: 100,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#F2A884',
    shadowOpacity: 8,
    elevation: 5,
    backgroundColor: '#0000', // invisible col
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
    marginTop: 30,
  },

  heading: {
    fontSize: 28,
    color: 'white',
  },

  selectHeading: {
    alignItems: 'center',
    marginVertical: 15,
  },
});
