import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import FoodLoader from '../components/Loader/Loader_food';

const paymentView = ({navigation, route}) => {
  const paymentUrl = route.params.paymentUrl;
  const [visible, setVisible] = useState(true);
  const [webview, setwebview] = useState();
  const [count, setCount] = useState(0);
  useEffect(() => {
    // if(route.params.paymentUrl == null){
    //   navigation.navigate('drawer')
    // }
    const unsubscribe = navigation.addListener('focus', () => {
      setVisible(true);
      setCount(0);
    });
    return unsubscribe;
  }, [visible]);  
  const _onNavigationStateChange = (webViewState) => {
    const {url} = webViewState;
    setCount(count + 1);
    if (count > 2) {
      setVisible(false);
    }
    if (!url) return;

    if (url.includes('hesabe-success-callback')) {
      webview.stopLoading();
      // navigation.navigate('PaymentResult', {
      //   screen: 'Drawer',
      //   result: 'Congratulations!',
      //   status: 1,
      // });
      navigation.navigate('Drawer', {
        screen: 'PaymentResult', 
        params: {
            result: 'Congratulations!',
            status: 1,
        }
      });
    }
    if (url.includes('hesabe-error-callback')) {
      webview.stopLoading();
      navigation.navigate('Drawer', {
        screen: 'PaymentResult', 
        params: {
          result: 'Payment Unsuccessful',
          status: 0,
        }
      });
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{height: '100%'}}>
        <WebView
          ref={(ref) => setwebview(ref)}
          style={{height: 600}}
          onNavigationStateChange={(e) => _onNavigationStateChange(e)}
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{uri: paymentUrl}}
          renderLoading={() => <FoodLoader />}
          incognito={true}
        />
      </View>
      {visible && <FoodLoader />}
    </View>
  );
};

export default paymentView;
