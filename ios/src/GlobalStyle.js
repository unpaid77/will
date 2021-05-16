'use strict';
var React = require('react-native');
var {StyleSheet, Dimensions} = React;
const {height, width} = Dimensions.get('window');

module.exports = StyleSheet.create({
  noRecordCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
    padding: 50,
    fontSize: 20,
    borderRadius: 20,
    margin: 10,
    color: '#D80000',
    fontWeight: '700',
  },
  grid: {
    width: width * 0.9,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  programImage: {
    width: '100%',
    resizeMode: 'cover',
    height: 120,
    borderRadius: 15,
  },
  mainContainer: {
    marginHorizontal: 20,
  },

  inputStyle: {
    borderColor: '#e0e0e0',
    padding: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    alignSelf: 'flex-start',
    height: 50,
    width: 300,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -15,
    fontStyle: 'italic',
  },

  navHome: {
    position: 'absolute',
    bottom: -5, // space from bottombar
    height: 68,
    width: 68,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#F2A884',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 0,
  },

  menuWhiteStrip: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#F2A884',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 50,
    alignItems: 'center',
  },

  header: {
    width: '100%',
    backgroundColor: '#fff',
    height: 50,
    shadowColor: '#F2A884',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 6,
    flexDirection: 'row',
    marginTop: React.Platform.OS=='android' ? 0: 30,
    justifyContent:'center',
    alignItems:'center'
  },

  bmiInput: {
    height: 27,
    width: 90,
    borderColor: '#CFCFCF',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  bmiLable: {
    color: '#989797',
    marginTop: 2,
    fontSize: 13,
  },

  textWidth: {
    width: 42,
    alignItems: 'flex-end',
  },

  inputunChecked: {
    height: 12,
    width: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#989797',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  inputChecked: {
    height: 12,
    width: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#989797',
    backgroundColor: '#f2A884',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  cALable: {
    color: '#000',
    marginTop: 2,
    fontSize: 13,
  },

  cAInput: {
    height: 24,
    width: 70,
    borderColor: '#c1c1c1',
    borderWidth: 1,
    borderRadius: 8,
  },

  roundShape: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: 50,
    width: 50,
    borderRadius: 50,
    position: 'absolute',
    right: -20,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputStyles: {
    borderColor: '#e0e0e0',
    alignSelf: 'flex-start',
    height: 50,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    fontStyle: 'italic',
    marginTop: 30,
    flexDirection: 'row',
    paddingRight: 15,
  },

  btnButton: {
    borderColor: '#f2A884',
    height: 50,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    borderRadius: 16,
    backgroundColor: '#f2A884',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },

  /// change password
  inputStylesPass: {
    borderColor: '#e0e0e0',
    alignSelf: 'flex-start',
    height: 50,
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 20,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    fontStyle: 'italic',
    flexDirection: 'row',
    paddingRight: 15,
  },

  /// Otp
  inputStylesOpt: {
    borderColor: '#e0e0e0',
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 20,
    backgroundColor: '#0000', // invisible color
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 20,
    padding: 8,
  },

  // All Payment method css start

  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
    flex: 1,
  },

  creditCardHeading: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 15,
  },

  creditText: {
    textAlign: 'center',
    fontSize: 12,
    paddingHorizontal: 70,
  },

  methodHeadtext: {
    fontSize: 24,
    fontWeight: '700',
  },
  textColor: {
    color: '#f2A884',
  },
  mrTop: {
    marginTop: 0,
    marginBottom: 20,
  },

  // All Payment method css end

  serviceBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    shadowRadius: 3,
    elevation: 6,
    padding: 8,
    height: 80,
  },
  serviceBoxAlter: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    shadowRadius: 3,
    elevation: 6,
    padding: 8,
    height: 80,
    borderWidth: 1,
    borderColor: '#F2A884',
  },
  textContainer: {
    marginHorizontal: 7,
  },

  h2: {
    fontSize: 18,
    color: '#f2A884',
    fontWeight: '700',
  },
  ptext: {
    fontSize: 11,
    color: 'black',
    marginTop: 12,
  },

  // feature css start

  featureBox: {
    width: 155,
    height: 155,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 6,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  //feature css end

  // program css start
  programBox: {
    width: 155,
    //height: 175,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 6,
    backgroundColor: '#0000', // invisible color
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginVertical: 15,
    padding: 10,
  },

  //program css end

  gridView: {
    flex: 1,
  },

  companies: {
    marginTop: 10,
    flex: 1,
  },
  homeCard: {
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: width / 2.3,
    margin: 5,
    padding: 8,
    height: 170,
    marginBottom: 10,
  },

  homeCard2: {
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: width / 2.2,
    margin: 5,
    padding: 10,
    height: 200,
    marginBottom: 10,
  },

  scrollViewCard: {
    width: width,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  compBox: {
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 6,
    backgroundColor: '#0000', // invisible color
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // width: 155,
    // height:170,
    padding: 8,
    flex: 1,
  },

  //search bar css start

  inputArea: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderColor: '#e0e0e0',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    alignSelf: 'flex-start',
    height: 50,
    width: '100%',
    borderWidth: 1,
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    backgroundColor: '#0000', // invisible color
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    fontStyle: 'italic',
  },

  //search bar css end

  navButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    borderRadius: 10,
  },

  dropText: {
    color: '#f2A884',
    textAlign: 'center',
  },

  headingPro: {
    fontSize: 20,
    fontWeight: '700',
  },

  //choose plan
  choosePlan: {
    shadowOffset:
      Platform.OS === 'ios' ? {width: 15, height: 15} : {width: 20, height: 20},
    shadowColor: '#F2A884',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 8,
    elevation: 5,
    backgroundColor: '#0000', // invisible color
    borderRadius: 10,
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    marginTop: 2,
  },

  greenButton: {
    position: 'absolute',
    zIndex: 999,
    right: 10,
    top: 10,
  },
});

// #f2A884

//https://medium.com/@muthudevendra/react-native-custom-shareable-components-radio-button-708ce480e1f7
