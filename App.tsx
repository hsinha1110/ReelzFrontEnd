import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Navigation from './src/navigation/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import BootSplash from 'react-native-bootsplash';

GoogleSignin.configure({
  webClientId:
    '1059349601516-ib2cqr5288pq5nm5idib8dfg3kr56776.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId:
    '1059349601516-kttle5lphvp4j8dgfesjbc2c8ct0tmpf.apps.googleusercontent.com',
});

const App = () => {
  useEffect(() => {
    const hideSplash = async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash hidden');
    };
    hideSplash();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        translucent={Platform.OS === 'ios'}
        backgroundColor="transparent"
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
