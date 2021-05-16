import {StyleSheet, Dimensions} from 'react-native';
import {verticleScale, scale} from './helper';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
  },
  bgImage: {height: `100%`},
  blackShade: {
    position: 'absolute',
    zIndex: 0,
    backgroundColor: '#000',
    opacity: 0.7,
  },
  firstScreenTextStyle: {
    color: '#fff',
    fontSize: scale(32),
    fontWeight: 'bold',
    marginHorizontal: scale(20),
    marginTop: verticleScale(50),
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteAbsoluteCenterAlignView: {
    ...StyleSheet.absoluteFill,
    position: 'absolute',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  swiperView: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
  },
  absoluteTop0View: {
    position: 'absolute',
    top: 0,
    width,
  },
  swiperScreen1TextTitle: {
    color: '#000',
    fontSize: scale(20),
    fontWeight: 'bold',
    marginHorizontal: scale(20),
    marginTop: verticleScale(10),
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  swiperScreen1TextSubTitle: {
    color: '#000',
    fontSize: scale(10),
    marginHorizontal: scale(35),
    marginTop: verticleScale(5),
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: scale(18),
  },
  swiper3ScreenText: {
    color: '#000',
    fontSize: scale(24),
    fontWeight: '700',
    marginHorizontal: scale(80),
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: scale(34),
  },
  fullHeight: {height: '100%'},
  btn: {
    height: verticleScale(36),
    width: width - verticleScale(80),
    marginLeft: verticleScale(40),
    borderRadius: verticleScale(5),
    marginBottom: verticleScale(8),
  },
  swiperDotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticleScale(40),
  },
  swiperDot: {
    height: scale(6),
    width: scale(6),
    borderRadius: scale(3),
    marginHorizontal: scale(3),
  },
  nextBtnText: {
    letterSpacing: 0.5,
  },
  skipBtnText: {
    letterSpacing: 0.5,
  },
  startBtnText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
