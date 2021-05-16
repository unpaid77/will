import React from 'react';
import {
  View,
  ImageBackground,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import CONSTANTS from './constants';
import styles from './anim.styles';
import {verticleScale, scale} from './helper';
import AsyncStorage from '@react-native-community/async-storage';
const {IMG, DURATION, STEP3, STEP4, STEP5, COLOR} = CONSTANTS;
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {labelActions} from '../../actions/label';
import {cartActions} from '../../actions/cart';
import Loader from '../../components/Loader/Loader';
const logoWidth = (3 / 4) * width;

class Main extends React.Component {
  constructor(props) {
    super(props);
    props.labelAction();
    props.ListOfItems();
    this.state = {
      scale: new Animated.Value(1),
      top: new Animated.Value(-1 * logoWidth),
      left: new Animated.Value((width - logoWidth) / 2),
      logoDimensions: new Animated.Value(logoWidth),
      logoImage: IMG.LOGO_WITH_TEXT,
      opacity: new Animated.Value(0),
      opacity1: new Animated.Value(0),
      opacity2: new Animated.Value(0),
      opacity3: new Animated.Value(0),
      opacity4: new Animated.Value(0),
      topPadding: 0,
      screen: '0',
      login: false,
    };
    this._isMounted = false;
  }
  async getRemem() {
    try {
      const verify = await AsyncStorage.getItem('verify');
      const remember = await AsyncStorage.getItem('remember');
      const token = await AsyncStorage.getItem('token');
      if (
        verify == 'yes' &&
        (token != null || token != '' || token != undefined)
      ) {
        this._isMounted && this.setState({login: true});
      } else {
        this._isMounted && this.setState({login: false});
      }
    } catch (e) {
      //  error
      console.error(e);
    }
  }
  componentDidMount() {
    setTimeout(this.step1Animantion, 500);
    this._isMounted = true;
    this._isMounted && this.getRemem();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onNext = () => {
    let {screen} = this.state;
    switch (screen) {
      case '1':
        return this.setState({screen: '2'}, this.showScreen2);
      case '2':
        return this.setState({screen: '3'}, this.step4TopShifting);
      case '3':
        return this.step5Shifting();
    }
  };

  onSkip = () => {
    this.step5Shifting();
  };

  step1Animantion = () => {
    Animated.spring(this.state.top, {
      toValue: height / 2 - logoWidth / 2,
      duration: DURATION.STEP1_ANIMATION,
      useNativeDriver: false,
    }).start(this.step2Scaling);
  };

  step2Scaling = () => {
    Animated.spring(this.state.scale, {
      toValue: 1.5,
      duration: DURATION.STEP1_ANIMATION,
      useNativeDriver: false,
    }).start(() => {
      this.setState(
        {
          logoImage: IMG.LOGO_WITHOUT_TEXT,
          topPadding: verticleScale(STEP3.top) + verticleScale(STEP3.logosize),
          screen: '1',
        },
        this.step3TopShifting,
      );
    });
  };

  step3TopShifting = () => {
    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: DURATION.STEP3_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.top, {
        toValue: verticleScale(STEP3.top),
        duration: DURATION.STEP3_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.logoDimensions, {
        toValue: verticleScale(STEP3.logosize),
        duration: DURATION.STEP3_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.left, {
        toValue: (width - verticleScale(STEP3.logosize)) / 2,
        duration: DURATION.STEP3_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: DURATION.STEP3_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity1, {
        toValue: 1,
        duration: DURATION.STEP3_ANIMATION,
        useNativeDriver: false,
      }),
    ]).start();
  };

  showScreen2 = () => {
    Animated.parallel([
      Animated.timing(this.state.opacity1, {
        toValue: 0,
        duration: DURATION.SWIPER_SCREEN_2,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity2, {
        toValue: 1,
        duration: DURATION.SWIPER_SCREEN_2,
        useNativeDriver: false,
      }),
    ]).start();
  };

  step4TopShifting = () => {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: scale(STEP4.top),
        duration: DURATION.STEP4_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity2, {
        toValue: 0,
        duration: DURATION.STEP4_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity3, {
        toValue: 1,
        duration: DURATION.STEP4_ANIMATION,
        useNativeDriver: false,
      }),
    ]).start();
  };

  step5Shifting = () => {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: verticleScale(STEP5.top),
        duration: DURATION.STEP5_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.left, {
        toValue: scale(205),
        duration: DURATION.STEP5_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: DURATION.STEP5_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity4, {
        toValue: 1,
        duration: DURATION.STEP5_ANIMATION,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        this.setState({logoImage: IMG.LOGO_WITH_TEXT}, this.step6Shifting);
      }, 500);
    });
  };

  step6Shifting = () => {
    const widthOfLogo = logoWidth * 1.2;
    const scale = widthOfLogo / verticleScale(STEP3.logosize);
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: height / 2 - verticleScale(STEP3.logosize) / 2,
        duration: DURATION.STEP6_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.scale, {
        toValue: scale,
        duration: DURATION.STEP6_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.left, {
        toValue: (width - verticleScale(STEP3.logosize)) / 2,
        duration: DURATION.STEP6_ANIMATION,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity4, {
        toValue: 0,
        duration: DURATION.STEP6_ANIMATION,
        useNativeDriver: false,
      }),
    ]).start(() => {
      this.setState({screen: '4'});
    });
  };

  render() {
    if (this.props.labelStatus) {
      return (
        <View style={styles.container}>
          <ImageBackground source={{uri: IMG.BG}} style={styles.bgImage}>
            <BlackShade />
            <FirstScreen
              on
              text={
                this.props.labelData['the_journey_to your_health_starts_with']
              }
              screen={this.state.screen}
              navigation={this.props.navigation}
              log={this.state.login}
              labelData={this.props.labelData}
            />
            <Animated.View
              style={[
                styles.whiteAbsoluteCenterAlignView,
                {opacity: this.state.opacity4},
              ]}>
              <View
                style={{
                  height: verticleScale(210),
                  width: verticleScale(260),
                  marginTop: verticleScale(70),
                }}>
                <Image
                  resizeMode="contain"
                  source={{uri: IMG.WELCOME_SCREEN}}
                  style={{height: '100%'}}
                />
              </View>
              <View
                style={[
                  {
                    position: 'absolute',
                    width,
                    top:
                      verticleScale(STEP5.top) +
                      verticleScale(STEP3.logosize) / 2,
                    height: verticleScale(STEP3.logosize),
                  },
                ]}>
                <Text style={[styles.swiperScreen1TextTitle, {marginTop: 0}]}>
                  {this.props.labelData.welcome2}
                </Text>
                <Text style={styles.swiperScreen1TextSubTitle}>
                  {this.props.labelData.takeaway}
                </Text>
              </View>
            </Animated.View>

            {/* SWIPER SCREENS STARTS */}
            <Animated.View
              style={[styles.swiperView, {opacity: this.state.opacity}]}>
              {/* swiper screen 1 start */}
              <Animated.View
                style={[
                  styles.absoluteTop0View,
                  {opacity: this.state.opacity1},
                ]}>
                <View style={{paddingTop: this.state.topPadding}}>
                  <View style={{height: verticleScale(200)}}>
                    <Image
                      resizeMode="contain"
                      source={{uri: IMG.SWIPER_SCREEN_1}}
                      style={styles.fullHeight}
                    />
                  </View>
                  <Text style={styles.swiperScreen1TextTitle}>
                    {this.props.labelData.all_kind_of_healthy_food}
                  </Text>
                  <Text style={styles.swiperScreen1TextSubTitle}>
                    {this.props.labelData.subscribe_for_one_day_week}
                  </Text>
                </View>
              </Animated.View>
              {/* swiper screen 1 ends */}

              {/* swiper screen 2 start */}
              <Animated.View
                style={[
                  styles.absoluteTop0View,
                  {opacity: this.state.opacity2},
                ]}>
                <View style={{paddingTop: this.state.topPadding}}>
                  <View
                    style={{flexDirection: 'row', height: verticleScale(200)}}>
                    <View
                      style={{
                        flex: 1,
                        height: verticleScale(100),
                        marginTop: verticleScale(40),
                      }}>
                      <Image
                        resizeMode="contain"
                        source={{uri: IMG.SWIPER_SCREEN_2.LEFT}}
                        style={styles.fullHeight}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        height: verticleScale(100),
                        marginBottom: verticleScale(40),
                      }}>
                      <Image
                        resizeMode="contain"
                        source={{uri: IMG.SWIPER_SCREEN_2.MID}}
                        style={styles.fullHeight}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        height: verticleScale(100),
                        marginTop: verticleScale(40),
                      }}>
                      <Image
                        resizeMode="contain"
                        source={{uri: IMG.SWIPER_SCREEN_2.RIGHT}}
                        style={styles.fullHeight}
                      />
                    </View>
                  </View>
                  <Text style={styles.swiperScreen1TextTitle}>
                    {this.props.labelData.try_our_healthy_programs}
                  </Text>
                  <Text style={styles.swiperScreen1TextSubTitle}>
                    {this.props.labelData.feel_like_going_for_deto}
                  </Text>
                </View>
              </Animated.View>
              {/* swiper screen 2 ends */}

              {/* swiper screen 3 start */}
              <Animated.View
                style={[
                  styles.absoluteTop0View,
                  {opacity: this.state.opacity3},
                ]}>
                <View
                  style={{
                    height: verticleScale(300),
                    marginTop: verticleScale(STEP4.top - 90),
                  }}>
                  <Text style={styles.swiper3ScreenText}>
                    {this.props.labelData.where_there_a}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <View style={{flex: 1, height: verticleScale(80)}}>
                      <Image
                        resizeMode="contain"
                        source={{uri: IMG.SWIPER_SCREEN_3.LEFT}}
                        style={styles.fullHeight}
                      />
                    </View>
                    <View style={{flex: 1}} />
                    <View style={{flex: 1, height: verticleScale(120)}}>
                      <Image
                        resizeMode="contain"
                        source={{uri: IMG.SWIPER_SCREEN_3.LEFT}}
                        style={styles.fullHeight}
                      />
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.swiper3ScreenText,
                      {marginTop: verticleScale(10)},
                    ]}>
                    {this.props.labelData.there_is_a_way}
                  </Text>
                </View>
              </Animated.View>
              {/* swiper screen 3 start */}

              <View style={{marginTop: verticleScale(400)}}>
                <Animated.View
                  style={[
                    styles.swiperDotWrapper,
                    {opacity: this.state.opacity},
                  ]}>
                  {[1, 2, 3].map((item, index) => {
                    return (
                      <Animated.View
                        key={index}
                        style={[
                          styles.swiperDot,
                          {
                            backgroundColor:
                              this.state.screen == `${item}`
                                ? COLOR.ACTIVE_SWIPER_DOT
                                : COLOR.INACTIVE_SWIPER_DOT,
                          },
                        ]}
                      />
                    );
                  })}
                </Animated.View>
                <Btn
                  lable={this.props.labelData.next}
                  onPress={this.onNext}
                  btnTextStyle={styles.nextBtnText}
                />
                <Btn
                  lable={this.props.labelData.skip}
                  onPress={this.onSkip}
                  btnTextStyle={styles.skipBtnText}
                  fill={false}
                />
              </View>
            </Animated.View>
            {/* SWIPER SCREENS ENDS */}

            {/* ANIMATED LOGO STARTS */}
            <Animated.View
              style={{
                height: this.state.logoDimensions,
                width: this.state.logoDimensions,
                position: 'absolute',
                top: this.state.top,
                left: this.state.left,
                transform: [
                  {
                    scale: this.state.scale,
                  },
                ],
              }}>
              <Image
                source={{uri: this.state.logoImage}}
                style={{height: '100%'}}
              />
            </Animated.View>
            {/* ANIMATED LOGO STARTS */}
          </ImageBackground>
        </View>
      );
    } else {
      return <Loader />;
    }
  }
}

const BlackShade = () => <View style={[styles.container, styles.blackShade]} />;

const FirstScreen = ({text, screen, navigation, log, labelData}) => {
  return (
    <>
    <View style={[styles.container, { justifyContent: 'space-between' }]}>
      <Text style={styles.firstScreenTextStyle}>{text}</Text>
      <View style={{zIndex: 10000, position: 'absolute', bottom: 0}}>
        {screen === '4' && (
          <Btn
            style={{
              marginBottom: verticleScale(90),
              borderRadius: verticleScale(18),
              zIndex: 999,
            }}
            btnTextStyle={styles.startBtnText}
            lable={labelData.get_start_here}
            onPress={() => {
              navigation.navigate(log ? 'Drawer' : 'Login');
            }}
          />
        )}
      </View>
    </View>
      <View style={{zIndex:10000, position:'absolute', bottom:0}}>

      {screen === '4' && (log?
        <Btn
          style={{ marginBottom: verticleScale(90), borderRadius: verticleScale(18), zIndex: 999 }}
          btnTextStyle={styles.startBtnText}
          lable={'Get start here'}
          onPress={() => {
            console.log("Nigating too Drawer");
            navigation.navigate('Drawer');
          }}
        />: <Btn
        style={{ marginBottom: verticleScale(90), borderRadius: verticleScale(18), zIndex: 999 }}
        btnTextStyle={styles.startBtnText}
        lable={'Get start here'}
        onPress={() => {
          console.log("Nigating too Login");
          navigation.navigate('Login');
        }}
      />
      )}
    </View>
    </>
    
  )
};

const Btn = ({
  lable = '',
  onPress,
  fill = true,
  style = {},
  btnTextStyle = {},
}) => {
  const THEME = fill
    ? {backgroundColor: COLOR.THEME}
    : {backgroundColor: 'transparent'};
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.center, styles.btn, THEME, style]}>
      <Text
        style={[
          btnTextStyle,
          {color: fill ? COLOR.FILL_BTN_TEXT : COLOR.FREE_BTN_TEXT},
        ]}>
        {lable}
      </Text>
    </TouchableOpacity>
  );
};
const mapStateToProps = (state) => {
  return {
    labelData: state.labelReducer.labelData,
    labelStatus: state.labelReducer.labelStatus,
  };
};

const actionCreators = {
  labelAction: labelActions.labelAction,
  ListOfItems: cartActions.ListOfItems,
};
export default connect(mapStateToProps, actionCreators)(Main);
