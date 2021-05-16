import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Home from './tabHome';
import Header from '../components/Header/Header';
let styleCss = require('../GlobalStyle');
const HomeScreen = (props) => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default HomeScreen;
