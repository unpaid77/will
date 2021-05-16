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
  Dimensions,
  I18nManager,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {multiSubActions} from '../../actions/multiSub';
import {mealListActions} from '../../actions/mealList';
import Header from '../../components/Header/Header';
const {width, height} = Dimensions.get('window');
let styleCss = require('../../GlobalStyle');
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {
  CHECK_GREEN,
  PLUS_ORANGE,
  COMMON_ARROW_LEFT,
  COMMON_ARROW_RIGHT,
  HOME_THREE_DOTS_RIGHT,
  AR,
  UP_ICON,
  IN_ICON,
} from '../../_helpers/ImageProvide';
import {useNavigation} from '@react-navigation/native';
const MultiSubs = (props) => {
  const navigation = useNavigation();
  const {featureId, date, week} = props.route.params;
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [weekList, setweekList] = useState([
    {selected: true, plan: null, planId: null},
    {selected: false, plan: null, planId: null},
    {selected: false, plan: null, planId: null},
    {selected: false, plan: null, planId: null},
    {selected: false, plan: null, planId: null},
    {selected: false, plan: null, planId: null},
    {selected: false, plan: null, planId: null},
    {selected: false, plan: null, planId: null},
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedIndex([]);
      setweekList([
        {selected: true, plan: null, planId: null},
        {selected: false, plan: null, planId: null},
        {selected: false, plan: null, planId: null},
        {selected: false, plan: null, planId: null},
        {selected: false, plan: null, planId: null},
        {selected: false, plan: null, planId: null},
        {selected: false, plan: null, planId: null},
        {selected: false, plan: null, planId: null},
      ]);
    });

    return unsubscribe;
  }, []);

  const selectItem = (index) => {
    if (selectedIndex.indexOf(index) > -1) {
      let newArray = selectedIndex.filter((indexObject) => {
        if (indexObject == index) {
          return false;
        }
        return true;
      });
      setSelectedIndex(newArray);
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }
  };
  if (props.labelData && props.multiSubData) {
    const planData = props.multiSubData;

    return (
      <>
        <Header />
        <ScrollView
          style={{backgroundColor: '#fff'}}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          <View style={styleCss.mainContainer}>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <View style={{position: 'absolute', left: 10, top: '44%'}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Home')}>
                  <Image
                    style={{width: 30, height: 19}}
                    source={
                      I18nManager.isRTL ? COMMON_ARROW_RIGHT : COMMON_ARROW_LEFT
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styleCss.featureBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      style={{width: 9, height: 19}}
                      source={require('../../../assets/image/home/threeDotLeft.png')}
                    />
                  </View>
                  <View style={{flex: 4}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#ef8361',
                        fontSize: 16,
                      }}>
                      {planData.feature_deatils.name}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Image
                      style={{
                        width: 9,
                        height: 19,
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                      }}
                      source={HOME_THREE_DOTS_RIGHT}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 15,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{flex: 2}}>
                <Text style={{fontSize: 18, fontWeight: '700'}}>
                  {props.labelData.select_you_date} :
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#aaaaaa',
                    flexDirection: 'row',
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  <View>
                    <Text>
                      {props.labelData.week} {props.selectedWeek}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center', paddingLeft: 5}}>
                    <Image style={{width: 12, height: 16}} source={AR} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* choose plan */}

          <ScrollView
            contentContainerStyle={styleCss.scrollViewCard}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive">
            {Object.keys(planData.company_list).map(
              (item, company_list_index) => {
                if (company_list_index === props.selectedWeek - 1) {
                  return (
                    <Collapse
                      isCollapsed={
                        company_list_index === props.selectedWeek - 1
                      }
                      key={company_list_index}
                      style={{paddingHorizontal: 20}}>
                      <CollapseHeader>
                        <TouchableOpacity
                          onPress={() => {
                            setweekList(
                              weekList.map((x, i) => {
                                return {
                                  ...x,
                                  selected:
                                    company_list_index === i ? true : false,
                                };
                              }),
                            );
                            selectItem(company_list_index);
                          }}
                          activeOpacity={0.9}>
                          <View style={styles.heading}>
                            <Text style={styles.text}>{item}</Text>
                            <View>
                              <Image
                                style={{width: 20, height: 20}}
                                source={
                                  weekList[company_list_index].selected
                                    ? UP_ICON
                                    : IN_ICON
                                }
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </CollapseHeader>
                      <CollapseBody>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginTop: 15,
                            marginBottom: 15,
                          }}>
                          {planData.company_list[item].diet_company.map(
                            (list, index) => {
                              return (
                                <View style={styles.cardBox} key={index}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      setweekList(
                                        weekList.map((x, i) => {
                                          return {
                                            ...x,
                                            planId:
                                              company_list_index === i &&
                                              list.id,
                                          };
                                        }),
                                      );
                                      props
                                        .mealListAction({
                                          restaurant_id: list.id,
                                          feature_id: featureId,
                                          date: date,
                                        })
                                        .then(() => {
                                          props.navigation.navigate(
                                            'MultiSubsPlan',
                                            {
                                              itemId: list,
                                              featureId: featureId,
                                              oneday: date,
                                              week: company_list_index,
                                            },
                                          );
                                        });
                                    }}>
                                    <Image
                                      style={{
                                        height: 150,
                                        borderRadius: 10,
                                      }}
                                      source={{
                                        uri: list.image_url + list.image,
                                      }}
                                    />
                                    <View
                                      style={{
                                        position: 'absolute',
                                        alignSelf: 'flex-end',
                                        padding: 5,
                                      }}>
                                      <Image
                                        style={{width: 20, height: 21}}
                                        source={
                                          list.id ===
                                          weekList[company_list_index].planId
                                            ? CHECK_GREEN
                                            : PLUS_ORANGE
                                        }
                                      />
                                    </View>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        paddingTop: 6,
                                      }}>
                                      {list.name}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            },
                          )}
                        </View>
                      </CollapseBody>
                    </Collapse>
                  );
                }
              },
            )}
          </ScrollView>
        </ScrollView>
      </>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    multiSubStatus: state.multiSubReducer.multiSubStatus,
    multiSubData: state.multiSubReducer.multiSubData,
    multiSubWeek: state.commonReducer.multiSubWeek,
    selectedWeek: state.commonReducer.selectedWeek,
    labelData: state.labelReducer.labelData,
  };
};
const actionCreators = {
  mealListAction: mealListActions.mealListAction,
  multiSubAction: multiSubActions.multiSubAction,
};
export default connect(mapStateToProps, actionCreators)(MultiSubs);

const styles = StyleSheet.create({
  cardBox: {
    shadowOffset: {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: width / 2.4,
    height: 200,
    margin: 5,
    padding: 10,
  },
  kd: {
    fontSize: 10,
    textAlign: 'right',
  },
  itemText: {
    fontSize: 10,
    width: 20,
  },

  itemContent: {
    fontSize: 10,
  },

  powerBox: {
    borderWidth: 1,
    borderColor: '#f2cab3',
    borderTopLeftRadius: 8,
    padding: 5,
    marginTop: 10,
  },

  imgBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 8,
    width: 78,
  },
  headingText: {
    fontSize: 10.5,
    fontWeight: '700',
    marginBottom: 5,
  },
  topPick: {
    borderWidth: 1,
    borderColor: '#f3b490',
    width: 50,
    position: 'absolute',
    left: -8,
    top: 2,
    zIndex: 9,
    backgroundColor: 'white',
    transform: [{rotate: '330deg'}],
  },
  toppickText: {
    fontSize: 10,
    color: '#f3b490',
    textAlign: 'center',
  },

  heading: {
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    shadowColor: '#F2A884',
    flexDirection: 'row',
    width: width * 0.9,
    shadowOpacity: 5,
    paddingBottom: 5,
    borderRadius: 5,
    paddingTop: 5,
    elevation: 5,
    margin: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },

  checkout: {
    backgroundColor: '#f2A884',
    bottom: 0,
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 5,
    marginTop: 10,
  },
  checkoutText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
